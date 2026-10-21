"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  // Estado para controlar la visibilidad del menú en teléfonos
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="bg-[var(--bg-header)] border-b border-[var(--border-subtle)] p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-white">
          <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden ring-1 ring-white/10">
            <Image
              src="https://ftpfuonfqsnmdwipiety.supabase.co/storage/v1/object/public/images/LOGO_HS.png"
              alt="Hardsoft Soluciones Logo"
              fill
              sizes="48px"
              loading="eager"
              className="object-cover"
            />
          </div>
          <span>
            HARDSOFT <span className="text-[var(--accent-action)]">SOLUCIONES</span>
          </span>
        </Link>

        {/* Botón de Menú Hamburguesa (Solo visible en móviles) */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="text-[var(--text-primary)] hover:text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation y WhatsApp (Escritorio) */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 text-[var(--text-primary)]">
            <Link href="/" className="hover:text-[var(--accent-action)] transition">Inicio</Link>
            <Link href="/licencias" className="hover:text-[var(--accent-action)] transition">Licencias</Link>
            <Link href="/nosotros" className="hover:text-[var(--accent-action)] transition">Nosotros</Link>
          </nav>

          {/* Botón WhatsApp corregido con etiqueta <a> y target="_blank" */}
          <a 
            href="https://wa.me/5210000000000" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--accent-action)] text-white px-4 py-2 rounded-md hover:bg-[var(--accent-action-hover)] hover:text-[var(--bg-main)] transition"
          >
            WHATSAPP
          </a>
        </div>
      </div>

      {/* Menú Desplegable (Móvil) */}
      {menuAbierto && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[var(--bg-header)] border-b border-[var(--border-subtle)] shadow-lg">
          <nav className="flex flex-col p-4 gap-4">
            <Link 
              href="/" 
              onClick={toggleMenu}
              className="text-[var(--text-primary)] hover:text-white transition"
            >
              Inicio
            </Link>
            <Link 
              href="/licencias" 
              onClick={toggleMenu}
              className="text-[var(--text-primary)] hover:text-white transition"
            >
              Licencias
            </Link>
            <Link 
              href="/nosotros" 
              onClick={toggleMenu}
              className="text-[var(--text-primary)] hover:text-white transition"
            >
              Nosotros
            </Link>
            <a 
              href="https://wa.me/527498505685" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
              className="bg-[var(--accent-action)] text-white text-center px-4 py-2 rounded-md hover:bg-[var(--accent-action-hover)] hover:text-[var(--bg-main)] transition"
            >
              WHATSAPP
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}