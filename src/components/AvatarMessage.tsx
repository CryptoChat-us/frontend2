
import AvatarImage from "../assets/cryptochatavatar.png";

const AvatarMessage = () => {
  return (
    <div className="w-[1060px] h-96 relative">
      {/* Mensagem com Avatar e Texto */}
      <div className="absolute top-[60px] left-0 w-[1060px] h-96 bg-neutral-950 rounded-[30px] outline outline-1 outline-offset-[-0.87px] outline-neutral-700 overflow-hidden">
        <img
          src={AvatarImage}
          alt="Avatar CryptoChat"
          className="absolute left-[68px] top-[-40.8px] w-[477px] h-[478.68px] origin-top-left -rotate-[2.31deg]"
        />
        <p className="absolute left-[591px] top-[83px] text-yellow-400 text-6xl font-sequel leading-tight">
          O que você quer<br />
          descobrir hoje<br />
          no mercado?
        </p>
      </div>

      {/* Espelhamento visual do avatar fora da borda */}
      <div className="absolute top-0 left-[68px] w-[496px] h-96 overflow-hidden pointer-events-none">
        <img
          src={AvatarImage}
          alt="Avatar Deco"
          className="absolute top-[19.2px] left-0 w-[477px] h-[478.68px] origin-top-left -rotate-[2.31deg]"
        />
      </div>
    </div>
  );
};

export default AvatarMessage;

