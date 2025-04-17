

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

interface SidebarExpandedProps {
  onToggle: () => void;
}

const SidebarExpanded = ({ onToggle }: SidebarExpandedProps) => {
  return (
    <div className="w-full h-full bg-black flex flex-col justify-between overflow-hidden">
      {/* Topo com logo e ações */}
      <div>
        <div className="flex justify-between items-center px-5 pt-4 pb-3">
          <img src={Logo} alt="CryptoChat Logo" className="w-9 h-9" />
          <div className="flex gap-3 items-center">
            <img src={IconSearch} alt="Pesquisar" className="w-5 h-5 cursor-pointer" />
            <img 
              src={IconToggleSidebar} 
              alt="Recolher sidebar" 
              className="w-5 h-5 cursor-pointer" 
              onClick={onToggle}
            />
          </div>
        </div>

        {/* Menu de navegação */}
        <div className="flex flex-col gap-3 px-5 mt-2">
          <SidebarItem icon={IconStart} label="Comece Aqui!" active />
          <SidebarItem icon={IconHistory} label="Histórico" />
          <SidebarItem icon={IconPortfolio} label="Carteira" />
          <SidebarItem icon={IconAlerts} label="Alertas" />
          <SidebarItem icon={IconJourneys} label="Jornadas" />
        </div>
      </div>

      {/* Botão upgrade - posicionado no fundo da barra */}
      <div className="px-5 pb-5">
        <div className="w-full px-4 py-3 bg-neutral-950 rounded-md border border-neutral-700 hover:border-yellow-400 transition flex items-center gap-3 cursor-pointer">
          <img src={IconUpgrade} alt="Upgrade" className="w-5 h-5 flex-shrink-0" />
          <span className="text-stone-300 text-sm font-['Sequel Sans Display'] whitespace-nowrap overflow-hidden text-ellipsis">
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
      className={`w-full px-4 py-3 rounded-md border flex items-center gap-3 ${
        active
          ? "bg-neutral-950 border-yellow-400"
          : "bg-neutral-950 border-neutral-700 hover:border-yellow-400"
      } transition cursor-pointer`}
    >
      <img src={icon} alt={label} className="w-5 h-5" />
      <span className="text-stone-300 text-sm font-['Sequel Sans Display']">{label}</span>
    </div>
  );
};

export default SidebarExpanded;
