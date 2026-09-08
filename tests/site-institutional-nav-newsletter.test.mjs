import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const home = fs.readFileSync("app/page.tsx", "utf8");
const chrome = fs.readFileSync("src/components/PublicSiteChrome.tsx", "utf8");
const css = fs.readFileSync("app/site-dynamic.css", "utf8");

test("home não exibe mais o bloco futuro de newsletter", () => {
  assert.doesNotMatch(home, /newsletter-section/);
  assert.doesNotMatch(home, /Cadastro de newsletter/);
});

test("Diretoria e Conselho aparece na navegação da home e páginas internas", () => {
  assert.match(home, /href="\/gestao">Diretoria e Conselho/);
  assert.match(chrome, /href="\/gestao">Diretoria e Conselho/);
});

test("rodapé contém bloco institucional com atalho para gestão", () => {
  assert.match(home, /footer-label">Institucional/);
  assert.match(home, /href="\/gestao">Diretoria e Conselho/);
  assert.match(chrome, /footer-label">Institucional/);
  assert.match(chrome, /href="\/gestao">Diretoria e Conselho/);
});

test("rodapé institucional continua responsivo", () => {
  assert.match(css, /\.footer-grid-institutional\s*\{[\s\S]*grid-template-columns:/);
  assert.match(css, /@media\s*\(max-width:\s*980px\)[\s\S]*\.footer-grid-institutional/);
  assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*\.footer-grid-institutional/);
});
