

// Importação dos ícones
import Logo from "@/assets/logo-cryptochat.png";
import IconSearch from "@/assets/icon-pesquisa.svg";
import IconToggleSidebar from "@/assets/icon-toggle-sidebar.svg";
import IconStart from "@/assets/icon-comecar.svg";
import IconHistory from "@/assets/icon-historico.svg";
import IconPortfolio from "@/assets/icon-carteira.svg";
import IconAlerts from "@/assets/icon-alertas.svg";
import IconJourneys from "@/assets/icon-jornadas.svg";
import IconUpgrade from "@/assets/icon-upgrade.svg";

const SidebarExpanded = () => {
  return (
    <div className="w-96 h-screen bg-black border-r border-zinc-800 backdrop-blur-md flex flex-col justify-between overflow-hidden">
      {/* Topo com logo e ações */}
      <div className="flex justify-between items-center px-6 pt-6 pb-4">
        <img src={Logo} alt="CryptoChat Logo" className="w-10 h-10" />
        <div className="flex gap-4 items-center">
          <img src={IconSearch} alt="Pesquisar" className="w-6 h-6 cursor-pointer" />
          <img src={IconToggleSidebar} alt="Recolher sidebar" className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Menu de navegação */}
      <div className="flex flex-col gap-4 px-6">
        <SidebarItem icon={IconStart} label="Comece Aqui!" active />
        <SidebarItem icon={IconHistory} label="Histórico" />
        <SidebarItem icon={IconPortfolio} label="Carteira" />
        <SidebarItem icon={IconAlerts} label="Alertas" />
        <SidebarItem icon={IconJourneys} label="Jornadas" />
      </div>

      {/* Botão upgrade */}
      <div className="px-6 pb-6">
        <div className="w-full px-5 py-3.5 bg-neutral-950 rounded-md border border-neutral-700 hover:border-yellow-400 transition flex items-center gap-3 cursor-pointer">
          <img src={IconUpgrade} alt="Upgrade" className="w-6 h-6" />
          <span className="text-stone-300 text-base font-['Sequel_Sans']">
            Desbloquear Crypto Chat Pro
          </span>
        </div>
      </div>
    </div>
  );
};

type SidebarItemProps = {
  icon: string;
  label: string;
  active?: boolean;
};

const SidebarItem = ({ icon, label, active = false }: SidebarItemProps) => {
  return (
    <div
      className={`w-full px-5 py-3.5 rounded-md border flex items-center gap-3 ${
        active
          ? "bg-neutral-950 border-yellow-400"
          : "bg-neutral-950 border-neutral-700 hover:border-yellow-400"
      } transition cursor-pointer`}
    >
      <img src={icon} alt={label} className="w-5 h-5" />
      <span className="text-stone-300 text-base font-['Sequel_Sans']">{label}</span>
    </div>
  );
};

export default SidebarExpanded;
