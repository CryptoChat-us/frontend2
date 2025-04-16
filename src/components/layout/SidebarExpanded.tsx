import React from 'react';
import Logo from '@/assets/logo-cryptochat.png';
import IconToggleSidebar from '@/assets/icon-toggle-sidebar.svg';
import IconComecar from '@/assets/icon-comecar.svg';
import IconHistorico from '@/assets/icon-historico.svg';
import IconCarteira from '@/assets/icon-carteira.svg';
import IconAlertas from '@/assets/icon-alertas.svg';
import IconJornadas from '@/assets/icon-jornadas.svg';
import IconUpgrade from '@/assets/icon-upgrade.svg';

const SidebarExpanded: React.FC = () => {
  return (
    <div className="w-56 h-screen relative bg-black border-r border-zinc-800 backdrop-blur overflow-hidden">
      {/* Logo e Toggle */}
      <div className="h-28 border-b border-zinc-800 flex items-center justify-between px-8">
        <img src={Logo} alt="CryptoChat Logo" className="w-10 h-9" />
        <img src={IconToggleSidebar} alt="Toggle Sidebar" className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-4 px-8 pt-8">
        <div className="flex items-center gap-4 cursor-pointer">
          <img src={IconComecar} alt="Começar" className="w-6 h-6" />
          <span className="text-white text-base">Começar</span>
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          <img src={IconHistorico} alt="Histórico" className="w-6 h-6" />
          <span className="text-white text-base">Histórico</span>
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          <img src={IconCarteira} alt="Carteira" className="w-6 h-6" />
          <span className="text-white text-base">Carteira</span>
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          <img src={IconAlertas} alt="Alertas" className="w-6 h-6" />
          <span className="text-white text-base">Alertas</span>
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          <img src={IconJornadas} alt="Jornadas" className="w-6 h-6" />
          <span className="text-white text-base">Jornadas</span>
        </div>
      </div>

      {/* Upgrade */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4 cursor-pointer">
        <img src={IconUpgrade} alt="Upgrade" className="w-6 h-6" />
        <span className="text-white text-base">Upgrade</span>
      </div>
    </div>
  );
};

export default SidebarExpanded;
