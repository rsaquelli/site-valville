import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const css = fs.readFileSync("app/site-dynamic.css", "utf8");

test("menu principal usa 14px no desktop", () => {
  assert.match(css, /\.site-header \.desktop-nav\s*\{[\s\S]*font-size:\s*14px/);
});

test("botões do cabeçalho usam 11px", () => {
  assert.match(css, /\.site-header \.header-action\s*\{[\s\S]*font-size:\s*11px/);
});
