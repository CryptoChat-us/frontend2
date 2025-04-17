import React, { useState } from 'react';
import AnexarIcon from "@/assets/anexarimg.svg";
import EnviarIcon from "@/assets/enviarmsg.svg";

interface MobilePromptBarProps {
  onSend: (message: string) => void;
}

const MobilePromptBar: React.FC<MobilePromptBarProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-black border-t border-zinc-800 z-40">
      <div className="relative rounded-full bg-neutral-900 border border-zinc-700 overflow-hidden">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
          placeholder="Pergunte qualquer coisa sobre o mercado cripto..."
          className="w-full py-3 pl-4 pr-24 bg-transparent text-white text-base font-['Sequel Sans Display'] outline-none resize-none max-h-24"
          rows={1}
        />
        
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => console.log('Anexar arquivo')}
            className="w-9 h-9 rounded-full flex justify-center items-center text-zinc-400 hover:text-white"
          >
            <img src={AnexarIcon} alt="Anexar" className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!message.trim()}
            className={`w-9 h-9 rounded-full flex justify-center items-center ${
              message.trim() 
                ? 'bg-gradient-to-b from-yellow-300 to-yellow-500 hover:opacity-90' 
                : 'bg-neutral-700'
            }`}
          >
            <img src={EnviarIcon} alt="Enviar" className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mt-1 mb-2">
        <div className="text-zinc-500 text-[10px] text-center">
          Ei, mesmo sendo uma I.A afiadíssima, o mercado muda rápido! Use meus insights com responsabilidade
        </div>
      </div>
    </div>
  );
};

export default MobilePromptBar;
