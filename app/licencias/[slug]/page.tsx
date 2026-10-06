import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import DemoBar from '@/components/DemoBar';
import Caracteristicas from '@/components/Caracteristicas';

export const revalidate = 0;

// Conexión con Supabase para lectura pública
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default async function LicenciaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ============================================================
  // 1. CONSULTAMOS EL PRODUCTO ACTUAL Y SUS CARACTERÍSTICAS
  // ============================================================
  const { data: p, error } = await supabase
    .from('productos')
    .select(`
      *,
      caracteristicas (
        descripcion,
        orden
      )
    `)
    .eq('slug', slug)
    .single();

  // ============================================================
  // 2. TRAEMOS TODOS LOS PRODUCTOS PARA EL MENÚ DESPLEGABLE
  // ============================================================
  const { data: todosLosProductos } = await supabase
    .from('productos')
    .select('slug, folio, nombre')
    .order('folio', { ascending: true });

  // ============================================================
  // ERROR: PRODUCTO NO ENCONTRADO
  // ============================================================
  if (error || !p) {
    return (
      <>
        <main id="main">
          <div className="wrap notfound p-20 text-center text-white">
            <h2 className="text-2xl font-bold">
              No encontramos esa herramienta
            </h2>

            <p className="mt-4">
              <Link
                href="/#catalogo"
                className="text-[var(--accent-action)]"
              >
                Vuelve al catálogo
              </Link>{' '}
              y elige un producto.
            </p>
          </div>
        </main>
      </>
    );
  }

  // ============================================================
  // 3. ORDENAMOS LAS CARACTERÍSTICAS
  // ============================================================
  const caracteristicasFormateadas = (p.caracteristicas ?? [])
    .sort((a: any, b: any) => a.orden - b.orden)
    .map((c: any) => c.descripcion);

  // ============================================================
  // 4. PRODUCTOS RELACIONADOS
  // ============================================================

  // A. Buscamos los IDs de los productos destino
  const { data: relaciones } = await supabase
    .from('productos_relacionados')
    .select('producto_destino_id')
    .eq('producto_origen_id', p.id);

  // B. Extraemos los IDs a un arreglo
  const idsDestino =
    relaciones?.map((r) => r.producto_destino_id) || [];

  // C. Traemos la información de esos productos
  let productosRelacionados: any[] = [];

  if (idsDestino.length > 0) {
    const { data: prods } = await supabase
      .from('productos')
      .select('slug, folio, nombre')
      .in('id', idsDestino);

    if (prods) {
      productosRelacionados = prods;
    }
  }

  // ============================================================
  // 5. TEXTO PARA WHATSAPP
  // ============================================================
  const waTexto = encodeURIComponent(
    `Hola, quiero cotizar la licencia de ${p.nombre}`
  );

  // ============================================================
  // 6. RENDERIZADO
  // ============================================================
  return (
    <>
      {/* Pasamos todos los productos al menú desplegable */}
      <DemoBar
        activeSlug={slug}
        productos={todosLosProductos || []}
      />

      <main id="main">

        {/* Encabezado del producto */}
        <section className="header-prod ruled py-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">

            <span className="eyebrow text-sm uppercase tracking-widest text-[var(--text-muted)]">
              CONTPAQi · Folio {p.folio}
            </span>

            <h1 className="prod-title text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              {p.nombre}
            </h1>

            <p className="prod-tagline text-xl text-[var(--accent-action)] mb-4">
              {p.tagline}
            </p>

            <p className="prod-desc text-lg text-[var(--text-secondary)]">
              {p.descripcion}
            </p>

          </div>
        </section>

        {/* Características */}
        <Caracteristicas
          caracteristicas={caracteristicasFormateadas}
        />

        {/* =====================================================
            PRODUCTOS RELACIONADOS
        ====================================================== */}
        {productosRelacionados.length > 0 && (
          <section className="section bordered py-12 px-4">

            <div className="container mx-auto max-w-4xl">

              <span className="eyebrow text-sm uppercase tracking-widest text-[var(--accent-action)] mb-2 block">
                Arma tu paquete
              </span>

              <h2 className="text-3xl font-bold text-white mb-8">
                Se relaciona mejor con:
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {productosRelacionados.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/licencias/${rel.slug}`}
                    className="bg-[var(--surface-sunken)] border border-[var(--border-subtle)] p-6 rounded-lg hover:border-[var(--accent-action)] transition-colors flex flex-col"
                  >

                    <span className="text-sm text-[var(--text-muted)] mb-1">
                      Folio {rel.folio}
                    </span>

                    <strong className="text-lg text-white mb-4">
                      {rel.nombre}
                    </strong>

                    <span className="text-[var(--accent-action)] text-sm font-bold mt-auto">
                      Ver detalles de licencia →
                    </span>

                  </Link>
                ))}

              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            COTIZACIÓN
        ====================================================== */}
        <section className="section bordered py-12 px-4">

          <div className="container mx-auto max-w-4xl">

            <div className="cta-band bg-[var(--surface-sunken)] p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-[var(--border-subtle)]">

              <div className="cta-left text-white">

                <h3 className="text-2xl font-bold mb-2">
                  Cotiza tu licencia de {p.nombre}
                </h3>

                <p className="text-[var(--text-secondary)]">
                  Un asesor de HardSoft te ayuda a definir usuarios,
                  empresas y el plan que más te conviene.
                </p>

              </div>

              <a
                className="btn btn-primary bg-[var(--accent-action)] text-black px-6 py-3 rounded-full font-bold whitespace-nowrap hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://wa.me/527498505685?text=${waTexto}`}
              >
                Cotizar por WhatsApp →
              </a>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}