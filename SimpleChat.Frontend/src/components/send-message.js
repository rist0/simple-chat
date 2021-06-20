import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap"

const SendMessage = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return <Form onSubmit={ e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
        <Row>
            <Col className='col-sm-12 col-md-8 col-lg-9'>
                <Form.Control placeholder='Your message...'
                    onChange={ e => setMessage(e.target.value) } value={ message } />
            </Col>
            <Col>
                <Button variant='primary' type='submit' disabled={ !message }>Send message</Button>
            </Col>
        </Row>

    </Form>
}

export default SendMessage;