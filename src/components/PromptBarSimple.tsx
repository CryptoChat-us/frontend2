import AnexarIcon from "../assets/anexarimg.svg";
import EnviarIcon from "../assets/enviarmsg.svg";

const PromptBarSimple = () => {
  return (
    <div className="w-[1060px] h-40 relative bg-neutral-950 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden">
      {/* Placeholder */}
      <div className="absolute left-[50px] top-[29px] text-zinc-500 text-2xl font-sequel">
        Pergunte o que quiser sobre Crypto!
      </div>

      {/* Divider (linha branca) */}
      <div className="absolute left-[36px] top-[35px] w-6 h-0 rotate-90 outline outline-[1.5px] outline-offset-[-0.75px] outline-white" />

      {/* Anexar imagem */}
      <div className="absolute left-[926px] top-[80px] w-11 h-11 rounded-[48px] opacity-70 outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center">
        <img src={AnexarIcon} alt="Anexar" className="w-5 h-5" />
      </div>

      {/* Botão Enviar */}
      <div className="absolute left-[980px] top-[80px] w-11 h-11 rounded-[48px] bg-gradient-to-bl from-yellow-400 to-white flex justify-center items-center">
        <img src={EnviarIcon} alt="Enviar" className="w-4 h-5" />
      </div>
    </div>
  );
};

export default PromptBarSimple;

