export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[var(--bg-header)] border-t border-[var(--border-subtle)] text-[var(--text-muted)] mt-8">

            {/* Contenido principal */}
            <div className="container mx-auto px-6 md:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

                    {/* Columna 1: Empresa */}
                    <div>
                        <h3 className="text-white font-bold text-xl mb-3">
                            HARDSOFT SOLUCIONES
                        </h3>

                        {/* Detalle decorativo */}
                        <div className="w-10 h-[3px] bg-[var(--accent-gold)] rounded-full mb-4" />

                        <p className="text-sm leading-7 max-w-lg">
                            Distribuidor oficial y especializado en software
                            administrativo y contable. Ayudamos a modernizar
                            y proteger el ecosistema digital de tu empresa.
                        </p>
                    </div>

                    {/* Columna 2: Contacto */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">
                            Contacto y soporte
                        </h4>

                        <ul className="text-sm space-y-4">

                            {/* Teléfono */}
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--accent-gold)]">
                                    ☎
                                </span>

                                <div>
                                    <p className="text-white font-medium">
                                        Teléfono
                                    </p>
                                    <p>
                                        +52 749 105 49 75
                                    </p>
                                </div>
                            </li>

                            {/* Correo */}
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--accent-gold)]">
                                    ✉
                                </span>

                                <div>
                                    <p className="text-white font-medium">
                                        Correo electrónico
                                    </p>
                                    <p>
                                        Correo de contacto
                                    </p>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-[var(--border-subtle)] mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left text-xs">
                    <p>
                        © {year} HARDSOFT SOLUCIONES.
                    </p>

                    <p>
                        Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
