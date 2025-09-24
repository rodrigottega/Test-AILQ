import * as React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface LoadingScreenProps {
    onComplete: () => void;
}

const loadingTexts = [
    "El Agente se está creando...",
    "Las instrucciones se están definiendo...",
    "Las preguntas se están configurando...",
    "Finalizando la configuración..."
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [currentTextIndex, setCurrentTextIndex] = React.useState(0);

    React.useEffect(() => {
        // Change text every 3 seconds
        const textInterval = setInterval(() => {
            setCurrentTextIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                if (nextIndex < loadingTexts.length) {
                    return nextIndex;
                }
                return prevIndex; // Stay on the last message
            });
        }, 3000);

        // Total duration of 12 seconds
        const completeTimeout = setTimeout(() => {
            onComplete();
        }, 12000);

        return () => {
            clearInterval(textInterval);
            clearTimeout(completeTimeout);
        };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#FAFAFC]">
            <SpinnerIcon />
            <p key={currentTextIndex} className="mt-4 text-gray-600 text-sm animate-fadeIn">
                {loadingTexts[currentTextIndex]}
            </p>
        </div>
    );
};

export default LoadingScreen;