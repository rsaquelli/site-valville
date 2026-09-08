import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");

test("home consome notícias e projetos do Operações", () => {
  const home = read("app/page.tsx");
  assert.match(home, /getNoticias/);
  assert.match(home, /getProjetos/);
  assert.doesNotMatch(home, /previewNews/);
  assert.match(home, /Novidades do Valville/);
});

test("cliente de API aponta produção para Operações Valville", () => {
  const api = read("src/lib/public-site-api.ts");
  assert.match(api, /https:\/\/operacoes\.valville\.org\.br/);
  assert.match(api, /VALVILLE_OPERACOES_URL/);
  assert.match(api, /http:\/\/localhost:3000/);
});

test("páginas públicas dos quatro blocos existem", () => {
  for (const path of [
    "app/novidades/page.tsx",
    "app/novidades/[slug]/page.tsx",
    "app/projetos/page.tsx",
    "app/projetos/[slug]/page.tsx",
    "app/gestao/page.tsx",
    "app/documentos/page.tsx",
  ]) {
    assert.equal(fs.existsSync(path), true, `${path} deve existir`);
  }
});

test("notícias, projetos, gestão e documentos usam APIs públicas", () => {
  const api = read("src/lib/public-site-api.ts");
  for (const endpoint of [
    "/api/site/noticias",
    "/api/site/projetos",
    "/api/site/gestao",
    "/api/site/documentos",
  ]) {
    assert.match(api, new RegExp(endpoint.replaceAll("/", "\\/")));
  }
});

test("site preserva seções institucionais principais da home", () => {
  const home = read("app/page.tsx");
  for (const token of [
    "Viver bem em todos os detalhes.",
    "Alto padrão é cuidado que se percebe.",
    "Estrutura para viver.",
    "Qualidade de vida não está em um único detalhe.",
    "Newsletter Valville",
  ]) {
    assert.match(home, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
