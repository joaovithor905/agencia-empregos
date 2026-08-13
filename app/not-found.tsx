import Link from "next/link";
export default function NotFound() { return <main id="conteudo" className="page-main"><section className="section"><div className="container"><div className="empty-state"><h1>Página não encontrada.</h1><p>Esse endereço não existe ou a vaga foi removida.</p><br/><Link className="button" href="/vagas">Ver vagas abertas</Link></div></div></section></main>; }
