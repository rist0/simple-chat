import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap"

const Lobby = ({ joinChannel }) => {
    const [user, setUser] = useState();
    const [channel, setChannel] = useState();

    return <Row className='justify-content-center'>
        <Col className='col-6'>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    joinChannel(user, channel);
                }} >
                <Form.Group className='mb-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder='Enter your name' onChange={ e => setUser(e.target.value) } />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Channel</Form.Label>
                    <Form.Control placeholder='Enter a channel to join' onChange={ e => setChannel(e.target.value) } />
                </Form.Group>
                <br />
                <Button variant='primary' type='submit' disabled={ !user || !channel }>Join channel</Button>
            </Form>
        </Col>
    </Row>
}

export default Lobby;