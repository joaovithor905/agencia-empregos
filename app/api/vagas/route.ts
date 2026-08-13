import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getJobs, saveJobs } from "@/lib/store";
import { makeSlug, type Job } from "@/data/jobs";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getJobs(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const data = await request.json() as Partial<Job>;
  if (!data.titulo || !data.cidade || !data.ramo) return NextResponse.json({ error: "Preencha os campos obrigatórios" }, { status: 400 });
  const jobs = await getJobs();
  const id = crypto.randomUUID();
  const job: Job = { id, slug: `${makeSlug(data.titulo)}-${id.slice(0, 6)}`, titulo: data.titulo, cidade: data.cidade, ramo: data.ramo, requisitos: data.requisitos ?? [], beneficios: data.beneficios ?? [], publicadaEm: data.publicadaEm || new Date().toISOString().slice(0, 10), modalidade: data.modalidade ?? "Presencial", tipo: data.tipo ?? "CLT", categoria: data.categoria ?? "administrativo", destaque: Boolean(data.destaque), status: data.status ?? "ativa", horario: data.horario ?? "A combinar", salario: data.salario ?? "A combinar", descricao: data.descricao ?? "" };
  await saveJobs([job, ...jobs]);
  return NextResponse.json(job, { status: 201 });
}
