import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTOS } from '@/data/productos';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
 process.env.SUPABASE_SECRET_KEY
);

export async function GET() {
  try {
    // 1. Traemos los productos de Supabase para obtener sus UUIDs
    const { data: dbProductos, error: errorProds } = await supabase
      .from('productos')
      .select('id, slug');

    if (errorProds) throw errorProds;

    const caracteristicasAInsertar = [];

    // 2. Cruzamos los datos locales con los IDs de la base de datos
    for (const [slug, producto] of Object.entries(PRODUCTOS)) {
      const dbProd = dbProductos.find((p) => p.slug === slug);
      
      if (dbProd && producto.caracteristicas) {
        producto.caracteristicas.forEach((desc, index) => {
          caracteristicasAInsertar.push({
            producto_id: dbProd.id,
            descripcion: desc,
            orden: index + 1 // Para mantener el orden original del arreglo
          });
        });
      }
    }

    // 3. Insertamos todo en la tabla caracteristicas
    const { data, error } = await supabase
      .from('caracteristicas')
      .insert(caracteristicasAInsertar)
      .select();

    if (error) throw error;

    return NextResponse.json({ 
      mensaje: "Características migradas con éxito", 
      total_insertadas: caracteristicasAInsertar.length 
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}