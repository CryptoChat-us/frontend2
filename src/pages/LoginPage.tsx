import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validateEmail';

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
        setError('Erro ao fazer login: ' + err.message);
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
  <div className="w-[480px] h-[480px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center rotate-[-7.46deg] opacity-90 mix-blend-screen bg-yellow-700 rounded-[20px] blur-[100px]" />
  
  {/* Login Card */}
  <div className="w-[440px] h-[600px] relative mx-auto bg-black/70 rounded-xl outline outline-1 outline-neutral-600 backdrop-blur-[30px] my-8">
    {/* Logo and Title */}
    <div className="absolute left-1/2 -translate-x-1/2 top-[40px] flex items-center gap-3">
      <img src="/assets/logo-cryptochat.png" alt="Logo" className="w-8 h-8" />
      <span className="text-white text-2xl font-light font-['Sequel Sans Display']">Crypto Chat</span>
    </div>

    <div className="absolute left-1/2 -translate-x-1/2 top-[100px] flex flex-col items-center w-[380px]">
      {/* Headline */}
      <div className="text-[32px] leading-[40px] font-normal font-['Sequel Sans Display'] tracking-title text-gradient">
        Sua IA Crypto Pessoal!
      </div>

      {/* Subheadline */}
      <div className="mt-3 text-zinc-500 text-lg font-light font-['Sequel Sans Display']">
        Invista melhor. Com inteligência, não achismo!
      </div>
    </div>

    <form onSubmit={handleLogin} className="w-full">
      {/* E-mail Field */}
      <div className="w-[380px] h-14 px-4 absolute left-1/2 -translate-x-1/2 top-[200px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400 focus-within:outline-yellow-400 transition-colors">
        <img src="/assets/icon-email.svg" alt="E-mail Icon" className="w-6 h-6" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="w-full bg-transparent text-white text-base opacity-60 font-['Sequel_Sans'] focus:outline-none focus:opacity-100 transition-opacity"
          required
        />
      </div>

      {/* Password Field */}
      <div className="w-[380px] h-14 px-4 absolute left-1/2 -translate-x-1/2 top-[270px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400 focus-within:outline-yellow-400 transition-colors">
        <img src="/assets/icon-senha.svg" alt="Senha Icon" className="w-7 h-7" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="w-full bg-transparent text-white text-base opacity-60 font-['Sequel_Sans'] focus:outline-none focus:opacity-100 transition-opacity"
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-[320px] left-1/2 -translate-x-1/2 w-[380px] text-center text-red-500 text-xs font-['Sequel_Sans']"
        >
          {error}
        </motion.div>
      )}

      {/* Entrar Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className={`w-[380px] h-14 absolute top-[350px] left-1/2 -translate-x-1/2 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-200 rounded-lg flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-yellow-200 hover:to-yellow-400'}`}
      >
        <span className="text-zinc-950 text-xl font-['Sequel_Sans']">
          {loading ? 'Entrando...' : 'Entrar'}
        </span>
      </motion.button>
    </form>

    {/* Divider */}
    <div className="flex items-center justify-center absolute top-[400px] left-1/2 -translate-x-1/2 w-[380px]">
      <div className="h-px w-64 opacity-30 bg-white"></div>
      <div className="mx-2 text-zinc-500 opacity-30">ou</div>
      <div className="h-px w-64 opacity-30 bg-white"></div>
    </div>

    {/* Google Button */}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`w-[380px] h-14 absolute top-[440px] left-1/2 -translate-x-1/2 rounded-lg outline outline-1 outline-neutral-400 flex items-center justify-center ${loading ? 'opacity-30' : 'opacity-60'} hover:opacity-100 transition-all`}
    >
      <span className="text-white text-base font-['Sequel_Sans']">
        {loading ? 'Conectando...' : 'Continuar com Google'}
      </span>
    </motion.button>

    {/* Criar conta */}
    <div className="absolute left-1/2 -translate-x-1/2 top-[500px] text-base font-['Sequel_Sans'] leading-loose text-center">
      <span className="text-zinc-500">Ainda não tem conta? </span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('/signup')}
        className="text-yellow-400 hover:text-yellow-300 transition-colors"
      >
        Criar agora
      </motion.button>
    </div>

    {/* Termos e Política */}
    <div className="w-auto h-6 absolute left-1/2 -translate-x-1/2 top-[550px] flex gap-4">
      <span className="text-stone-300 text-sm font-['Sequel_Sans'] underline cursor-pointer hover:text-stone-200 transition-colors">Termos de uso</span>
      <span className="text-stone-300 text-sm font-['Sequel_Sans'] opacity-50 underline cursor-pointer hover:text-stone-200 transition-colors">Política de privacidade</span>
    </div>
  </div>
</motion.div>
);
};

export default LoginPage;