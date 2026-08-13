export type JobCategory = "administrativo" | "comercial" | "logistica" | "industria" | "servicos" | "tecnologia";

export type Job = {
  id: string;
  slug: string;
  titulo: string;
  cidade: string;
  ramo: string;
  horario: string;
  requisitos: string[];
  salario: string;
  beneficios: string[];
  descricao: string;
  modalidade: "Presencial" | "Híbrido" | "Remoto";
  tipo: string;
  categoria: JobCategory;
  destaque: boolean;
  status: "ativa" | "encerrada";
  publicadaEm: string;
};

export const defaultJobs: Job[] = [
  {
    id: "vaga-001", slug: "assistente-administrativo", titulo: "Assistente Administrativo", cidade: "Rio Verde - GO",
    ramo: "Serviços administrativos", horario: "Segunda a sexta, das 8h às 18h",
    requisitos: ["Ensino médio completo", "Conhecimento em Pacote Office", "Boa comunicação e organização"],
    salario: "A combinar", beneficios: ["Vale-alimentação", "Vale-transporte", "Plano de saúde"],
    descricao: "Apoio às rotinas administrativas, organização de documentos, atendimento e atualização de controles internos.",
    modalidade: "Presencial", tipo: "CLT", categoria: "administrativo", destaque: true, status: "ativa", publicadaEm: "2026-08-12",
  },
  {
    id: "vaga-002", slug: "consultor-de-vendas", titulo: "Consultor(a) de Vendas", cidade: "Rio Verde - GO",
    ramo: "Comércio varejista", horario: "Horário comercial, com escala aos sábados",
    requisitos: ["Experiência com atendimento ou vendas", "Facilidade para trabalhar com metas", "Ensino médio completo"],
    salario: "Salário fixo + comissão", beneficios: ["Comissão", "Vale-alimentação", "Bonificação por resultado"],
    descricao: "Atendimento consultivo, prospecção de clientes, apresentação de produtos e acompanhamento de metas comerciais.",
    modalidade: "Presencial", tipo: "CLT", categoria: "comercial", destaque: true, status: "ativa", publicadaEm: "2026-08-11",
  },
  {
    id: "vaga-003", slug: "auxiliar-de-logistica", titulo: "Auxiliar de Logística", cidade: "Rio Verde - GO",
    ramo: "Logística e distribuição", horario: "Segunda a sábado, em horário a definir",
    requisitos: ["Ensino médio completo", "Disponibilidade de horário", "Agilidade e atenção aos detalhes"],
    salario: "R$ 1.850,00", beneficios: ["Vale-alimentação", "Transporte fretado", "Seguro de vida"],
    descricao: "Separação e conferência de produtos, apoio no carregamento, organização do estoque e registro de movimentações.",
    modalidade: "Presencial", tipo: "CLT", categoria: "logistica", destaque: true, status: "ativa", publicadaEm: "2026-08-09",
  },
  {
    id: "vaga-004", slug: "analista-de-suporte-junior", titulo: "Analista de Suporte Júnior", cidade: "Rio Verde - GO",
    ramo: "Tecnologia", horario: "Segunda a sexta, das 8h às 17h",
    requisitos: ["Cursando área de tecnologia", "Conhecimentos básicos em redes e Windows", "Perfil prestativo e comunicativo"],
    salario: "A combinar", beneficios: ["Vale-refeição", "Plano de saúde", "Auxílio-educação"],
    descricao: "Atendimento a usuários, registro e acompanhamento de chamados, configuração de equipamentos e suporte básico de infraestrutura.",
    modalidade: "Presencial", tipo: "CLT", categoria: "tecnologia", destaque: false, status: "ativa", publicadaEm: "2026-08-07",
  },
];

export function makeSlug(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
