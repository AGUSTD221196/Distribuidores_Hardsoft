import Link from 'next/link';

interface TarjetaProductoProps {
  titulo: string;
  description: string;
  icono?: string;
  enlace: string;
}

export default function TarjetaProducto({ titulo, description, icono, enlace }: TarjetaProductoProps) {
  return (
    <Link 
      href={enlace} 
      className="bg-[#1E293B] rounded-xl p-6 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group"
    >
      {/* 1. Título (Centrado) */}
      <h3 className="text-xl font-bold text-[#E2E8F0] text-center mb-5 leading-tight">
        {titulo}
      </h3>
      
      {/* 2. Imagen (Centrada debajo del título) */}
      {icono && (
        <div className="flex justify-center mb-5">
          <img 
            src={icono} 
            alt={`Logo de ${titulo}`} 
            className="w-20 h-20 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {/* 3. Descripción (Con flex-grow para empujar el botón al fondo) */}
      <p className="text-sm text-gray-400 mb-6 text-center flex-grow">
        {description}
      </p>
      
      {/* 4. Enlace (Centrado en la parte inferior) */}
      <div className="mt-auto flex justify-center">
        <span className="text-[#00A82D] font-bold text-sm flex items-center gap-2">
          Ver detalles 
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}