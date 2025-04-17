import AvatarImage from "../assets/cryptochatavatar.png";

const AvatarMessage = () => {
  return (
    <div className="w-full max-w-[1060px] h-96 relative">
      {/* Card principal com borda - bg mais escuro para evitar a linha */}
      <div className="md:absolute relative mx-auto md:mx-0 md:top-[60px] md:left-0 w-[90%] sm:w-[85%] md:w-[1060px] h-[300px] md:h-[362px] bg-black rounded-[30px] outline outline-1 outline-neutral-700 z-10">
        {/* Efeito de glow amarelo dentro do card */}
        <div className="absolute top-[-10px] left-[60px] w-[300px] h-[350px] bg-yellow-400 opacity-20 blur-[90px] rounded-full hidden md:block"></div>
        <div className="absolute top-[30px] left-[80px] w-[250px] h-[250px] bg-yellow-500 opacity-10 blur-[70px] rounded-full hidden md:block"></div>
        <div className="absolute hidden md:block left-[591px] top-[50%] -translate-y-1/2 z-30">
          <p className="text-6xl font-sequel leading-tight text-gradient">
            O que você quer<br />
            descobrir hoje<br />
            no mercado?
          </p>
        </div>
        
        {/* Mobile Version - Center Text */}
        <div className="md:hidden flex flex-col justify-center items-center h-full px-6 z-30">
          <p className="text-3xl text-center font-sequel leading-tight text-gradient mt-[90px]">
            O que você quer<br />
            descobrir hoje<br />
            no mercado?
          </p>
        </div>
      </div>
      
      {/* Avatar - Desktop */}
      <img
        src={AvatarImage}
        alt="Avatar CryptoChat"
        className="hidden md:block absolute left-[68px] top-[-20px] w-[477px] h-[477px] -rotate-[2.31deg] object-contain z-50"
      />

      {/* Avatar - Mobile */}
      <img
        src={AvatarImage}
        alt="Avatar CryptoChat"
        className="md:hidden absolute left-1/2 -translate-x-1/2 top-[-50px] w-[180px] h-[180px] object-contain z-50"
      />
    </div>
  );
};

export default AvatarMessage;
