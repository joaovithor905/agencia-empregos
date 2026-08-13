import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteCandidate } from "@/lib/store";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { id } = await params;
  await deleteCandidate(id);
  return NextResponse.json({ ok: true });
}
