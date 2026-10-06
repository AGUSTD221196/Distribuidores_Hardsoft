import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTOS } from '@/data/productos'; // Asegúrate de que la ruta coincida con tu archivo local

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export async function GET() {
  try {
    // 1. Obtenemos todos los productos de la BD para tener sus UUIDs reales
    const { data: dbProductos, error: errorProds } = await supabase
      .from('productos')
      .select('id, slug');

    if (errorProds) throw errorProds;

    const relacionesAInsertar = [];

    // 2. Extraemos el arreglo 'conecta' de cada producto y cruzamos los IDs
    for (const [slugOrigen, producto] of Object.entries(PRODUCTOS)) {
      const prodOrigenDb = dbProductos.find(p => p.slug === slugOrigen);

      if (prodOrigenDb && producto.conecta) {
        for (const slugDestino of producto.conecta) {
          const prodDestinoDb = dbProductos.find(p => p.slug === slugDestino);

          if (prodDestinoDb) {
            relacionesAInsertar.push({
              producto_origen_id: prodOrigenDb.id,
              producto_destino_id: prodDestinoDb.id
            });
          }
        }
      }
    }

    // 3. Insertamos el cruce en la tabla de productos_relacionados
    const { data, error } = await supabase
      .from('productos_relacionados')
      .insert(relacionesAInsertar)
      .select();

    if (error) throw error;

    return NextResponse.json({ 
      mensaje: "Relaciones migradas con éxito", 
      total_insertadas: relacionesAInsertar.length 
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}