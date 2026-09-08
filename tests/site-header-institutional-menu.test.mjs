import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const home = fs.readFileSync("app/page.tsx", "utf8");
const chrome = fs.readFileSync("src/components/PublicSiteChrome.tsx", "utf8");
const css = fs.readFileSync("app/site-dynamic.css", "utf8");

for (const [nome, source] of [["home", home], ["páginas internas", chrome]]) {
  test(`${nome}: navegação agrupa gestão e documentos em Institucional`, () => {
    assert.match(source, /<details className="institutional-menu">/);
    assert.match(source, /<summary>Institucional[\s\S]*<\/summary>/);
    assert.match(source, /href="\/gestao"[\s\S]*Diretoria e Conselho/);
    assert.match(source, /href="\/documentos"[\s\S]*Documentos Públicos/);

    const nav = source.match(/<nav className="desktop-nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
    assert.doesNotMatch(nav, />Diretoria e Conselho<\/a>/);
    assert.doesNotMatch(nav, />Documentos<\/a>/);
  });
}

test("menu institucional possui painel premium sem quebra no item principal", () => {
  assert.match(css, /\.institutional-menu\s*\{/);
  assert.match(css, /\.institutional-menu-panel\s*\{/);
  assert.match(css, /white-space:\s*nowrap/);
  assert.match(css, /\.institutional-menu-panel a:hover/);
});

test("menu superior preserva Projetos como acesso direto", () => {
  assert.match(home, /<a href="\/projetos">Projetos<\/a>/);
  assert.match(chrome, /<a href="\/projetos">Projetos<\/a>/);
});
