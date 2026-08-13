import type { Metadata } from "next";
import { JobsExplorer } from "@/components/jobs-explorer";
import { getJobs } from "@/lib/store";

export const metadata: Metadata = { title: "Vagas abertas", description: "Consulte vagas de emprego abertas em Rio Verde - GO." };
export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = (await getJobs()).filter((job) => job.status === "ativa").sort((a, b) => b.publicadaEm.localeCompare(a.publicadaEm));
  return <main id="conteudo" className="page-main"><section className="page-hero"><div className="container"><p className="eyebrow">Oportunidades</p><h1>Encontre uma vaga com o seu perfil.</h1><p>Pesquise, confira todos os detalhes e candidate-se sem depender de uma imagem perdida no feed.</p></div></section><section className="section"><div className="container"><JobsExplorer jobs={jobs} /></div></section></main>;
}
