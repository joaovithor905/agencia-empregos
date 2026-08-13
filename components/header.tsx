"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [["/", "Início"], ["/vagas", "Vagas"], ["/candidatos", "Candidatos"], ["/empresas", "Empresas"], ["/sobre", "Sobre"], ["/contato", "Contato"]];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Selecta Agência de Empregos - início">
          <span className="brand-mark">S</span><span className="brand-text"><strong>Selecta</strong><small>Agência de Empregos</small></span>
        </Link>
        <button className="mobile-toggle" type="button" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /></button>
        <nav className={`nav ${open ? "is-open" : ""}`} aria-label="Menu principal">
          {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active(href) ? "page" : undefined}>{label}</Link>)}
          <Link className="button button--small" href="/vagas" onClick={() => setOpen(false)}>Encontrar uma vaga</Link>
        </nav>
      </div>
    </header>
  );
}
