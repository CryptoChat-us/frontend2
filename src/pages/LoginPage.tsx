import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validateEmail';
import logoCryptoChat from '../assets/logo-cryptochat.png';
import iconEmail from '../assets/icon-email.svg';
import iconSenha from '../assets/icon-senha.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.message === 'Invalid login credentials') {
        setError('Email ou senha inválidos');
      } else {
        setError('Erro ao fazer login: ' + err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithGoogle();
      // O redirecionamento será feito automaticamente pelo Supabase
    } catch (err: any) {
      setError('Erro ao fazer login com Google: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="w-full min-h-screen flex items-center justify-center bg-black overflow-hidden">
  {/* Glow Background */}
  <div className="w-[480px] h-[480px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center rotate-[-7.46deg] opacity-90 mix-blend-screen bg-yellow-500 rounded-[20px] blur-[100px]" />
  
  {/* Login Card - Responsive width */}
  <div className="w-[92%] sm:w-[440px] h-[580px] sm:h-[620px] relative mx-auto bg-black/70 rounded-xl outline outline-1 outline-neutral-600 backdrop-blur-[30px] my-4 sm:my-8 max-w-[440px]">
    {/* Logo and Title */}
    <div className="absolute left-1/2 -translate-x-1/2 top-[40px] flex items-center justify-center gap-2">
      <img src={logoCryptoChat} alt="Logo" className="w-8 h-8" />
      <span className="text-white text-2xl sm:text-3xl font-power-grotesk font-light crypto-chat-text whitespace-nowrap">Crypto Chat</span>
    </div>

    <div className="absolute left-1/2 -translate-x-1/2 top-[100px] flex flex-col items-center w-[85%] sm:w-[380px] max-w-[380px]">
      {/* Headline */}
      <div className="text-[32px] sm:text-[37px] leading-[40px] sm:leading-[44px] font-normal font-['Sequel Sans Display'] tracking-title text-gradient pb-1 text-center">
        Sua IA Crypto Pessoal!
      </div>

      {/* Subheadline - forced to single line */}
      <div className="-mt-1 -mb-3 text-zinc-500 text-base sm:text-lg font-normal font-['Sequel Sans Display'] text-center whitespace-nowrap">
        Invista melhor. Com inteligência, não achismo!
      </div>
    </div>

    <form onSubmit={handleLogin} className="w-full">
      {/* E-mail Field */}
      <div className="w-[85%] sm:w-[380px] max-w-[380px] h-14 px-4 absolute left-1/2 -translate-x-1/2 top-[185px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400 focus-within:outline-yellow-400 transition-colors">
        <img src={iconEmail} alt="E-mail Icon" className="w-6 h-6" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="w-full bg-transparent text-white text-base opacity-60 font-['Helvetica'] focus:outline-none focus:opacity-100 transition-opacity"
          required
        />
      </div>

      {/* Password Field */}
      <div className="w-[85%] sm:w-[380px] max-w-[380px] h-14 px-4 absolute left-1/2 -translate-x-1/2 top-[250px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400 focus-within:outline-yellow-400 transition-colors">
        <img src={iconSenha} alt="Senha Icon" className="w-7 h-7" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="w-full bg-transparent text-white text-base opacity-60 font-['Helvetica'] focus:outline-none focus:opacity-100 transition-opacity"
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-[300px] left-1/2 -translate-x-1/2 w-[85%] sm:w-[380px] max-w-[380px] text-center text-red-500 text-xs font-['Helvetica']"
        >
          {error}
        </motion.div>
      )}

      {/* Entrar Button */}
      <motion.button
        type="submit"
        whileHover={{ opacity: 0.9 }}
        whileTap={{ opacity: 0.95 }}
        disabled={loading}
        className={`w-[85%] sm:w-[380px] max-w-[380px] h-14 absolute top-[315px] left-1/2 -translate-x-1/2 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-200 rounded-lg flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-yellow-200 hover:to-yellow-400'}`}
      >
        <span className="text-zinc-950 text-base font-['Helvetica']">
          {loading ? 'Entrando...' : 'Entrar'}
        </span>
      </motion.button>
    </form>

    {/* Divider */}
    <div className="flex items-center justify-center absolute top-[385px] left-1/2 -translate-x-1/2 w-[85%] sm:w-[380px] max-w-[380px]">
      <div className="h-px flex-1 opacity-50 bg-white"></div>
      <div className="mx-4 text-zinc-500 opacity-50 text-sm">ou</div>
      <div className="h-px flex-1 opacity-50 bg-white"></div>
    </div>

    {/* Google Button */}
    <motion.button
      whileHover={{ opacity: 1 }}
      whileTap={{ opacity: 0.9 }}
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`w-[85%] sm:w-[380px] max-w-[380px] h-14 absolute top-[430px] left-1/2 -translate-x-1/2 rounded-lg outline outline-1 outline-neutral-400 flex items-center justify-center ${loading ? 'opacity-30' : 'opacity-70'} hover:opacity-100 transition-all`}
    >
      <span className="text-white text-base font-['Helvetica']">
        {loading ? 'Conectando...' : 'Continuar com Google'}
      </span>
    </motion.button>

    {/* Criar conta */}
    <div className="absolute left-1/2 -translate-x-1/2 top-[495px] text-base font-['Sequel Sans Display'] text-center px-4 sm:px-0 w-full whitespace-nowrap">
      <span className="text-zinc-500">Ainda não tem conta? </span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('/signup')}
        className="text-gradient"
      >
        Criar agora
      </motion.button>
    </div>

    {/* Termos e Política */}
    <div className="w-auto h-auto absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-row items-center justify-center text-center whitespace-nowrap px-4 gap-8">
      <a href="#" className="text-stone-300 text-xs font-['Sequel Sans Display'] underline cursor-pointer hover:text-stone-200 transition-colors">Termos de uso</a>
      <a href="#" className="text-stone-300 text-xs font-['Sequel Sans Display'] opacity-50 underline cursor-pointer hover:text-stone-200 transition-colors">Política de privacidade</a>
    </div>
  </div>
</motion.div>
);
};

export default LoginPage;