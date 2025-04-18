import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validateEmail';
import logoCryptoChat from '../assets/logo-cryptochat.png';
import iconEmail from '../assets/icon-email.svg';
import iconSenha from '../assets/icon-senha.svg';

import { supabase } from '../services/supabaseClient';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, user } = useAuth();
  const [step, setStep] = useState(1);
  
  // Step 1 states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2 state
  const [name, setName] = useState('');
  
  // Common states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStepOne = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await signup(email, password);
      setStep(2);
    } catch (err: any) {
      if (err.message === 'User already registered') {
        setError('Este email já está registrado');
      } else {
        setError('Erro ao criar conta: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStepTwo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Por favor, insira seu nome');
      return;
    }

    if (!user?.id) {
      setError('Usuário não autenticado');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Update the profile with the user's name
      const { error } = await supabase
        .from('profiles')
        .update({
          name: name.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Profile update error:', err);
      setError('Erro ao completar perfil: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setLoading(true);
    signup('', '').catch(err => {
      setError('Erro ao entrar com Google: ' + err.message);
      setLoading(false);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen bg-black flex justify-center items-center overflow-hidden"
    >
      {/* Glow Background */}
      <div className="w-[480px] h-[480px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center rotate-[-7.46deg] opacity-90 mix-blend-screen bg-yellow-500 rounded-[20px] blur-[100px]" />
      
      {/* Card - Responsive width - Further reduced height for mobile */}
      <div className="w-[92%] sm:w-[440px] h-[600px] sm:h-[640px] relative mx-auto bg-black/70 rounded-xl outline outline-1 outline-neutral-600 backdrop-blur-[30px] my-4 sm:my-8 max-w-[440px]">
        {/* Logo and Title - Fixed logo layout for mobile */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[40px] flex items-center justify-center gap-2">
          <img src={logoCryptoChat} alt="Logo" className="w-8 h-8" />
          <span className="text-white text-2xl sm:text-3xl font-power-grotesk font-light crypto-chat-text whitespace-nowrap">Crypto Chat</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute left-1/2 -translate-x-1/2 top-[100px] flex flex-col items-center w-[85%] sm:w-[380px] max-w-[380px]">
                {/* Headline - Fixed to stay on one line */}
                <div className="text-[28px] sm:text-[37px] leading-[34px] sm:leading-[44px] font-normal font-['Sequel Sans Display'] tracking-title text-gradient pb-1 text-center whitespace-nowrap">
                  Criar uma conta Crypto!
                </div>
              </div>

              <form onSubmit={handleStepOne} className="w-full">
                {/* E-mail Field - Repositioned for mobile */}
                <div className="w-[85%] sm:w-[380px] max-w-[380px] h-14 px-4 absolute left-1/2 -translate-x-1/2 top-[155px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400 focus-within:outline-yellow-400 transition-colors">
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

                {/* Password Field - Repositioned for mobile */}
                <div className="w-[85%] sm:w-[380px] max-w-[380px] h-14 px-4 absolute left-1/2 -translate-x-1/2 top-[220px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400 focus-within:outline-yellow-400 transition-colors">
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

                {/* Confirm Password Field - Repositioned for mobile */}
                <div className="w-[85%] sm:w-[380px] max-w-[380px] h-14 px-4 absolute left-1/2 -translate-x-1/2 top-[285px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400 focus-within:outline-yellow-400 transition-colors">
                  <img src={iconSenha} alt="Confirmar Senha Icon" className="w-7 h-7" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar Senha"
                    className="w-full bg-transparent text-white text-base opacity-60 font-['Helvetica'] focus:outline-none focus:opacity-100 transition-opacity"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-[350px] left-1/2 -translate-x-1/2 w-[85%] sm:w-[380px] max-w-[380px] text-center text-red-500 text-xs font-['Helvetica']"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button - Increased font size for mobile */}
                <motion.button
                  type="submit"
                  whileHover={{ opacity: 0.9 }}
                  whileTap={{ opacity: 0.95 }}
                  disabled={loading}
                  className={`w-[85%] sm:w-[380px] max-w-[380px] h-14 absolute top-[365px] left-1/2 -translate-x-1/2 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-200 rounded-lg flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-yellow-200 hover:to-yellow-400'}`}
                >
                  <span className="text-zinc-950 text-base font-['Helvetica']">
                    {loading ? 'Criando conta...' : 'Entrar'}
                  </span>
                </motion.button>
              </form>

              {/* Divider - Repositioned for mobile */}
              <div className="flex items-center justify-center absolute top-[435px] left-1/2 -translate-x-1/2 w-[85%] sm:w-[380px] max-w-[380px]">
                <div className="h-px flex-1 opacity-50 bg-white"></div>
                <div className="mx-4 text-zinc-500 opacity-50 text-sm">ou</div>
                <div className="h-px flex-1 opacity-50 bg-white"></div>
              </div>

              {/* Google Button - Repositioned for mobile */}
              <motion.button
                whileHover={{ opacity: 1 }}
                whileTap={{ opacity: 0.9 }}
                onClick={handleGoogleSignup}
                disabled={loading}
                className={`w-[85%] sm:w-[380px] max-w-[380px] h-14 absolute top-[465px] left-1/2 -translate-x-1/2 rounded-lg outline outline-1 outline-neutral-400 flex items-center justify-center ${loading ? 'opacity-30' : 'opacity-70'} hover:opacity-100 transition-all`}
              >
                <span className="text-white text-base font-['Helvetica']">
                  Continuar com Google
                </span>
              </motion.button>
              
              {/* Login Link - Repositioned for mobile */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[530px] text-base font-['Sequel Sans Display'] text-center px-4 sm:px-0 w-full whitespace-nowrap">
                <span className="text-zinc-500">Já tem uma conta? </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/login')}
                  className="text-gradient"
                >
                  Entrar agora
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute left-1/2 -translate-x-1/2 top-[80px] flex flex-col items-center w-[85%] sm:w-[380px] max-w-[380px]">
                {/* Headline - Fixed to stay on one line */}
                <div className="text-[28px] sm:text-[37px] leading-[34px] sm:leading-[44px] font-normal font-['Sequel Sans Display'] tracking-title text-gradient pb-1 text-center whitespace-nowrap">
                  Complete seu perfil
                </div>
                
                {/* Subheadline - Hidden on mobile */}
                <div className="mt-2 text-zinc-500 text-base sm:text-lg font-normal font-['Sequel Sans Display'] text-center hidden sm:block">
                  Falta pouco! Precisamos apenas de mais algumas informações.
                </div>
              </div>
              
              <form onSubmit={handleStepTwo} className="w-full">
                {/* Name Field */}
                <div className="w-[85%] sm:w-[380px] max-w-[380px] h-14 px-4 absolute left-1/2 -translate-x-1/2 top-[220px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400 focus-within:outline-yellow-400 transition-colors">
                  <img src={iconSenha} alt="User Icon" className="w-7 h-7" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-transparent text-white text-base opacity-60 font-['Helvetica'] focus:outline-none focus:opacity-100 transition-opacity"
                    required
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute left-1/2 -translate-x-1/2 top-[215px] text-center text-red-500 text-sm font-['Helvetica'] w-[85%] sm:w-[380px] max-w-[380px]"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Continue Button - Increased font size for mobile */}
                <motion.button
                  type="submit"
                  whileHover={{ opacity: 0.9 }}
                  whileTap={{ opacity: 0.95 }}
                  disabled={loading}
                  className={`w-[85%] sm:w-[380px] max-w-[380px] h-14 absolute top-[255px] left-1/2 -translate-x-1/2 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-200 rounded-lg flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-yellow-200 hover:to-yellow-400'}`}
                >
                  <span className="text-zinc-950 text-base font-['Helvetica']">
                    {loading ? 'Salvando...' : 'Continuar'}
                  </span>
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Termos e Política - Fixed spacing for mobile */}
        <div className="w-auto h-auto absolute left-1/2 -translate-x-1/2 bottom-3 flex flex-row items-center justify-center text-center whitespace-nowrap px-4 gap-4 sm:gap-8">
          <a href="#" className="text-stone-300 text-xs font-['Sequel Sans Display'] underline cursor-pointer hover:text-stone-200 transition-colors">Termos de uso</a>
          <a href="#" className="text-stone-300 text-xs font-['Sequel Sans Display'] opacity-50 underline cursor-pointer hover:text-stone-200 transition-colors">Política de privacidade</a>
        </div>
      </div>
    </motion.div>
  );
}
