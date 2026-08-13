import Link from "next/link";
import type { Job } from "@/data/jobs";
import { JobIllustration } from "./job-illustration";

export function JobCard({ job }: { job: Job }) {
  return <article className="job-card"><div className="job-visual"><JobIllustration category={job.categoria} title={job.titulo} /></div><div className="job-card-body"><div className="job-meta"><span className={`pill ${job.status === "ativa" ? "pill--active" : "pill--closed"}`}>{job.status === "ativa" ? "Vaga aberta" : "Encerrada"}</span><span className="pill">{job.tipo}</span></div><h3>{job.titulo}</h3><p>{job.cidade} · {job.ramo}</p><div className="job-card-footer"><strong>{job.salario}</strong><Link className="text-link" href={`/vagas/${job.slug}`}>Ver detalhes →</Link></div></div></article>;
}
