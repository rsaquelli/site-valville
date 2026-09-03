import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  brand,
  contact,
  links,
  restrictedSystems,
} from "../src/lib/site-content.mjs";

test("V5 usa somente o logo PNG original no topo", async () => {
  assert.equal(brand.logoUrl, "/logo-valville.png");
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.equal(source.includes("brand-fallback"), false);
  assert.equal(source.includes("logo-valville.svg"), false);
});

test("V5 concentra os quatro sistemas nos subdominios oficiais", () => {
  assert.deepEqual(restrictedSystems.map((item) => [item.title, item.href]), [
    ["Operações", "https://operacoes.valville.org.br"],
    ["Financeiro", "https://financeiro.valville.org.br"],
    ["Radar", "https://radar.valville.org.br"],
    ["Correspondências", "https://correspondencias.valville.org.br"],
  ]);
  assert.equal(links.portal, "https://operacoes.valville.org.br/portal");
});

test("V5 rodape contem endereco telefone whatsapp e emails", () => {
  assert.equal(contact.addressLine1, "Estrada do Ipanema, 2805");
  assert.equal(contact.addressLine2, "Alphaville - Santana de Parnaíba - São Paulo");
  assert.equal(contact.postalCode, "CEP: 06532-145");
  assert.equal(contact.phoneLabel, "(11) 4154-6940");
  assert.equal(contact.whatsappLabel, "(11) 9 8800-3421");
  assert.deepEqual(contact.emails, [
    "operacoes@valville.org.br",
    "administracao@valville.org.br",
    "financeiro@valville.org.br",
  ]);
});

test("V5 nao exibe secao final de sistemas", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.equal(source.includes('className="systems-section"'), false);
});
