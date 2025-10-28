import * as React from 'react';
import { RefreshIcon } from './icons/RefreshIcon';
import ChatBubble from './ChatBubble';

export interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const TestBox: React.FC = () => {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const [isChatting, setIsChatting] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const chatEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        const firstMessage = !isChatting;
        if (firstMessage) {
            setIsChatting(true);
        }

        const newUserMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
        };
        
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');

        setTimeout(() => {
            const botResponseText = firstMessage 
                ? "¡Hola! He recibido tu primer mensaje. Estoy aquí para ayudarte a lograr tu objetivo."
                : "Gracias por tu mensaje. En este momento, soy un bot de prueba.";

            const newBotMessage: Message = {
                id: Date.now() + 1,
                text: botResponseText,
                sender: 'bot',
            };
            setMessages(prev => [...prev, newBotMessage]);
        }, 800);
    };

    const handleResetChat = () => {
        setIsLoading(true);
        setTimeout(() => {
            setMessages([]);
            setIsChatting(false);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const messageBar = (
        <div className="box-border flex flex-row items-center px-3 py-2 gap-2 w-full h-10 min-h-[40px] max-h-[40px] bg-white border border-[#D5D5DE] rounded-lg focus-within:border-[#6464FF] transition-colors">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje..."
                className="flex-grow bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none"
                disabled={isLoading}
            />
            <button 
                onClick={handleSendMessage} 
                className="text-sm font-medium text-[#6464FF] disabled:text-gray-400" 
                disabled={!inputValue.trim() || isLoading}
            >
                Enviar
            </button>
        </div>
    );

    return (
        <div className="flex-shrink-0 w-[360px] h-full bg-[#F5F5F7] rounded-lg flex flex-col">
            {!isChatting ? (
                <div className="flex flex-col h-full justify-between items-center p-4 gap-6">
                    <div className="flex-grow flex flex-col justify-center items-center gap-4 text-center">
                        <div className="box-border w-[90px] h-[90px] bg-white border border-[#EBEBF0] rounded-full flex items-center justify-center">
                            <span className="text-[52px]" role="img" aria-label="Robot emoji">🤖</span>
                        </div>
                        <p className="text-sm text-gray-600 w-full max-w-[278px]">
                            Puedes probar tu Agente IA escribiendo un mensaje en el chat.
                        </p>
                    </div>
                    {messageBar}
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="flex-shrink-0 p-4 pb-0">
                         <button
                            onClick={handleResetChat}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 w-full h-9 rounded border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 disabled:opacity-50 transition-colors"
                         >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                            ) : (
                                <RefreshIcon />
                            )}
                            <span>{isLoading ? 'Reiniciando...' : 'Reiniciar chat'}</span>
                        </button>
                    </div>

                    <div className="flex-grow p-4 gap-2 overflow-y-auto">
                        <div className="flex flex-col gap-2">
                            {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
                            <div ref={chatEndRef} />
                        </div>
                    </div>

                    <div className="flex-shrink-0 p-4 pt-0">
                        {messageBar}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestBox;