using Microsoft.AspNetCore.SignalR;
using SimpleChat.Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleChat.Backend.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _systemUser;
        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _systemUser = "System";
            _connections = connections;
        }

        public async Task JoinChannelAsync(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Channel);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Channel).SendAsync(
                "ReceiveMessageAsync", _systemUser, $"{userConnection.User} has joined {userConnection.Channel}");

            await SendConnectedUsersAsync(userConnection.Channel);
        }

        public async Task SendMessageAsync(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                await Clients.Group(userConnection.Channel)
                    .SendAsync("ReceiveMessageAsync", userConnection.User, message);
            }
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                _connections.Remove(Context.ConnectionId);

                Clients.Group(userConnection.Channel)
                    .SendAsync("ReceiveMessageAsync", _systemUser, $"{userConnection.User} has left the channel.");

                SendConnectedUsersAsync(userConnection.Channel);
            }

            return base.OnDisconnectedAsync(exception);
        }

        private Task SendConnectedUsersAsync(string channel)
        {
            var users = _connections.Values.Where(x => x.Channel == channel).Select(x => x.User);

            return Clients.Group(channel).SendAsync("UsersInChannelAsync", users);
        }
    }
}
