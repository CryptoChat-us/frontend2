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
      {/* Left column with background image */}
      <div className="w-full md:w-[60%] relative overflow-hidden flex items-center">
        <img
          src={logoStart}
          alt="Logo Start"
          className="w-[85%] h-auto object-contain ml-0"
        />
      </div>

      {/* Right column with content */}
      <div className="w-full md:w-[40%] min-h-screen flex flex-col items-center justify-center relative px-8 -mt-56">
        <div className="w-full max-w-[240px] flex flex-col items-center">
          {/* Title */}
          <h1 className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-200 bg-clip-text text-transparent text-[38px] font-['Sequel Sans'] font-semibold mb-6">
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
    </div>
  );
};

export default StartPage;