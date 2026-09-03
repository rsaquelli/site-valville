import test from "node:test";
import assert from "node:assert/strict";

import {
  accessCards,
  securityPublicCopy,
  pillars,
  structureHighlights,
} from "../src/lib/site-content.mjs";

test("home destaca Portal do Morador e Acesso Restrito", () => {
  assert.equal(accessCards.length, 2);
  assert.deepEqual(accessCards.map((item) => item.title), [
    "Portal do Morador",
    "Acesso Restrito",
  ]);
});

test("conteúdo institucional possui os quatro pilares principais", () => {
  assert.equal(pillars.length, 4);
  assert.deepEqual(pillars.map((item) => item.title), [
    "Segurança & tranquilidade",
    "Infraestrutura & cuidado",
    "Natureza & qualidade de vida",
    "Gestão & tecnologia",
  ]);
});

test("texto público de segurança não revela operação interna", () => {
  const proibidos = [
    /hor[aá]rio/i,
    /rota/i,
    /ronda/i,
    /quantidade de (c[aâ]meras|radares)/i,
    /posi[cç][aã]o/i,
    /escala/i,
  ];

  for (const termo of proibidos) {
    assert.equal(termo.test(securityPublicCopy), false, `termo proibido encontrado: ${termo}`);
  }
});


test("blocos visuais da estrutura seguem as imagens indicadas", () => {
  assert.deepEqual(structureHighlights.map((item) => item.tag), [
    "Segurança",
    "Lazer",
    "Vista",
    "Tecnologia",
  ]);
});
