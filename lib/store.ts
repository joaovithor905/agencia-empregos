import { getStore } from "@netlify/blobs";
import { defaultJobs, type Job } from "@/data/jobs";
import type { Candidate } from "@/data/candidates";

type RuntimeState = { jobs?: Job[]; candidates: Candidate[]; files: Map<string, { data: ArrayBuffer; type: string }> };

const runtime = globalThis as typeof globalThis & { __selectaState?: RuntimeState; netlifyBlobsContext?: unknown };
runtime.__selectaState ??= { candidates: [], files: new Map() };
const state = runtime.__selectaState;

function blobsAvailable() {
  return Boolean(process.env.NETLIFY_BLOBS_CONTEXT || runtime.netlifyBlobsContext);
}

function contentStore() {
  return getStore({ name: "selecta-content", consistency: "strong" });
}

function candidateStore() {
  return getStore({ name: "selecta-candidates", consistency: "strong" });
}

export async function getJobs(): Promise<Job[]> {
  if (blobsAvailable()) {
    try {
      const stored = await contentStore().get("jobs", { type: "json" });
      if (Array.isArray(stored)) return stored as Job[];
    } catch (error) { console.error("Falha ao ler vagas persistidas", error); }
  }
  return state.jobs ?? defaultJobs;
}

export async function saveJobs(jobs: Job[]) {
  state.jobs = jobs;
  if (blobsAvailable()) await contentStore().setJSON("jobs", jobs);
}

export async function getCandidates(): Promise<Candidate[]> {
  if (blobsAvailable()) {
    const store = candidateStore();
    const { blobs } = await store.list({ prefix: "record/" });
    const records = await Promise.all(blobs.map((blob) => store.get(blob.key, { type: "json" })));
    return records.filter(Boolean).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))) as Candidate[];
  }
  return [...state.candidates].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveCandidate(candidate: Candidate, file: File) {
  const data = await file.arrayBuffer();
  state.candidates.unshift(candidate);
  state.files.set(candidate.id, { data, type: candidate.fileType });
  if (blobsAvailable()) {
    const store = candidateStore();
    await store.setJSON(`record/${candidate.id}`, candidate);
    await store.set(`resume/${candidate.id}`, data, { metadata: { contentType: candidate.fileType, fileName: candidate.fileName } });
  }
}

export async function deleteCandidate(id: string) {
  state.candidates = state.candidates.filter((candidate) => candidate.id !== id);
  state.files.delete(id);
  if (blobsAvailable()) {
    const store = candidateStore();
    await Promise.all([store.delete(`record/${id}`), store.delete(`resume/${id}`)]);
  }
}

export async function getCandidateFile(id: string) {
  if (blobsAvailable()) {
    const store = candidateStore();
    const [data, metadata] = await Promise.all([store.get(`resume/${id}`, { type: "arrayBuffer" }), store.getMetadata(`resume/${id}`)]);
    if (!data) return null;
    return { data, type: String(metadata?.metadata?.contentType ?? "application/octet-stream"), fileName: String(metadata?.metadata?.fileName ?? "curriculo") };
  }
  const file = state.files.get(id);
  const candidate = state.candidates.find((item) => item.id === id);
  return file && candidate ? { ...file, fileName: candidate.fileName } : null;
}
