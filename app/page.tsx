import Link from "next/link";
import { HeroIllustration } from "@/components/hero-illustration";
import { JobCard } from "@/components/job-card";
import { getJobs } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const jobs = (await getJobs()).filter((job) => job.status === "ativa").sort((a, b) => b.publicadaEm.localeCompare(a.publicadaEm)).slice(0, 3);
  return <main id="conteudo" className="page-main">
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy"><p className="eyebrow">Oportunidades em Rio Verde - GO</p><h1>Seu próximo passo pode começar <em>aqui.</em></h1><p>A Selecta aproxima pessoas prontas para crescer de empresas que valorizam bons profissionais. Encontre uma vaga ou contrate com mais segurança.</p><div className="hero-actions"><Link className="button" href="/vagas">Ver vagas abertas →</Link><Link className="button button--outline" href="/empresas">Quero contratar</Link></div><div className="hero-proof"><span>Atendimento humano</span><span>Foco regional</span><span>Processo simples</span></div></div>
      <div className="hero-art" aria-hidden="true"><div className="hero-art-card"><HeroIllustration /></div><div className="floating-badge"><strong>Vagas organizadas</strong><span>Informações completas para decidir antes de se candidatar.</span></div></div>
    </div></section>

    <section className="section section--white"><div className="container"><div className="section-head"><div><p className="eyebrow">Como ajudamos</p><h2>Um caminho claro para cada lado da contratação.</h2></div><p>O site separa a experiência de candidatos e empresas, sem misturar informações nem esconder o que importa.</p></div><div className="cards-3">
      <article className="service-card"><span className="service-icon">⌕</span><h3>Encontre sua vaga</h3><p>Pesquise oportunidades por área, modalidade e tipo de contratação.</p></article>
      <article className="service-card"><span className="service-icon">↗</span><h3>Envie seu currículo</h3><p>Cadastre seu perfil para participar das oportunidades compatíveis.</p></article>
      <article className="service-card"><span className="service-icon">◇</span><h3>Contrate melhor</h3><p>Conte com apoio na divulgação, triagem e seleção de profissionais.</p></article>
    </div></div></section>

    <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">Vagas recentes</p><h2>Oportunidades que merecem sua atenção.</h2></div><Link className="button button--outline" href="/vagas">Ver todas as vagas</Link></div><div className="job-grid">{jobs.length ? jobs.map((job) => <JobCard key={job.id} job={job} />) : <div className="empty-state"><h3>Novas vagas em breve</h3><p>Cadastre seu currículo para entrar no banco de talentos.</p></div>}</div></div></section>

    <section className="section section--mint"><div className="container split"><div className="split-copy"><p className="eyebrow">Recrutamento próximo</p><h2>Gente cuidando de cada etapa, com atenção de verdade.</h2><p>Em vez de currículos perdidos em mensagens e vagas espalhadas, a Selecta organiza o processo e facilita a conexão entre quem busca uma oportunidade e quem precisa contratar.</p><Link className="button" href="/sobre">Conheça a Selecta</Link></div><div className="value-stack"><div className="value-item"><b>01</b><div><h3>Informações completas</h3><p>Cargo, requisitos, horário, remuneração e benefícios apresentados com clareza.</p></div></div><div className="value-item"><b>02</b><div><h3>Atuação regional</h3><p>Conhecimento do mercado de trabalho de Rio Verde e região.</p></div></div><div className="value-item"><b>03</b><div><h3>Contato acessível</h3><p>WhatsApp, e-mail e candidatura online sem labirinto de cliques.</p></div></div></div></div></section>

    <section className="section section--white"><div className="container"><div className="cta-panel"><div><h2>Procurando talentos para sua empresa?</h2><p>Conte o perfil da vaga e receba atendimento para encontrar profissionais alinhados à sua necessidade.</p></div><Link className="button button--lime" href="/empresas">Solicitar recrutamento →</Link></div></div></section>
  </main>;
}
