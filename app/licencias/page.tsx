import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Inicializamos Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export const revalidate = 0; // Evita que Next.js guarde el caché de los productos antiguos

export default async function MenuLicencias() {
  // Traemos todos los productos activos ordenados por folio
  const { data: productos, error } = await supabase
    .from('productos')
    .select('slug, folio, nombre, categoria')
    .eq('activo', true)
    .order('folio', { ascending: true });

  if (error || !productos) {
    return (
      <p className="menu-licencias-error">
        Error al cargar el catálogo.
      </p>
    );
  }

  // Agrupamos los productos según los pilares oficiales de CONTPAQi
  const categorias = [
    {
      id: 'contable',
      titulo: 'Contabilidad',
      items: productos.filter((p) =>
        [
          'contabilidad',
          'tesoreria',
          'bancos',
          'xmlenlinea',
          'optimiza',
          'anticipa',
          'contabiliza',
          'despachos',
        ].includes(p.slug)
      ),
    },
    {
      id: 'comercial',
      titulo: 'Administración',
      items: productos.filter((p) =>
        [
          'comercialstart',
          'comercialpro',
          'facturacion',
          'cfdienlinea',
          'vende',
          'comercialpremium',
        ].includes(p.slug)
      ),
    },
    {
      id: 'nominas',
      titulo: 'Personas',
      items: productos.filter((p) =>
        [
          'nomina',
          'evalua035',
          'kursa',
          'personia',
        ].includes(p.slug)
      ),
    },
    {
      id: 'infraestructura',
      titulo: ' Servicios de Infraestructura',
      items: productos.filter((p) =>
        ['respaldos', 'escritoriovirtual'].includes(p.slug)
      ),
    },
  ];

  return (
    <section className="menu-licencias">
      <div className="menu-licencias-container">
        <h2 className="menu-licencias-title">
          Nuestras licencias
        </h2>

        <p className="menu-licencias-description">
          Elige el módulo que necesitas para tu empresa. Puedes combinar varios
          y conectarlos entre sí.
        </p>

        <div className="menu-licencias-grid">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className="menu-licencias-category"
            >
              <div
                className={`menu-licencias-category-title menu-cat-${cat.id}`}
              >
                {cat.titulo}
              </div>

              <div className="menu-licencias-list">
                {cat.items.map((prod) => (
                  <Link
                    key={prod.slug}
                    href={`/licencias/${prod.slug}`}
                    className="menu-licencias-link"
                  >
                    <div className="menu-licencias-folio">
                      {prod.folio}
                    </div>

                    <span className="menu-licencias-name">
                      {prod.nombre}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}