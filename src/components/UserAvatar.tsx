    // src/components/UserAvatar.tsx
import { useState } from 'react';

const UserAvatar = () => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center outline outline-1 outline-white/20 overflow-hidden">
      {imageError ? (
        <span className="text-yellow-400 text-lg font-bold">U</span>
      ) : (
        <img
          src="/assets/fotodeperfilusuario.png" 
          alt="User Avatar"
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};
        
export default UserAvatar;