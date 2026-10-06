// components/DemoBar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Producto {
  slug: string;
  folio: string | number;
  nombre: string;
}

interface DemoBarProps {
  activeSlug: string;
  productos: Producto[];
}

export default function DemoBar({
  activeSlug,
  productos,
}: DemoBarProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú cuando se haga clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const productoActual = productos.find(
    (producto) => producto.slug === activeSlug
  );

  const handleChange = (slug: string) => {
    setOpen(false);

    if (slug) {
      router.push(`/licencias/${slug}`);
    }
  };

  return (
    <div className="demo-bar">
      <div className="container mx-auto px-4">

        <div
          ref={dropdownRef}
          className="demo-dropdown"
        >

          {/* Botón principal */}
          <button
            type="button"
            className={`demo-dropdown-button ${
              open ? 'is-open' : ''
            }`}
            onClick={() => setOpen(!open)}
          >
            <span className="demo-dropdown-text">
              {productoActual
                ? `Folio ${productoActual.folio} — ${productoActual.nombre}`
                : 'Selecciona un producto'}
            </span>

            <span
              className={`demo-dropdown-arrow ${
                open ? 'rotate' : ''
              }`}
            >
              ▼
            </span>
          </button>


          {/* Menú */}
          {open && (
            <div className="demo-dropdown-menu">

              {productos.map((producto) => (
                <button
                  key={producto.slug}
                  type="button"
                  className={`demo-dropdown-option ${
                    producto.slug === activeSlug
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    handleChange(producto.slug)
                  }
                >
                  Folio {producto.folio} — {producto.nombre}
                </button>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}