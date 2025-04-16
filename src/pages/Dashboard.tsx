import { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import SidebarExpanded from "@/layouts/SidebarExpanded";
import SidebarCollapsed from "@/components/layout/SidebarCollapsed";
import TopBarTitle from "@/components/TopBarTitle";
import UserAvatar from "@/components/UserAvatar";
import PromptBarFull from "@/components/PromptBarFull";
import AvatarMessage from "@/components/AvatarMessage";

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { messages, loading, sendMessage } = useChat();
  const isFirstMessage = messages.length === 0;

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      {/* Sidebar */}
      <div className={`absolute left-0 top-0 h-full ${isSidebarExpanded ? 'w-96' : 'w-56'} transition-all duration-300`}>
        {isSidebarExpanded ? <SidebarExpanded /> : <SidebarCollapsed />}
      </div>

      {/* Main Content Container */}
      <div className={`absolute ${isSidebarExpanded ? 'left-96' : 'left-56'} top-0 right-0 h-full transition-all duration-300`}>
        {/* Top Bar */}
        <div className="h-28 border-b border-zinc-800 backdrop-blur-blur bg-black/50">
          <div className="flex justify-between items-center h-full px-6">
            <div className="flex items-center gap-6">
              <button onClick={toggleSidebar} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <img src="/assets/icon-toggle-sidebar.svg" alt="Toggle Sidebar" className="w-6 h-6" />
              </button>
              <TopBarTitle />
              <span className="text-white text-2xl font-light opacity-30 font-['Power_Grotesk_Trial']">
                Wallet Chat
              </span>
            </div>
            <UserAvatar />
          </div>
        </div>

        {/* Chat Area */}
        <main className="h-[calc(100%-7rem)] overflow-y-auto relative">
          <div className="px-16 py-10">
            <div className="space-y-8 max-w-4xl mx-auto">
              {isFirstMessage ? (
                <div className="flex flex-col items-center justify-center h-full pt-20">
                  <AvatarMessage />
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className={`${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                    {message.type === 'text' ? (
                      <div className={`${message.role === 'user'
                        ? 'bg-neutral-900 rounded-[96px] py-5 px-[60px] max-w-[75%]'
                        : 'bg-neutral-950/60 rounded-[96px] py-5 px-[60px] max-w-[75%]'
                      } transition-all duration-200 hover:bg-opacity-80`}>
                        <p className="text-white text-2xl font-['Sequel_Sans']">
                          {message.content}
                        </p>
                      </div>
                    ) : message.type === 'media' && message.mediaData ? (
                      <div className="grid grid-cols-1 gap-8 w-full max-w-[573px]">
                        {message.mediaData.map((item, i) => (
                          <div key={i} className="w-full h-48 bg-neutral-950/60 rounded-3xl outline outline-1 outline-yellow-400 backdrop-blur-blur p-6 relative hover:outline-2 transition-all duration-200">
                            <div className="flex items-start gap-4">
                              <div className="w-9 h-9 bg-gradient-to-bl from-yellow-300 via-yellow-500 to-yellow-900 rounded-lg relative">
                                <div className="absolute left-[6px] top-[7px] w-3.5 h-5 bg-black" />
                              </div>
                              <div>
                                <p className="text-white text-xl font-medium leading-7">{item.symbol}</p>
                                <p className="text-white text-xl font-medium leading-7 opacity-80 -mt-1">{item.name}</p>
                              </div>
                              <div className="ml-auto flex items-center gap-2">
                                <p className="text-yellow-400 text-xl font-medium leading-7">{item.percentage}%</p>
                                <div className="w-3.5 h-3.5 bg-gradient-to-bl from-yellow-300 via-yellow-500 to-yellow-900 outline outline-[1.58px] outline-offset-[-0.79px] outline-yellow-400" />
                              </div>
                            </div>
                            <p className="absolute left-[32px] bottom-[16px] text-white text-3xl font-medium leading-10 tracking-tight">
                              {item.trend === 'up' ? `UP ${item.percentage}% 🚀` : `DOWN ${item.percentage}% 📉`}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400" />
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Prompt Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-black/50 backdrop-blur-md border-t border-zinc-800">
          <PromptBarFull onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
