import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { brand, headerActions, spotlight } from "../src/lib/site-content.mjs";

test("cabeçalho concentra Portal do Morador e Acesso Restrito", () => {
  assert.deepEqual(headerActions.map((item) => item.title), [
    "Portal do Morador",
  ]);
  assert.equal(headerActions[0].href.includes("/portal"), true);
  
});

test("logo é um ativo local do site", () => {
  assert.equal(brand.logoUrl, "/logo-valville.png");
});

test("home remove os frames de acesso e incorpora a foto do pôr do sol", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.equal(source.includes('className="access-section shell"'), false);
  assert.equal(source.includes('className="button button-ghost"'), false);
  assert.equal(source.includes("src={spotlight.image}"), true);
  const asset = await readFile(new URL(`../public${spotlight.image}`, import.meta.url));
  assert.equal(asset.length > 1000, true);
});

test("scripts locais usam webpack para evitar dependência do Turbopack", async () => {
  const pkg = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(pkg.scripts.dev, "next dev --webpack");
  assert.equal(pkg.scripts.build, "next build --webpack");
});
