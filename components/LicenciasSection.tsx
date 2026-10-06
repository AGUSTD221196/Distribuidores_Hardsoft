import TarjetaProducto from './TarjetaProducto';
// 1. Importamos el cliente básico de Supabase directamente
import { createClient } from '@supabase/supabase-js'; 

// 2. Inicializamos la conexión directamente con tus variables de entorno públicas
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default async function LicenciasSection() {
  // 3. Consultamos la base de datos solicitando solo los campos necesarios
  const { data: licencias, error } = await supabase
    .from('productos')
    .select('nombre, descripcion, imagen_url, slug')
    .limit(4);

  // Si hay un error de conexión, mostramos un mensaje en lugar de tumbar la página
  if (error || !licencias) {
    return (
      <section className="py-16 px-4 bg-[var(--bg-main)]">
        <p className="text-center text-white">Error cargando los productos...</p>
      </section>
    );
  }

  return (
    <section id="licencias" className="py-16 px-4 bg-[var(--bg-main)]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-2">LAS MÁS VENDIDAS</h2>
        <p className="text-center text-[var(--text-muted)] mb-12">Soluciones CONTPAQi para tu Negocio</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {licencias.map((lic, index) => (
            <TarjetaProducto 
              key={index} 
              titulo={lic.nombre} 
              description={lic.descripcion} 
              icono={lic.imagen_url} 
              enlace={`/licencias/${lic.slug}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}