
import Image from "next/image";
export default function EmpresaInfo(){
    return(
        <section className="bg-[var(--bg-card)] p-6 rounded-lg shadow-lg border border-[var(--border-subtle)] mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">¿Quiénes somos?</h2>
        <p className="text-[var(--text-muted)] leading-relaxed">
            HARDSOFT SOLUCIONES es una empresa mexicana con más de 10 años de experiencia en el mercado
            de software administrativo y contable. Somos distribuidores oficiales de CONTPAQi,y ofrecemos 
            soluciones integrales para la gestión financiera, fiscal y de recursos humanos de las empresas.
            
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed mt-4">
        Nuestro equipo está conformado por consultores certificados y apasionados por la tecnología,
        dedicados a brindar asesoría personalizada y soporte técnico de primer nivel para asegurar
        que nuestros clientes obtengan el máximo rendimiento de sus herramientas digitales.
        </p>


        </section>

    );
}


