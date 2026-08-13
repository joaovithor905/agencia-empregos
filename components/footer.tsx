import Link from "next/link";
import { InstagramIcon, WhatsAppIcon } from "./social-icons";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/"><span className="brand-mark">S</span><span className="brand-text"><strong>Selecta</strong><small className="footer-brand-small">Agência de Empregos</small></span></Link>
            <p>Conectando profissionais e empresas de Rio Verde com um processo mais humano, claro e eficiente.</p>
          </div>
          <div><h2 className="footer-title">Navegação</h2><div className="footer-links"><Link href="/vagas">Vagas abertas</Link><Link href="/candidatos">Enviar currículo</Link><Link href="/empresas">Para empresas</Link><Link href="/sobre">Sobre a Selecta</Link></div></div>
          <div><h2 className="footer-title">Fale com a gente</h2><div className="footer-links"><a href="tel:+5564996133525">(64) 99613-3525</a><a href="mailto:selecta.agenciarv@gmail.com">selecta.agenciarv@gmail.com</a><span>Rio Verde - GO</span><Link href="/admin">Acesso administrativo</Link></div><div className="social-links"><a className="social-link" href="https://www.instagram.com/selecta.rv/" target="_blank" rel="noreferrer" aria-label="Instagram @selecta.rv"><InstagramIcon /></a><a className="social-link" href="https://wa.me/5564996133525" target="_blank" rel="noreferrer" aria-label="WhatsApp da Selecta"><WhatsAppIcon /></a></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Selecta Agência de Empregos.</span><Link href="/privacidade">Política de Privacidade</Link></div>
      </div>
    </footer>
  );
}
