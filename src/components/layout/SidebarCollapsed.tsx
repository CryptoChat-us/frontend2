import React from 'react';
import Logo from '@/assets/logo-cryptochat.png';
import IconToggleSidebar from '@/assets/icon-toggle-sidebar.svg';
import IconComecar from '@/assets/icon-comecar.svg';
import IconHistorico from '@/assets/icon-historico.svg';
import IconCarteira from '@/assets/icon-carteira.svg';
import IconAlertas from '@/assets/icon-alertas.svg';
import IconJornadas from '@/assets/icon-jornadas.svg';
import IconUpgrade from '@/assets/icon-upgrade.svg';

const SidebarCollapsed: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 w-56 h-screen bg-black border-r border-zinc-800 backdrop-blur-md">
      {/* Top Icons */}
      <div className="flex items-center justify-between px-8 h-28 border-b border-zinc-800">
        <img src={Logo} alt="Logo" className="w-10 h-9" />
        <img src={IconToggleSidebar} alt="Toggle Sidebar" className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-8 px-8 mt-8">
        <img src={IconComecar} alt="Começar" className="w-6 h-6 cursor-pointer" />
        <img src={IconHistorico} alt="Histórico" className="w-6 h-6 cursor-pointer" />
        <img src={IconCarteira} alt="Carteira" className="w-6 h-6 cursor-pointer" />
        <img src={IconAlertas} alt="Alertas" className="w-6 h-6 cursor-pointer" />
        <img src={IconJornadas} alt="Jornadas" className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Bottom Icon */}
      <div className="absolute bottom-8 left-8">
        <img src={IconUpgrade} alt="Upgrade" className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default SidebarCollapsed;