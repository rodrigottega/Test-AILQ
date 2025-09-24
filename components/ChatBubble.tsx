import * as React from 'react';
import { Message } from './TestBox';

interface ChatBubbleProps {
    message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
    const isUser = message.sender === 'user';
    
    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div 
                className={`box-border flex flex-row items-center p-2 text-sm max-w-[238px] bg-white border border-[#EBEBF0] break-words ${
                    isUser 
                        ? 'rounded-lg rounded-br-none text-gray-900' 
                        : 'rounded-lg rounded-bl-none text-gray-600'
                }`}
            >
                <p>{message.text}</p>
            </div>
        </div>
    );
}

export default ChatBubble;
