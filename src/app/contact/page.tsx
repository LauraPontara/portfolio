import { ContactForm } from '@/components/contact'

export default function ContactPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">
        {/* Cabeçalho */}
        <div className="mb-10 text-center">
          <h1 className="font-title text-tx-primary text-4xl font-bold italic sm:text-5xl">
            Contato
          </h1>
          <p className="text-tx-muted mt-3 text-sm leading-relaxed">
            Tem um projeto em mente ou quer apenas dizer olá?
            <br />
            Preencha o formulário e eu responderei em breve.
          </p>
        </div>

        {/* Formulário */}
        <ContactForm />
      </div>
    </div>
  )
}
