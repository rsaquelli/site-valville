import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { pillars } from "../src/lib/site-content.mjs";

test("cada pilar da Estrutura possui sua imagem correspondente", async () => {
  assert.deepEqual(pillars.map((item) => item.image), [
    "/images/estrutura-seguranca.jpg",
    "/images/estrutura-lazer.jpg",
    "/images/estrutura-vista.jpg",
    "/images/estrutura-gestao-tecnologia.svg",
  ]);

  for (const pillar of pillars) {
    const asset = await readFile(new URL(`../public${pillar.image}`, import.meta.url));
    assert.equal(asset.length > 500, true);
  }
});

test("os cards dos pilares renderizam imagem no próprio bloco", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.equal(source.includes('className="pillar-media"'), true);
  assert.equal(source.includes('src={pillar.image}'), true);
});
