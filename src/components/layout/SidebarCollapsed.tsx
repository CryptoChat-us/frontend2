import React from 'react';
import Logo from '@/assets/logo-cryptochat.png';
import IconComecar from '@/assets/icon-comecar.svg';
import IconHistorico from '@/assets/icon-historico.svg';
import IconCarteira from '@/assets/icon-carteira.svg';
import IconAlertas from '@/assets/icon-alertas.svg';
import IconJornadas from '@/assets/icon-jornadas.svg';
import IconUpgrade from '@/assets/icon-upgrade.svg';

interface SidebarCollapsedProps {
  onToggle: () => void;
}

const SidebarCollapsed: React.FC<SidebarCollapsedProps> = ({ onToggle }) => {
  return (
    <div className="w-full h-full flex flex-col bg-black overflow-hidden">
      {/* Top Icons */}
      <div className="flex items-center justify-center pt-6 pb-8 cursor-pointer" onClick={onToggle}>
        <img src={Logo} alt="Logo" className="w-8 h-8" />
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-8 items-center mt-8">
        <img src={IconComecar} alt="Começar" className="w-6 h-6 cursor-pointer" />
        <img src={IconHistorico} alt="Histórico" className="w-6 h-6 cursor-pointer" />
        <img src={IconCarteira} alt="Carteira" className="w-6 h-6 cursor-pointer" />
        <img src={IconAlertas} alt="Alertas" className="w-6 h-6 cursor-pointer" />
        <img src={IconJornadas} alt="Jornadas" className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Bottom Icon */}
      <div className="mt-auto mb-8 flex justify-center">
        <img src={IconUpgrade} alt="Upgrade" className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default SidebarCollapsed;