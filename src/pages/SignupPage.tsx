import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validateEmail';

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
    <div className="w-screen h-screen relative bg-black overflow-hidden">
      {/* Glow Background */}
      <div className="w-[720px] h-[722px] left-[585px] top-[230px] absolute origin-top-left rotate-[-7.46deg] opacity-90 mix-blend-screen bg-yellow-700 rounded-[30.7px] blur-[147.79px]" />
      
      {/* Card */}
      <div className="w-[648px] h-[808px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-black/70 rounded-2xl outline outline-1 outline-neutral-600 backdrop-blur-[29.70px]">
        {/* Header */}
        <div className="flex items-center justify-center mt-[40px]">
          <div className="flex items-center gap-3">
            <img src="/assets/logo-cryptochat.png" alt="logo" className="w-8 h-8" />
            <span className="text-white text-2xl font-light font-['Power_Grotesk_Trial']">
              Crypto Chat
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-16 px-[58px]"
            >
              <h1 className="text-yellow-400 text-[32px] font-['Sequel_Sans'] font-medium mb-10 text-center">
                Criar uma conta Crypto!
              </h1>

              <form onSubmit={handleStepOne} className="flex flex-col items-center gap-6 mt-8 px-12">
                <div className="w-full h-[52px] px-4 rounded-lg bg-black/40 outline outline-1 outline-neutral-400 flex items-center gap-3">
                  <img src="/assets/icon-email.svg" className="w-5 h-5" alt="" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    className="w-full bg-transparent text-white text-base opacity-60 font-['Helvetica_Now_Display'] focus:outline-none"
                    required
                  />
                </div>

                <div className="w-full h-[52px] px-4 rounded-lg bg-black/40 outline outline-1 outline-neutral-400 flex items-center gap-3">
                  <img src="/assets/icon-senha.svg" className="w-5 h-5" alt="" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    className="w-full bg-transparent text-white text-base opacity-60 font-['Helvetica_Now_Display'] focus:outline-none"
                    required
                  />
                </div>

                <div className="w-full h-[52px] px-4 rounded-lg bg-black/40 outline outline-1 outline-neutral-400 flex items-center gap-3">
                  <img src="/assets/icon-senha.svg" className="w-5 h-5" alt="" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar Senha"
                    className="w-full bg-transparent text-white text-base opacity-60 font-['Helvetica_Now_Display'] focus:outline-none"
                    required
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-red-500 text-sm font-sequel"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStepOne}
                  disabled={loading}
                  className="w-full h-[52px] bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-lg flex justify-center items-center shadow-lg"
                >
                  <span className="text-black text-base font-medium font-['Sequel_Sans']">
                    {loading ? 'Criando conta...' : 'Entrar'}
                  </span>
                </motion.button>

                {/* Divider + Google */}
                <div className="w-full flex items-center gap-4 my-2">
                  <div className="flex-1 h-[1px] bg-white/20" />
                  <span className="text-white/40 text-sm">ou</span>
                  <div className="flex-1 h-[1px] bg-white/20" />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  type="button"
                  className="w-full h-[52px] rounded-lg outline outline-1 outline-neutral-400 flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity"
                >
                  <span className="text-white text-base font-normal font-['Helvetica_Now_Display']">
                    Continuar com Google
                  </span>
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm font-['Sequel_Sans'] text-zinc-500">
                  Já tem uma conta?{' '}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/login')}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Entrar agora
                  </motion.button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-16 px-[58px]"
            >
              <h1 className="text-yellow-400 text-[38px] font-['Sequel_Sans'] font-semibold mb-6">
                Complete seu perfil
              </h1>

              <h2 className="text-zinc-500 text-xl font-['Sequel_Sans'] mb-8">
                Falta pouco! Precisamos apenas de mais algumas informações.
              </h2>

              <form onSubmit={handleStepTwo} className="space-y-6">
                <div className="w-full h-[44px] px-6 flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400">
                  <img src="/assets/icon-user.svg" alt="User Icon" className="w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-transparent text-white text-sm opacity-60 font-['Helvetica_Now_Display'] focus:outline-none"
                    required
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-red-500 text-sm font-sequel"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStepTwo}
                  disabled={loading}
                  className="w-full h-[52px] bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-lg flex justify-center items-center shadow-lg"
                >
                  <span className="text-black text-base font-medium font-['Sequel_Sans']">
                    {loading ? 'Salvando...' : 'Continuar'}
                  </span>
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terms and Privacy */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-3">
            <motion.a
              href="/terms"
              whileHover={{ scale: 1.05 }}
              className="text-stone-300 text-xs font-['Sequel_Sans'] underline hover:text-yellow-400 transition-colors"
            >
              Termos de uso
            </motion.a>
            <motion.a
              href="/privacy"
              whileHover={{ scale: 1.05 }}
              className="text-stone-300 text-xs font-['Sequel_Sans'] underline hover:text-yellow-400 transition-colors opacity-50"
            >
              Política de privacidade
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
