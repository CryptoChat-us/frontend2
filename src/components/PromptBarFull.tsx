import React, { useState } from 'react';
import AnexarIcon from "../assets/anexarimg.svg";
import EnviarIcon from "../assets/enviarmsg.svg";

interface PromptBarFullProps {
  onSend: (message: string) => void;
}

export const PromptBarFull: React.FC<PromptBarFullProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };
  return (
    <div className="w-full h-[80px] relative bg-neutral-950 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden z-50">

      {/* Input */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
        placeholder="Pergunte o que quiser sobre Crypto!"
        className="absolute left-[40px] top-[25px] w-[calc(100%-100px)] h-[40px] bg-transparent text-white text-lg font-['Sequel Sans Display'] outline-none placeholder:text-zinc-500 resize-none p-0 border-none"
      />

      {/* Divider (linha vertical branca) */}
      <div className="absolute left-[22px] top-[40px] w-5 h-0 rotate-90 outline outline-[1.5px] outline-offset-[-0.75px] outline-white" />

      {/* Botão de Anexar */}
      <button
        type="button"
        onClick={() => console.log('Anexar arquivo')}
        className="absolute right-[55px] top-[25px] w-10 h-10 rounded-full opacity-70 outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center hover:opacity-100 transition-opacity cursor-pointer z-50"
      >
        <img src={AnexarIcon} alt="Anexar imagem" className="w-5 h-5" />
      </button>

      {/* Botão de Enviar */}
      <button
        type="button"
        onClick={handleSubmit}
        className="absolute right-[12px] top-[25px] w-10 h-10 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 flex justify-center items-center hover:opacity-90 transition-opacity cursor-pointer z-50"
      >
        <img src={EnviarIcon} alt="Enviar mensagem" className="w-5 h-6" />
      </button>


    </div>
  );
};

export default PromptBarFull;

