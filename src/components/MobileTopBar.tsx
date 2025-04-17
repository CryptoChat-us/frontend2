import React from 'react';
import IconToggleSidebar from "@/assets/icon-toggle-sidebar.svg";
import Logo from "@/assets/logo-cryptochat.png";
import UserAvatar from "@/components/UserAvatar";

interface MobileTopBarProps {
  onToggleSidebar: () => void;
}

const MobileTopBar: React.FC<MobileTopBarProps> = ({ onToggleSidebar }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-black border-b border-zinc-800 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-zinc-800"
        >
          <img 
            src={IconToggleSidebar} 
            alt="Menu" 
            className="w-5 h-5 drop-shadow-[0_0_3px_rgba(234,179,8,0.5)]" 
          />
        </button>
        
        <div className="flex items-center gap-2">
          <img src={Logo} alt="CryptoChat Logo" className="w-6 h-6" />
          <span className="text-white text-lg font-['Power Grotesk Trial'] font-light tracking-wide">CryptoChat</span>
          <span className="text-xs text-zinc-500 self-end mb-0.5">v1.0-beta</span>
        </div>
      </div>
      
      <UserAvatar />
    </div>
  );
};

export default MobileTopBar;
