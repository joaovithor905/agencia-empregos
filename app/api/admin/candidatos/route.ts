import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getCandidates } from "@/lib/store";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  return NextResponse.json(await getCandidates(), { headers: { "Cache-Control": "no-store" } });
}
