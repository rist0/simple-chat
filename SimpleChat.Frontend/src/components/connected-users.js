const ConnectedUsers = ({ users }) => {
    return <div>
        <h4 className='text-secondary'>Connected Users</h4>
        { users.map((user, index) => 
            <h6 className='text-primary' key={ index }>
                { user }
            </h6>
        )}
    </div>
}

export default ConnectedUsers;