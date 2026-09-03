import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { brand, contactEmails, restrictedSystems } from "../src/lib/site-content.mjs";

test("V4 remove a seção final de sistemas internos", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.equal(source.includes('className="systems-section"'), false);
  assert.equal(source.includes("<h2>Sistemas internos</h2>"), false);
});

test("Acesso Restrito vira menu no topo com os três sistemas", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.equal(source.includes('className="restricted-menu"'), true);
  assert.deepEqual(restrictedSystems.map((item) => item.title), [
    "Operações",
    "Financeiro",
    "Radar",
    "Correspondências",
  ]);
});

test("rodapé inclui os três contatos oficiais", () => {
  assert.deepEqual(contactEmails, [
    "operacoes@valville.org.br",
    "administracao@valville.org.br",
    "financeiro@valville.org.br",
  ]);
});

test("logo permanece em ativo local e recebe moldura visual própria", async () => {
  assert.equal(brand.logoUrl, "/logo-valville.png");
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.equal(page.includes('className="brand brand-card"'), true);
  assert.equal(css.includes(".brand-card"), true);
});
