import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getJobs, saveJobs } from "@/lib/store";
import { makeSlug, type Job } from "@/data/jobs";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { id } = await params;
  const data = await request.json() as Partial<Job>;
  const jobs = await getJobs();
  const current = jobs.find((job) => job.id === id);
  if (!current) return NextResponse.json({ error: "Vaga não encontrada" }, { status: 404 });
  const updated: Job = { ...current, ...data, id, slug: data.titulo && data.titulo !== current.titulo ? `${makeSlug(data.titulo)}-${id.slice(0, 6)}` : current.slug };
  await saveJobs(jobs.map((job) => job.id === id ? updated : job));
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { id } = await params;
  const jobs = await getJobs();
  await saveJobs(jobs.filter((job) => job.id !== id));
  return NextResponse.json({ ok: true });
}
