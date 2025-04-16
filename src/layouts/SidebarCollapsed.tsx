import Logo from "@/assets/logo-cryptochat.png";
import ToggleIcon from "@/assets/icon-toggle-sidebar.svg";
import IconComecar from "@/assets/icon-comecar.svg";
import IconHistorico from "@/assets/icon-historico.svg";
import IconCarteira from "@/assets/icon-carteira.svg";
import IconAlertas from "@/assets/icon-alertas.svg";
import IconJornadas from "@/assets/icon-jornadas.svg";
import IconUpgrade from "@/assets/icon-upgrade.svg";

const SidebarCollapsed = () => {
  return (
    <div className="w-32 h-screen relative bg-black border-r border-zinc-800 backdrop-blur overflow-hidden">
      {/* Logo */}
      <img
        src={Logo}
        alt="CryptoChat Logo"
        className="w-12 h-10 absolute left-11 top-8"
      />

      {/* Toggle Sidebar */}
      <div className="absolute left-7 top-[108px] w-20 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-yellow-400 flex justify-center items-center">
        <img src={ToggleIcon} alt="Toggle Sidebar" className="w-6 h-5" />
      </div>

      {/* Comece Aqui */}
      <div className="absolute left-7 top-[170px] w-20 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex justify-center items-center">
        <img src={IconComecar} alt="Comece Aqui" className="w-5 h-5" />
      </div>

      {/* Histórico */}
      <div className="absolute left-7 top-[290px] w-20 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex justify-center items-center">
        <img src={IconHistorico} alt="Histórico" className="w-5 h-5" />
      </div>

      {/* Carteira */}
      <div className="absolute left-7 top-[352px] w-20 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex justify-center items-center">
        <img src={IconCarteira} alt="Carteira" className="w-5 h-5" />
      </div>

      {/* Alertas */}
      <div className="absolute left-7 top-[414px] w-20 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex justify-center items-center">
        <img src={IconAlertas} alt="Alertas" className="w-5 h-5" />
      </div>

      {/* Jornadas */}
      <div className="absolute left-7 top-[476px] w-20 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex justify-center items-center">
        <img src={IconJornadas} alt="Jornadas" className="w-5 h-5" />
      </div>

      {/* Upgrade */}
      <div className="absolute left-7 bottom-[24px] w-20 px-5 py-3.5 bg-neutral-950 rounded-md outline outline-[0.8px] outline-neutral-700 flex justify-center items-center">
        <img src={IconUpgrade} alt="Upgrade" className="w-6 h-5" />
      </div>
    </div>
  );
};

export default SidebarCollapsed;

