import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Lobby from './components/lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import Chat from './components/chat';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [channel, setChannel] = useState();

  const joinChannel = async (user, channel) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chat")
        .configureLogging(LogLevel.Information)
        .build();

        connection.on("ReceiveMessageAsync", (user, message) => {
          setMessages(messages => [...messages, { user, message }]);
        });

        connection.onclose(e => {
          setConnection();
          setMessages([]);
          setUsers([]);
          setChannel();
        });

        connection.on("UsersInChannelAsync", (users) => {
          setUsers(users);
        });

        await connection.start();
        await connection.invoke("JoinChannelAsync", { user, channel });

        setConnection(connection);
        setChannel(channel);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessageAsync", message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return <Container>
    <Row>
      <Col className='d-flex justify-content-center pt-2'>
        <h2 className='text-secondary'>Simple Chat</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <hr className='line' />
      </Col>
    </Row>
    { !connection
      ? <Lobby joinChannel={ joinChannel } />
      : <Chat channel={ channel } messages={ messages } sendMessage={ sendMessage } closeConnection={ closeConnection } users={ users } />
    }
  </Container>
}

export default App;
