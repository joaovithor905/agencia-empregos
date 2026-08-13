import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobIllustration } from "@/components/job-illustration";
import { getJobs } from "@/lib/store";

export const dynamic = "force-dynamic";

async function findJob(slug: string) { return (await getJobs()).find((job) => job.slug === slug); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const job = await findJob(slug);
  return job ? { title: job.titulo, description: `${job.titulo} em ${job.cidade}. Confira requisitos, salário e benefícios.` } : { title: "Vaga não encontrada" };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const job = await findJob(slug); if (!job) notFound();
  const message = encodeURIComponent(`Olá, tenho interesse na vaga de ${job.titulo} divulgada no site da Selecta.`);
  return <main id="conteudo" className="page-main"><section className="page-hero page-hero--compact"><div className="container"><div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><Link href="/vagas">Vagas</Link><span>/</span><span>{job.titulo}</span></div><div className="job-meta"><span className={`pill ${job.status === "ativa" ? "pill--active" : "pill--closed"}`}>{job.status === "ativa" ? "Vaga aberta" : "Vaga encerrada"}</span><span className="pill">{job.tipo}</span></div><h1>{job.titulo}</h1><p>{job.cidade} · {job.ramo}</p></div></section><section className="section"><div className="container job-detail"><article className="detail-main"><div className="detail-visual"><JobIllustration category={job.categoria} title={job.titulo} /></div><div className="detail-content"><h2>Sobre a oportunidade</h2><p>{job.descricao}</p><h2>Requisitos</h2><ul className="check-list">{job.requisitos.map((item) => <li key={item}>{item}</li>)}</ul><h2>Salário e benefícios</h2><p><strong>{job.salario}</strong></p><ul className="check-list">{job.beneficios.map((item) => <li key={item}>{item}</li>)}</ul></div></article><aside className="detail-sidebar"><h2>Resumo da vaga</h2><div className="detail-fact"><span>Cidade</span><strong>{job.cidade}</strong></div><div className="detail-fact"><span>Ramo</span><strong>{job.ramo}</strong></div><div className="detail-fact"><span>Horário de trabalho</span><strong>{job.horario}</strong></div><div className="detail-fact"><span>Modalidade</span><strong>{job.modalidade}</strong></div><div className="detail-fact"><span>Salário</span><strong>{job.salario}</strong></div>{job.status === "ativa" ? <a className="button" href={`https://wa.me/5564996133525?text=${message}`} target="_blank" rel="noreferrer">Tenho interesse</a> : <Link className="button button--outline" href="/vagas">Ver vagas abertas</Link>}</aside></div></section></main>;
}
