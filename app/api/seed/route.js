import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTOS } from '@/data/productos';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);
export async function GET() {
  try {
    const productosArray = Object.keys(PRODUCTOS).map((key) => {
      const prod = PRODUCTOS[key];

      return {
        slug: key,
        folio: prod.folio,
        nombre: prod.nombre,
        tagline: prod.tagline,
        descripcion: prod.descripcion,
        entorno: prod.entorno,
        categoria: prod.categoria,
        imagen_url: prod.icono,
        activo: true
      };
    });

    const { data, error } = await supabase
      .from('productos')
      .insert(productosArray)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      mensaje: 'Productos migrados con éxito',
      productos_insertados: data
    });

  } catch (error) {
    console.error('Error detallado:', error);

    return NextResponse.json(
      {
        error: error instanceof Error
          ? error.message
          : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}