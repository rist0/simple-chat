import { useEffect, useRef } from "react";

const MessagesContainer = ({ messages }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;

            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return <div ref={ messageRef } className='message-container mb-1 bg-secondary'>
        { messages.map((m, index) =>
            <div key={index} className='user-message text-end pe-1'>
                <div className='message bg-primary text-white rounded-pill mt-2 p-2'>
                    { m.message }
                </div>

                <div className='user-name mx-1'>
                    { m.user }
                </div>
            </div>
            
        )}
    </div>
}

export default MessagesContainer;