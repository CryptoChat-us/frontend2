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
    <div className="w-[1060px] h-72 relative bg-neutral-950 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden z-50">
      {/* Input */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
        placeholder="Pergunte o que quiser sobre Crypto!"
        className="absolute left-[50px] top-[29px] w-[800px] h-[80px] bg-transparent text-white text-2xl font-sequel outline-none placeholder:text-zinc-500 resize-none p-0 border-none"
      />

      {/* Divider (linha vertical branca) */}
      <div className="absolute left-[36px] top-[35px] w-6 h-0 rotate-90 outline outline-[1.5px] outline-offset-[-0.75px] outline-white" />

      {/* Botão de Anexar */}
      <button
        type="button"
        onClick={() => console.log('Anexar arquivo')}
        className="absolute left-[926px] top-[80px] w-11 h-11 rounded-[49px] opacity-70 outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center hover:opacity-100 transition-opacity cursor-pointer z-50"
      >
        <img src={AnexarIcon} alt="Anexar imagem" className="w-5 h-5" />
      </button>

      {/* Botão de Enviar */}
      <button
        type="button"
        onClick={handleSubmit}
        className="absolute left-[980px] top-[80px] w-11 h-11 rounded-[49px] bg-gradient-to-bl from-yellow-400 to-white flex justify-center items-center hover:opacity-90 transition-opacity cursor-pointer z-50"
      >
        <img src={EnviarIcon} alt="Enviar mensagem" className="w-4 h-5" />
      </button>

      {/* Aviso */}
      <div className="absolute left-[36px] top-[162px] w-[988px] h-20 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-neutral-500 flex items-center px-[56px]">
        <span className="text-zinc-500 text-xl font-sequel">
          Ei, mesmo sendo uma I.A afiadíssima, o mercado muda rápido! Use meus insights com responsabilidade
        </span>
      </div>
    </div>
  );
};

export default PromptBarFull;

