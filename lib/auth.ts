const COOKIE_NAME = "selecta_admin_session";
const encoder = new TextEncoder();

function bytesToBase64Url(bytes: Uint8Array) {
  let value = "";
  bytes.forEach((byte) => { value += String.fromCharCode(byte); });
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(normalized), (char) => char.charCodeAt(0));
}

function configuredSecret() {
  return process.env.SELECTA_SESSION_SECRET || (!process.env.NETLIFY ? "selecta-local-preview-secret-2026" : "");
}

export function configuredPassword() {
  return process.env.SELECTA_ADMIN_PASSWORD || (!process.env.NETLIFY ? "selecta-demo" : "");
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) result |= a[index] ^ b[index];
  return result === 0;
}

export async function passwordMatches(received: string) {
  const expected = configuredPassword();
  const secret = configuredSecret();
  if (!expected || !secret) return false;
  const [first, second] = await Promise.all([sign(received, secret), sign(expected, secret)]);
  return constantTimeEqual(first, second);
}

export async function createSessionToken() {
  const secret = configuredSecret();
  if (!secret) throw new Error("Configuração de sessão ausente");
  const payload = bytesToBase64Url(encoder.encode(JSON.stringify({ exp: Date.now() + 8 * 60 * 60 * 1000 })));
  const signature = bytesToBase64Url(await sign(payload, secret));
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token?: string | null) {
  const secret = configuredSecret();
  if (!token || !secret) return false;
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;
    const expected = await sign(payload, secret);
    if (!constantTimeEqual(expected, base64UrlToBytes(signature))) return false;
    const data = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as { exp: number };
    return data.exp > Date.now();
  } catch { return false; }
}

export function sessionFromRequest(request: Request) {
  const raw = request.headers.get("cookie") ?? "";
  return raw.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
}

export async function isAdmin(request: Request) {
  return verifySessionToken(sessionFromRequest(request));
}

export const sessionCookie = { name: COOKIE_NAME, maxAge: 8 * 60 * 60 };
