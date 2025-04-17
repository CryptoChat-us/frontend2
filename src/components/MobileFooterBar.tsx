import React from 'react';
import IconPortfolio from '@/assets/icon-carteira.svg';
import IconAlerts from '@/assets/icon-alertas.svg';
import IconTools from '@/assets/icon-jornadas.svg';

const MobileFooterBar: React.FC = () => {
  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 p-1 px-2 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 z-40">
      <FooterButton icon={IconTools} label="Ferramentas" />
      <FooterButton icon={IconPortfolio} label="Carteira" />
      <FooterButton icon={IconAlerts} label="Alertas Ativos" />
    </div>
  );
};

interface FooterButtonProps {
  icon: string;
  label: string;
}

const FooterButton: React.FC<FooterButtonProps> = ({ icon, label }) => {
  return (
    <button className="flex flex-col items-center justify-center px-3 py-1.5 rounded-full hover:bg-zinc-800">
      <img src={icon} alt={label} className="w-5 h-5" />
      <span className="text-white text-[10px] mt-0.5">{label}</span>
    </button>
  );
};

export default MobileFooterBar;
