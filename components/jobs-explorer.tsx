"use client";

import { useState } from "react";
import { JobCard } from "./job-card";
import type { Job } from "@/data/jobs";

export function JobsExplorer({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState(""); const [branch, setBranch] = useState(""); const [type, setType] = useState("");
  const branches = [...new Set(jobs.map((job) => job.ramo))].sort();
  const types = [...new Set(jobs.map((job) => job.tipo))].sort();
  const filtered = jobs.filter((job) => { const term = `${job.titulo} ${job.cidade} ${job.ramo}`.toLowerCase(); return term.includes(query.toLowerCase()) && (!branch || job.ramo === branch) && (!type || job.tipo === type); });
  return <><div className="filters"><div className="field"><label htmlFor="busca">Cargo, cidade ou palavra-chave</label><input id="busca" className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: Administrativo" /></div><div className="field"><label htmlFor="ramo">Área</label><select id="ramo" className="select" value={branch} onChange={(event) => setBranch(event.target.value)}><option value="">Todas as áreas</option>{branches.map((item) => <option key={item}>{item}</option>)}</select></div><div className="field"><label htmlFor="tipo">Contratação</label><select id="tipo" className="select" value={type} onChange={(event) => setType(event.target.value)}><option value="">Todos os tipos</option>{types.map((item) => <option key={item}>{item}</option>)}</select></div></div><p className="results-count">{filtered.length} {filtered.length === 1 ? "vaga encontrada" : "vagas encontradas"}</p><div className="job-grid">{filtered.map((job) => <JobCard key={job.id} job={job} />)}{!filtered.length && <div className="empty-state"><h3>Nenhuma vaga com esses filtros</h3><p>Tente outro termo ou limpe os filtros.</p></div>}</div></>;
}
