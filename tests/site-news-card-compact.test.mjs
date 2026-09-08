import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const css = fs.readFileSync("app/site-dynamic.css", "utf8");

test("cards de novidades da home são compactos e sem altura mínima excessiva", () => {
  assert.match(
    css,
    /\.news-card\.news-card-link\s*\{[\s\S]*min-height:\s*0[\s\S]*padding:\s*28px\s+30px/,
  );
  assert.match(
    css,
    /\.news-card\.news-card-link p\s*\{[\s\S]*margin-bottom:\s*18px/,
  );
});
