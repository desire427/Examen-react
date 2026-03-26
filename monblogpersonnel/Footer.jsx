// src/components/Common/Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="mt-auto bg-slate-100 border-t border-slate-200">
            <div className="container mx-auto px-4 py-6 text-sm text-slate-600">
                <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                    <span>© {new Date().getFullYear()} MonBlog. Tous droits réservés.</span>
                    <div className="flex gap-3">
                        <a href="#" className="hover:text-brand-700">
                            Politique de confidentialité
                        </a>
                        <a href="#" className="hover:text-brand-700">
                            Conditions d'utilisation
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;