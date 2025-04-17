import AvatarImage from "../assets/cryptochatavatar.png";

const AvatarMessage = () => {
  return (
    <div className="w-[1060px] h-96 relative">
      {/* Card principal com borda - bg mais escuro para evitar a linha */}
      <div className="absolute top-[60px] left-0 w-[1060px] h-[362px] bg-black rounded-[30px] outline outline-1 outline-neutral-700 z-10">
        {/* Efeito de glow amarelo dentro do card */}
        <div className="absolute top-[-10px] left-[60px] w-[300px] h-[350px] bg-yellow-400 opacity-20 blur-[90px] rounded-full"></div>
        <div className="absolute top-[30px] left-[80px] w-[250px] h-[250px] bg-yellow-500 opacity-10 blur-[70px] rounded-full"></div>
        
        <div className="absolute left-[591px] top-[50%] -translate-y-1/2 z-30">
          <p className="text-6xl font-sequel leading-tight text-gradient">
            O que você quer<br />
            descobrir hoje<br />
            no mercado?
          </p>
        </div>
      </div>
      
      {/* Avatar fora do container para ficar por cima da borda */}
      <img
        src={AvatarImage}
        alt="Avatar CryptoChat"
        className="absolute left-[68px] top-[-20px] w-[477px] h-[477px] -rotate-[2.31deg] object-contain z-50"
      />
    </div>
  );
};

export default AvatarMessage;
