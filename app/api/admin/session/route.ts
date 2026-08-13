import { NextResponse } from "next/server";
import { configuredPassword, createSessionToken, isAdmin, passwordMatches, sessionCookie } from "@/lib/auth";

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: await isAdmin(request), configured: Boolean(configuredPassword()) });
}

export async function POST(request: Request) {
  const { password } = await request.json() as { password?: string };
  if (!configuredPassword()) return NextResponse.json({ error: "Defina as variáveis de segurança no Netlify antes de acessar." }, { status: 503 });
  if (!password || !(await passwordMatches(password))) return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(sessionCookie.name, await createSessionToken(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: sessionCookie.maxAge });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(sessionCookie.name, "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return response;
}
