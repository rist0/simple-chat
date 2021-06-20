import { Row, Col, Button } from "react-bootstrap";
import ConnectedUsers from "./connected-users";
import MessagesContainer from "./messages-container";
import SendMessage from "./send-message";

const Chat = ({ channel, messages, sendMessage, closeConnection, users }) =>
    <div>
        <Row>
            <div className='mb-2 d-flex justify-content-end'>
                <Button variant='danger' onClick={ () => closeConnection() }>Leave { channel }</Button>
            </div>
        </Row>
        <Row>
            <Col className='col-3'>
                <ConnectedUsers users={ users } />
            </Col>
            <Col>
                <MessagesContainer messages={ messages } />
                <SendMessage sendMessage={ sendMessage } />
            </Col>
        </Row>
    </div>

export default Chat;