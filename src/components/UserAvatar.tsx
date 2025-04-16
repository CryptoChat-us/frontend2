    // src/components/layout/UserAvatar.tsx
    
    const UserAvatar = () => {
        return (
        <div className="w-12 h-12 bg-white rounded-full shadow-md outline outline-1 outline-white/40 overflow-hidden">
        <img
        src="/assets/fotodeperfilusuario.png"
        alt="User Avatar"
        className="w-[55px] h-[59px] object-cover -translate-x-[6px]"
        />
        </div>
        );
        };
        
        export default UserAvatar;