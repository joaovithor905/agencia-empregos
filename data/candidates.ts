export type Candidate = {
  id: string;
  nome: string;
  whatsapp: string;
  email: string;
  cidade: string;
  area: string;
  experiencia: string;
  fileName: string;
  fileType: string;
  createdAt: string;
  status: "novo" | "analisado";
};
