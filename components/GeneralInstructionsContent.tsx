import * as React from 'react';

// A small, reusable component for a textarea that automatically resizes to fit its content.
const AutoResizingTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Adjust height on value change
  React.useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'; // Reset height to get correct scrollHeight
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [props.value]);

  return <textarea ref={textareaRef} rows={1} {...props} />;
};


const GeneralInstructionsContent: React.FC = () => {
    
    const initialInstructions = [
      {
        id: 1,
        label: 'Primer mensaje del Agente IA:',
        value: 'Hola soy tu Agente IA, cómo puedo ayudarte hoy?',
      },
      {
        id: 2,
        label: 'Rol:',
        value: 'Eres un Agente IA especializado en calificación de clientes potenciales.',
      },
      {
        id: 3,
        label: 'Tarea:',
        value: 'Solicitar de manera amable y respetuosa información clave inicial antes de comenzar la interacción.',
      },
      {
        id: 4,
        label: 'Detalles:',
        value: 'Comunícate en tono neutral y profesional y limita cada respuesta a máximo tres oraciones cortas.',
      },
      {
        id: 5,
        label: 'Contexto:',
        value: 'El objetivo es facilitar la calificación rápida de leads y mantener una comunicación clara y respetuosa con potenciales clientes.',
      },
      {
        id: 6,
        label: 'Ejemplos:',
        value: '• "¿Podrías indicarme tu nombre?"\n• "¿Con qué presupuesto cuentas actualmente?"\n• "¿Me podrías compartir un correo electrónico por favor?"',
      },
      {
        id: 7,
        label: 'Notas:',
        value: 'No uses tecnicismos ni lenguaje complejo. Prioriza siempre la claridad y la amabilidad.',
      },
    ];

    const [instructions, setInstructions] = React.useState(initialInstructions);

    const handleInstructionChange = (id: number, newValue: string) => {
        setInstructions(prevInstructions =>
            prevInstructions.map(instr =>
                instr.id === id ? { ...instr, value: newValue } : instr
            )
        );
    };

    return (
        <div className="flex flex-col h-full w-full max-w-[576px] gap-4">
            {/* Section Title */}
            <div className="flex flex-col items-start gap-2 self-stretch flex-shrink-0">
                <h2 className="text-base font-medium text-gray-900">Instrucciones generales que el Agente IA debe seguir</h2>
                <p className="text-sm text-gray-600">Define reglas de comunicación como el tono, acento y longitud de respuestas</p>
            </div>
            
            {/* Structured Instruction Editor */}
            <div className="flex flex-col items-start self-stretch flex-grow w-full p-3 bg-white border border-[#D5D5DE] rounded text-sm text-gray-900 leading-relaxed overflow-y-auto focus-within:border-[#6464FF] transition-colors">
                 {instructions.map(instr => (
                    <div key={instr.id} className="w-full mb-4 last:mb-0">
                        <p className="text-sm text-[#676770]">{instr.label}</p>
                        <AutoResizingTextarea
                            value={instr.value}
                            onChange={(e) => handleInstructionChange(instr.id, e.target.value)}
                            className="w-full bg-transparent text-sm text-gray-900 leading-relaxed focus:outline-none resize-none overflow-hidden"
                            placeholder="Añade una descripción..."
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GeneralInstructionsContent;