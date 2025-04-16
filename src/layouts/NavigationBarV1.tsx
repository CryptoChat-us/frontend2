import Logo from "@/assets/logo-cryptochat.png";
import ProfilePicture from "@/assets/fotodeperfilusuário.png";
import IconToggleSidebar from "@/assets/icon-toggle-sidebar.svg";
import IconComecar from "@/assets/icon-comecar.svg";
import IconHistorico from "@/assets/icon-historico.svg";
import IconCarteira from "@/assets/icon-carteira.svg";
import IconAlertas from "@/assets/icon-alertas.svg";
import IconJornadas from "@/assets/icon-jornadas.svg";
import IconUpgrade from "@/assets/icon-upgrade.svg";

const NavigationBarV1 = () => {
return (
<div className="w-full h-[1080px] bg-black relative overflow-hidden">
{/* Top Navigation Bar */}
<div className="absolute top-0 left-[359px] w-[1561px] h-28 bg-black border-b border-zinc-800 backdrop-blur-blur" />
  {/* Profile picture */}
  <div className="absolute top-[35px] left-[1839px] w-12 h-12">
    <div className="w-12 h-12 bg-white rounded-full shadow-md outline outline-1 outline-white/40 overflow-hidden">
      <img src={ProfilePicture} alt="User Profile" className="w-14 h-14 -ml-1" />
    </div>
  </div>

  {/* Logo Text */}
  <div className="absolute top-[41px] left-[387px] text-white text-2xl font-light font-power">
    Crypto Chat
  </div>

  {/* Sidebar */}
  <div className="absolute top-0 left-0 w-96 h-full bg-black border-r border-zinc-800 backdrop-blur-blur overflow-hidden">
    {/* Sidebar Header */}
    <div className="absolute top-[40px] left-[29px] w-72 h-8 flex justify-between items-center">
      <img src={Logo} alt="Logo" className="w-10 h-9" />
      <img src={IconToggleSidebar} alt="Toggle Sidebar" className="w-6 h-6" />
    </div>

    {/* Menu Items */}
    <div className="absolute top-[108px] left-[29px] w-72 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-yellow-400 flex items-center gap-3">
      <img src={IconComecar} alt="Comece Aqui" className="w-6 h-5" />
      <span className="text-stone-300 text-base font-sequel">Comece Aqui!</span>
    </div>

    <div className="absolute top-[170px] left-[29px] w-72 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex items-center gap-3">
      <img src={IconHistorico} alt="Histórico" className="w-5 h-5" />
      <span className="text-stone-300 text-base font-sequel">Histórico</span>
    </div>

    <div className="absolute top-[290px] left-[29px] w-72 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex items-center gap-3">
      <img src={IconCarteira} alt="Carteira" className="w-5 h-5" />
      <span className="text-stone-300 text-base font-sequel">Carteira</span>
    </div>

    <div className="absolute top-[352px] left-[29px] w-72 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex items-center gap-3">
      <img src={IconAlertas} alt="Alertas" className="w-6 h-5" />
      <span className="text-stone-300 text-base font-sequel">Alertas</span>
    </div>

    <div className="absolute top-[414px] left-[29px] w-72 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex items-center gap-3">
      <img src={IconJornadas} alt="Jornadas" className="w-6 h-6" />
      <span className="text-stone-300 text-base font-sequel">Jornadas</span>
    </div>

    <div className="absolute top-[986px] left-[29px] w-72 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex items-center gap-3">
      <img src={IconUpgrade} alt="CryptoChat Pro" className="w-6 h-5" />
      <span className="text-stone-300 text-base font-sequel">Desbloquear Crypto Chat Pro</span>
    </div>
  </div>
</div>
);
};

export default NavigationBarV1;