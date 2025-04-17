import React from 'react';
import Logo from '@/assets/logo-cryptochat.png';
import IconStart from '@/assets/icon-comecar.svg';
import IconHistory from '@/assets/icon-historico.svg';
import IconPortfolio from '@/assets/icon-carteira.svg';
import IconAlerts from '@/assets/icon-alertas.svg';
import IconJourneys from '@/assets/icon-jornadas.svg';
import IconUpgrade from '@/assets/icon-upgrade.svg';
import { motion } from 'framer-motion';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay para fechar o menu */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50"
        onClick={onClose}
      />
      
      {/* Menu lateral */}
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 bottom-0 w-[85%] max-w-[280px] bg-black border-r border-zinc-800 z-[60] flex flex-col"
      >
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
          <img src={Logo} alt="CryptoChat Logo" className="w-8 h-8" />
          <span className="text-white text-lg font-['Power Grotesk Trial'] font-light tracking-wide">CryptoChat</span>
          <span className="text-xs text-zinc-500 self-end mb-0.5">v1.0-beta</span>
        </div>
        
        {/* Menu de navegação */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <MobileSidebarItem icon={IconStart} label="Comece Aqui!" active />
          <MobileSidebarItem icon={IconHistory} label="Histórico" />
          <MobileSidebarItem icon={IconPortfolio} label="Carteira" />
          <MobileSidebarItem icon={IconAlerts} label="Alertas" />
          <MobileSidebarItem icon={IconJourneys} label="Jornadas" />
        </div>
        
        {/* Botão PRO */}
        <div className="p-4 border-t border-zinc-800">
          <div className="w-full px-4 py-3 bg-neutral-950 rounded-md border border-neutral-700 hover:border-yellow-400 transition flex items-center gap-3 cursor-pointer">
            <img src={IconUpgrade} alt="Upgrade" className="w-5 h-5 flex-shrink-0" />
            <span className="text-stone-300 text-sm font-['Sequel Sans Display'] whitespace-nowrap overflow-hidden text-ellipsis">
              Desbloquear Crypto Chat Pro
            </span>
          </div>
        </div>
        
        {/* Perfil do usuário */}
        <div className="p-4 flex items-center justify-between border-t border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-yellow-400 border border-yellow-500">
              U
            </div>
            <span className="text-white text-sm">Usuário</span>
          </div>
          <button className="text-zinc-400 text-sm hover:text-white">Sair</button>
        </div>
      </motion.div>
    </>
  );
};

interface MobileSidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

const MobileSidebarItem: React.FC<MobileSidebarItemProps> = ({ icon, label, active = false }) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-md ${
        active ? 'bg-neutral-800 text-yellow-400' : 'text-zinc-400 hover:bg-neutral-900 hover:text-white'
      }`}
    >
      <img src={icon} alt={label} className="w-5 h-5" />
      <span className="text-current font-['Sequel Sans Display'] text-sm">{label}</span>
    </div>
  );
};

export default MobileSidebar;
