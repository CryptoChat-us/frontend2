import logo from "@/assets/logo-cryptochat.png";
import userPhoto from "@/assets/fotodeperfilusuário.png";

const NavigationBarV2 = () => {
return (
<div className="w-full h-[1080px] relative bg-black overflow-hidden">
{/* Top Bar */}
<div className="w-[1693px] h-28 ml-[227px] bg-black border-b border-zinc-800 backdrop-blur">
<div className="w-6 h-0 ml-[188px] mt-[42px] rotate-90 outline outline-[1.5px] outline-offset-[-0.75px] outline-white" />
</div>
  {/* User Avatar */}
  <div className="w-20 h-12 absolute right-4 top-[35px]">
    <div className="w-12 h-12 bg-white rounded-full shadow-md outline outline-1 outline-white/40 overflow-hidden">
      <img
        src={userPhoto}
        alt="User Avatar"
        className="w-14 h-14 -ml-1"
      />
    </div>
  </div>

  {/* CryptoChat Title */}
  <div className="absolute left-[263px] top-[40px] text-white text-2xl font-light font-power">
    Crypto Chat
  </div>

  {/* Wallet Chat Subheading */}
  <div className="absolute left-[434px] top-[40px] opacity-30 text-white text-2xl font-light font-power">
    Wallet Chat
  </div>

  {/* Sidebar Mini */}
  <div className="w-56 h-28 absolute top-0 left-0 bg-black border-r border-b border-zinc-800 backdrop-blur">
    <div className="w-72 h-8 ml-[29px] mt-[40px] relative">
      {/* Logo */}
      <img
        src={logo}
        alt="CryptoChat Logo"
        className="w-10 h-9 absolute left-0 top-0"
      />
      {/* Toggle Icon */}
      <div className="w-16 h-8 absolute left-[95px] top-[1px]">
        <div className="w-6 h-6 absolute top-[2.7px] bg-white" />
        <div className="w-8 h-8 absolute left-[38px] top-0">
          <div className="w-6 h-6 ml-[3.9px] mt-[3.9px] outline outline-[2.58px] outline-offset-[-1.29px] outline-neutral-50" />
          <div className="w-0 h-6 ml-[11.6px] mt-[3.9px] outline outline-[2.58px] outline-offset-[-1.29px] outline-neutral-50" />
          <div className="w-1 h-2 ml-[16.8px] mt-[11.6px] outline outline-[2.58px] outline-offset-[-1.29px] outline-neutral-50" />
        </div>
      </div>
    </div>
  </div>
</div>
);
};

export default NavigationBarV2;