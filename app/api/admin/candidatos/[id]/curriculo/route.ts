import { isAdmin } from "@/lib/auth";
import { getCandidateFile } from "@/lib/store";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin(request))) return new Response("Não autorizado", { status: 401 });
  const { id } = await params;
  const file = await getCandidateFile(id);
  if (!file) return new Response("Arquivo não encontrado", { status: 404 });
  const safeName = file.fileName.replace(/["\\]/g, "");
  return new Response(file.data, { headers: { "Content-Type": file.type, "Content-Disposition": `attachment; filename="${safeName}"`, "Cache-Control": "private, no-store" } });
}
