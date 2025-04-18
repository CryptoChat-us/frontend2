import { useState, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { AnimatePresence } from 'framer-motion';
import SidebarExpanded from "@/layouts/SidebarExpanded";
import SidebarCollapsed from "@/components/layout/SidebarCollapsed";
import TopBarTitle from "@/components/TopBarTitle";
import UserAvatar from "@/components/UserAvatar";
import PromptBarFull from "@/components/PromptBarFull";
import AvatarMessage from "@/components/AvatarMessage";
import MobileTopBar from "@/components/MobileTopBar";
import MobileSidebar from "@/components/MobileSidebar";
import MobilePromptBar from "@/components/MobilePromptBar";

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { messages, loading, sendMessage } = useChat();
  const isFirstMessage = messages.length === 0;

  // Detectar dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Em mobile, a sidebar começa fechada
      if (window.innerWidth < 768) {
        setIsSidebarExpanded(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
    // Fechar a sidebar no mobile se estiver aberta
    if (isMobile && isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarExpanded(!isSidebarExpanded);
    }
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      {/* DESKTOP LAYOUT */}
      {!isMobile && (
        <>
          {/* Sidebar */}
          <div className={`fixed left-0 top-0 h-full ${isSidebarExpanded ? 'w-[324px]' : 'w-[60px]'} transition-all duration-300 border-r border-zinc-800 z-10`}>
            {isSidebarExpanded ? <SidebarExpanded onToggle={toggleSidebar} /> : <SidebarCollapsed onToggle={toggleSidebar} />}
          </div>

          {/* Main Content Container */}
          <div 
            className="absolute top-0 right-0 h-[calc(100%-96px)] overflow-hidden transition-all duration-300"
            style={{ left: isSidebarExpanded ? '324px' : '60px' }}>

            {/* Top Bar */}
            <div className="h-16 border-b border-zinc-800 backdrop-blur-sm bg-black/50">
              <div className="flex justify-between items-center h-full px-4">
                <div className="flex items-center gap-4">
                  <TopBarTitle />
                </div>
                <UserAvatar />
              </div>
            </div>

            {/* Chat Area */}
            <main className="h-full overflow-y-auto relative pb-6">
              <div className="px-8 py-6">
                <div className="space-y-6 mx-auto">
                  {isFirstMessage ? (
                    <div className="flex items-center justify-center h-[calc(100vh-16rem)] pt-4 pb-24 w-full">
                      <div className="flex justify-center items-center w-full">
                        <AvatarMessage />
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                        {message.type === 'text' ? (
                          <div className={`${
                            message.role === 'user'
                            ? 'bg-neutral-900 rounded-[30px] py-3 px-[30px] max-w-[70%]'
                            : 'bg-neutral-950/60 rounded-[30px] py-3 px-[30px] max-w-[70%]'
                          } transition-all duration-200 hover:bg-opacity-80`}>
                            <p className="text-white text-base font-['Sequel Sans Display']">
                              {message.content}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    ))
                  )}
                  
                  {loading && (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400" />
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>

          {/* Prompt Bar Container - com z-index elevado para garantir ficar acima da sidebar */}
          <div 
            className="fixed bottom-0 right-0 p-4 bg-black/50 backdrop-blur-md border-t border-zinc-800 transition-all duration-300 z-50"
            style={{ left: isSidebarExpanded ? '324px' : '60px' }}>
            <PromptBarFull onSend={handleSendMessage} />
            <div className="w-full text-center mt-2 mb-1">
              <span className="text-zinc-500 text-xs font-['Sequel Sans Display'] whitespace-nowrap overflow-hidden text-ellipsis">Ei, mesmo sendo uma I.A afiadíssima, o mercado muda rápido! Use meus insights com responsabilidade</span>
            </div>
          </div>
        </>
      )}

      {/* MOBILE LAYOUT */}
      {isMobile && (
        <>
          {/* Mobile Top Bar */}
          <MobileTopBar onToggleSidebar={toggleSidebar} />
          
          {/* Mobile Chat Area */}
          <main className="pt-14 pb-24 h-full overflow-y-auto">
            <div className="px-3 py-4">
              <div className="space-y-6">
                {isFirstMessage ? (
                  <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] w-full">
                    <div className="flex justify-center items-center w-full">
                      <AvatarMessage />
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className={`${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                      {message.type === 'text' ? (
                        <div className={`${
                          message.role === 'user'
                          ? 'bg-neutral-900 rounded-[20px] py-2.5 px-4 max-w-[85%]'
                          : 'bg-neutral-950/60 rounded-[20px] py-2.5 px-4 max-w-[85%]'
                        } transition-all duration-200`}>
                          <p className="text-white text-sm font-['Sequel Sans Display']">
                            {message.content}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ))
                )}
                
                {loading && (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400" />
                  </div>
                )}
              </div>
            </div>
          </main>
          
          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
            )}
          </AnimatePresence>
          
          {/* Mobile Footer Bar removed as requested */}
          
          {/* Mobile Prompt Bar */}
          <MobilePromptBar onSend={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
