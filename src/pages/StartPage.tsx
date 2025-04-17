import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoStart from "@/assets/logo-start.png";
import logoCryptoChat from "@/assets/logo-cryptochat.png";

const StartPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-custom-dark">
      {/* Desktop: Left column with background image */}
      {/* Mobile: Hidden and replaced by the mobile version */}
      <div className="hidden md:flex w-full md:w-[60%] relative overflow-hidden items-center">
        <img
          src={logoStart}
          alt="Logo Start"
          className="w-[85%] h-auto object-contain ml-0"
        />
      </div>

      {/* Mobile layout - Horizontal arrangement */}
      <div className="flex md:hidden w-full min-h-screen flex-row items-center justify-center px-4 py-8">
        {/* Left: Image container */}
        <div className="w-[40%] flex items-center justify-center pr-4">
          <img
            src={logoStart}
            alt="Logo Start"
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Right: Content container */}
        <div className="w-[60%] flex flex-col items-center justify-center">
          {/* Title */}
          <h1 className="text-gradient text-[32px] font-['Sequel Sans'] font-semibold mb-4">
            Início
          </h1>

          {/* Buttons container */}
          <div className="w-full max-w-[200px] flex flex-col space-y-2.5">
            {/* Entrar Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full h-[44px] bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-full shadow-lg inline-flex justify-center items-center"
            >
              <span className="text-custom-dark text-sm font-['Sequel Sans']">Entrar</span>
            </motion.button>

            {/* Cadastrar Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignup}
              className="w-full h-[44px] bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-full shadow-lg inline-flex justify-center items-center"
            >
              <span className="text-custom-dark text-sm font-['Sequel Sans']">Cadastrar</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Desktop: Right column with content */}
      <div className="hidden md:flex w-full md:w-[40%] min-h-screen flex-col items-center justify-center relative px-8 -mt-56">
        <div className="w-full max-w-[240px] flex flex-col items-center">
          {/* Title */}
          <h1 className="text-gradient text-[38px] font-['Sequel Sans'] font-semibold mb-6">
            Início
          </h1>

          {/* Buttons container */}
          <div className="w-full flex flex-col space-y-2.5">
            {/* Entrar Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full h-[44px] bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-full shadow-lg inline-flex justify-center items-center"
            >
              <span className="text-custom-dark text-sm font-['Sequel Sans']">Entrar</span>
            </motion.button>

            {/* Cadastrar Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignup}
              className="w-full h-[44px] bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-full shadow-lg inline-flex justify-center items-center"
            >
              <span className="text-custom-dark text-sm font-['Sequel Sans']">Cadastrar</span>
            </motion.button>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="absolute bottom-32 flex items-center justify-center">

          <img
            src={logoCryptoChat}
            alt="Logo"
            className="w-6 h-6 mr-3"
          />
          <div className="flex items-center space-x-3">
            <motion.a
              href="/terms"
              whileHover={{ scale: 1.05 }}
              className="text-stone-300 text-xs font-['Sequel Sans'] underline hover:text-yellow-400 transition-colors"
            >
              Termos de uso
            </motion.a>
            <motion.a
              href="/privacy"
              whileHover={{ scale: 1.05 }}
              className="text-stone-300 text-xs font-['Sequel Sans'] underline hover:text-yellow-400 transition-colors opacity-50"
            >
              Política de privacidade
            </motion.a>
          </div>
        </div>
      </div>

      {/* Mobile: Terms and Privacy */}
      <div className="flex md:hidden w-full absolute bottom-8 flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-2">
          <img
            src={logoCryptoChat}
            alt="Logo"
            className="w-5 h-5 mr-2"
          />
        </div>
        <div className="flex items-center space-x-3">
          <motion.a
            href="/terms"
            whileHover={{ scale: 1.05 }}
            className="text-stone-300 text-[10px] font-['Sequel Sans'] underline hover:text-yellow-400 transition-colors"
          >
            Termos de uso
          </motion.a>
          <motion.a
            href="/privacy"
            whileHover={{ scale: 1.05 }}
            className="text-stone-300 text-[10px] font-['Sequel Sans'] underline hover:text-yellow-400 transition-colors opacity-50"
          >
            Política de privacidade
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default StartPage;