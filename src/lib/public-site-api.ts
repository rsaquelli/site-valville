export type PublicNoticia = {
  id: string;
  slug: string;
  titulo: string;
  categoria: string;
  resumo: string;
  texto?: string;
  imagemCapaUrl: string | null;
  destaqueNovidades: boolean;
  publicarEm: string | null;
  criadoEm: string;
  atualizadoEm: string;
  midias?: Array<{
    id: string;
    url: string;
    nome: string | null;
    tipo: string | null;
    ordem: number;
  }>;
};

export type PublicProjeto = {
  id: string;
  slug: string;
  titulo: string;
  categoria: string;
  resumo: string;
  descricao?: string;
  statusProjeto: string;
  percentualAvanco: number;
  dataInicio: string | null;
  previsaoConclusao: string | null;
  dataConclusao: string | null;
  valorPrevisto: string | number | null;
  valorRealizado: string | number | null;
  responsavel: string | null;
  imagemCapaUrl: string | null;
  destaqueHome: boolean;
  publicarEm: string | null;
  atualizadoEm: string;
  midias?: Array<{
    id: string;
    url: string;
    nome: string | null;
    tipo: string | null;
    ordem: number;
  }>;
  atualizacoes?: Array<{
    id: string;
    titulo: string | null;
    texto: string;
    percentualAvanco: number | null;
    midiaUrl: string | null;
    publicadoEm: string;
  }>;
};

export type PublicMembro = {
  id: string;
  nome: string;
  cargo: string;
  orgao: string;
  mandatoInicio: string | null;
  mandatoFim: string | null;
  fotoUrl: string | null;
  miniBio: string | null;
  ordem: number;
};

export type PublicDocumento = {
  id: string;
  titulo: string;
  categoria: string;
  ano: number;
  descricao: string | null;
  arquivoUrl: string;
  nomeArquivo: string | null;
  ordem: number;
  publicarEm: string | null;
  atualizadoEm: string;
};

const PROD_OPERACOES = "https://operacoes.valville.org.br";

export function operacoesBaseUrl() {
  if (process.env.VALVILLE_OPERACOES_URL) {
    return process.env.VALVILLE_OPERACOES_URL.replace(/\/+$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return PROD_OPERACOES;
}

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${operacoesBaseUrl()}${path}`, {
      next: { revalidate: 60 },
      headers: { accept: "application/json" },
    });

    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getNoticias() {
  const data = await getJson<{ noticias: PublicNoticia[] }>("/api/site/noticias", { noticias: [] });
  return data.noticias;
}

export async function getNoticia(slug: string) {
  const data = await getJson<{ noticia: PublicNoticia | null }>(
    `/api/site/noticias/${encodeURIComponent(slug)}`,
    { noticia: null },
  );
  return data.noticia;
}

export async function getProjetos() {
  const data = await getJson<{ projetos: PublicProjeto[] }>("/api/site/projetos", { projetos: [] });
  return data.projetos;
}

export async function getProjeto(slug: string) {
  const data = await getJson<{ projeto: PublicProjeto | null }>(
    `/api/site/projetos/${encodeURIComponent(slug)}`,
    { projeto: null },
  );
  return data.projeto;
}

export async function getGestao() {
  const data = await getJson<{ membros: PublicMembro[] }>("/api/site/gestao", { membros: [] });
  return data.membros;
}

export async function getDocumentos() {
  const data = await getJson<{ documentos: PublicDocumento[] }>("/api/site/documentos", { documentos: [] });
  return data.documentos;
}

export function rotuloEnum(value: string) {
  const especiais: Record<string, string> = {
    OBRAS_MELHORIAS: "Obras e Melhorias",
    MEIO_AMBIENTE: "Meio Ambiente",
    EM_ANDAMENTO: "Em andamento",
    DIRETORIA_EXECUTIVA: "Diretoria Executiva",
    CONSELHO_DELIBERATIVO: "Conselho Deliberativo",
    CONSELHO_FISCAL: "Conselho Fiscal",
    COMISSAO_CONSELHO_ESPECIAL: "Comissão / Conselho Especial",
    COMUNICADOS_OFICIAIS: "Comunicados Oficiais",
    PRESTACAO_CONTAS: "Prestação de Contas",
    OUTROS_INSTITUCIONAIS: "Outros Institucionais",
  };

  return especiais[value] || value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatarData(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export function formatarMoeda(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}
