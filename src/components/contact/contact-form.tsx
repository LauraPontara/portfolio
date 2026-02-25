'use client'

import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'

import EMAILJS_CONFIG from '@/config/emailjs.config'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)
      .value
    const time = new Date().toLocaleString('pt-BR')

    const templateParams = { name, email, message, time }

    try {
      // 1. Notificação para o dono do portfólio
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME,
        { ...templateParams, title: `Nova mensagem do site de: ${name}` },
        EMAILJS_CONFIG.PUBLIC_KEY,
      )

      // 2. Confirmação para o visitante
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER,
        { ...templateParams, title: 'Recebi sua mensagem!' },
        EMAILJS_CONFIG.PUBLIC_KEY,
      )

      setStatus('success')
      formRef.current?.reset()
    } catch (err) {
      console.error('Erro ao enviar email:', err)
      setStatus('error')
    }
  }

  const inputBase =
    'w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-tx-primary placeholder:text-tx-muted outline-none transition-all duration-200 focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5"
      noValidate
    >
      {/* Nome */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="text-tx-accent text-xs font-semibold tracking-wider uppercase"
        >
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Seu nome completo"
          disabled={status === 'loading'}
          className={inputBase}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-tx-accent text-xs font-semibold tracking-wider uppercase"
        >
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="seu@email.com"
          disabled={status === 'loading'}
          className={inputBase}
        />
      </div>

      {/* Mensagem */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-tx-accent text-xs font-semibold tracking-wider uppercase"
        >
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Escreva sua mensagem..."
          disabled={status === 'loading'}
          className={cn(inputBase, 'resize-none')}
        />
      </div>

      {/* Feedback */}
      {status === 'success' && (
        <p className="text-tx-success text-sm font-medium">
          ✓ Mensagem enviada com sucesso! Você receberá um e-mail de confirmação
          em breve.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm font-medium text-red-500">
          ✕ Ocorreu um erro ao enviar a mensagem. Tente novamente.
        </p>
      )}

      {/* Botão */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'mt-1 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200',
          'from-accent-3 to-accent-5 bg-gradient-to-r hover:opacity-90',
          'disabled:cursor-not-allowed disabled:opacity-60',
        )}
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
      </button>
    </form>
  )
}
