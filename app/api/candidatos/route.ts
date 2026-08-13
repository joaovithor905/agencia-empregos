import { NextResponse } from "next/server";
import { saveCandidate } from "@/lib/store";
import type { Candidate } from "@/data/candidates";

const accepted = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const acceptedExtensions = [".pdf", ".doc", ".docx"];

export async function POST(request: Request) {
  const form = await request.formData();
  if (String(form.get("website") ?? "").trim()) return NextResponse.json({ ok: true }, { status: 201 });
  const file = form.get("curriculo");
  const required = ["nome", "whatsapp", "email", "cidade", "area"];
  if (required.some((field) => !String(form.get(field) ?? "").trim())) return NextResponse.json({ error: "Preencha os campos obrigatórios." }, { status: 400 });
  if (form.get("consentimento") !== "on") return NextResponse.json({ error: "É necessário autorizar o tratamento dos dados." }, { status: 400 });
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Anexe seu currículo." }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "O currículo deve ter no máximo 5 MB." }, { status: 400 });
  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
  if (!accepted.includes(file.type) && !acceptedExtensions.includes(extension)) return NextResponse.json({ error: "Envie o currículo em PDF, DOC ou DOCX." }, { status: 400 });
  const candidate: Candidate = { id: crypto.randomUUID(), nome: String(form.get("nome")), whatsapp: String(form.get("whatsapp")), email: String(form.get("email")), cidade: String(form.get("cidade")), area: String(form.get("area")), experiencia: String(form.get("experiencia") ?? ""), fileName: file.name.replace(/[^a-zA-Z0-9._ -]/g, ""), fileType: file.type || "application/octet-stream", createdAt: new Date().toISOString(), status: "novo" };
  await saveCandidate(candidate, file);
  return NextResponse.json({ ok: true }, { status: 201 });
}
