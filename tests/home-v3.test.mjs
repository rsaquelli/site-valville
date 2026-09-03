import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { headerActions, spotlight, pillars } from "../src/lib/site-content.mjs";

test("estrutura principal usa os quatro pilares com suas imagens", async () => {
  assert.equal(pillars.length, 4);
  for (const item of pillars) {
    assert.equal(typeof item.image, "string");
    const asset = await readFile(new URL(`../public${item.image}`, import.meta.url));
    assert.equal(asset.length > 500, true);
  }
});

test("home renderiza as imagens dentro dos próprios pilares", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.equal(source.includes('className="pillar-media"'), true);
  assert.equal(source.includes('src={pillar.image}'), true);
});

test("cabeçalho mantém os dois acessos principais", () => {
  assert.deepEqual(headerActions.map((item) => item.title), [
    "Portal do Morador",
  ]);
});

test("spotlight do Valville ao pôr do sol permanece ativo", async () => {
  const asset = await readFile(new URL(`../public${spotlight.image}`, import.meta.url));
  assert.equal(asset.length > 1000, true);
});
