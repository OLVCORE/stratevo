"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import SocialButton from './SocialButton';
import './auth-card.css';

interface Props {
  mode: 'login' | 'signup';
  onModeChange: (m: 'login' | 'signup') => void;
  onClose: () => void;
}

export default function AuthCardOLVUniversal({ mode, onModeChange, onClose }: Props) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    city: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [k]: e.target.value });
  };

  async function handleSubmit() {
    setError(null);
    if (mode === 'signup') {
      if (!form.firstName || !form.lastName || !form.email || !form.password) {
        setError('Preencha todos os campos obrigatórios');
        return;
      }
      if (form.password !== form.confirm) {
        setError('As senhas devem coincidir');
        return;
      }
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            company: form.company,
            city: form.city,
            phone: form.phone,
          },
        },
      });
      setLoading(false);
      if (error) setError(error.message);
      else onClose();
    } else {
      // login
      if (!form.email || !form.password) {
        setError('Informe email e senha');
        return;
      }
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      setLoading(false);
      if (error) setError(error.message);
      else onClose();
    }
  }

  return (
    <div className="auth-card border border-[var(--color-gold)] shadow-lg rounded-lg md:rounded-l-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
      {/* Formulário institucional */}
      <div className="p-8 md:p-10 flex flex-col justify-center space-y-6 text-[var(--color-on-surface-opposite)]">
        <div>
          <h1 className="text-2xl font-semibold mb-1">{mode === 'login' ? 'Bem-vindo!' : 'Criar sua conta'}</h1>
          <p className="text-sm opacity-80">Que bom ter você aqui</p>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2">
          {mode === 'signup' && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="form-label sr-only" htmlFor="fname">Nome</label>
                  <input id="fname" type="text" placeholder="Nome" className="form-input text-sm" value={form.firstName} onChange={handleChange('firstName')} />
                </div>
                <div>
                  <label className="form-label sr-only" htmlFor="lname">Sobrenome</label>
                  <input id="lname" type="text" placeholder="Sobrenome" className="form-input text-sm" value={form.lastName} onChange={handleChange('lastName')} />
                </div>
              </div>
              <label className="form-label sr-only" htmlFor="company">Empresa</label>
              <input id="company" type="text" placeholder="Empresa" className="form-input text-sm" value={form.company} onChange={handleChange('company')} />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="form-label sr-only" htmlFor="city">Cidade</label>
                  <input id="city" type="text" placeholder="Cidade" className="form-input text-sm" value={form.city} onChange={handleChange('city')} />
                </div>
                <div>
                  <label className="form-label sr-only" htmlFor="phone">Telefone</label>
                  <input id="phone" type="tel" placeholder="Telefone" className="form-input text-sm" value={form.phone} onChange={handleChange('phone')} />
                </div>
              </div>
            </>
          )}

          <label className="form-label sr-only" htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="E-mail" className="form-input text-sm" value={form.email} onChange={handleChange('email')} />

          <label className="form-label sr-only" htmlFor="pass">Senha</label>
          <input id="pass" type="password" placeholder="Senha" className="form-input text-sm" value={form.password} onChange={handleChange('password')} />

          {mode === 'signup' && (
            <>
              <label className="form-label sr-only" htmlFor="confirm">Confirmar senha</label>
              <input id="confirm" type="password" placeholder="Confirmar senha" className="form-input text-sm" value={form.confirm} onChange={handleChange('confirm')} />
            </>
          )}

          {mode === 'login' && (
            <div className="text-right text-xs"><button className="hover:underline" onClick={() => supabase.auth.resetPasswordForEmail(form.email)}>Esqueceu a senha?</button></div>
          )}

          <button onClick={handleSubmit} disabled={loading} className="w-full py-2 rounded bg-[var(--color-primary)] text-white hover:opacity-90 disabled:opacity-60">
            {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </div>

        {/* social */}
        <div className="text-center text-sm opacity-70">Ou continuar com</div>
        <div className="flex gap-3 justify-center">
          <SocialButton provider="google" onClick={async ()=>{
            try { await supabase.auth.signInWithOAuth({provider:'google'}); }
            catch(err){ alert('Login Google indisponível no momento'); }
          }} />
          <SocialButton provider="facebook" onClick={async ()=>{
            try { await supabase.auth.signInWithOAuth({provider:'facebook'}); }
            catch(err){ alert('Login Facebook indisponível no momento'); }
          }} />
          <SocialButton provider="linkedin" onClick={async ()=>{
            try { await supabase.auth.signInWithOAuth({provider:'linkedin'}); }
            catch(err){ alert('Login LinkedIn indisponível no momento'); }
          }} />
        </div>

        <div className="text-center text-sm">
          {mode === 'login' ? (
            <>Ainda não tem conta? <button onClick={() => onModeChange('signup')} className="text-[var(--color-accent)] hover:underline">Criar conta</button></>
          ) : (
            <>Voltar para <button onClick={() => onModeChange('login')} className="text-[var(--color-accent)] hover:underline">Entrar</button></>
          )}
        </div>
      </div>

      {/* banner institucional */}
      <div className="hidden md:block relative rounded-r-lg overflow-hidden h-full">
        <Image src="/logo-stratevo.svg" alt="STRATEVO" fill className="object-contain bg-white" />
      </div>
    </div>
  );
} 