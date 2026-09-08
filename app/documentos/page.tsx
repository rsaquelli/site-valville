import { PublicFooter, PublicHeader } from "@/src/components/PublicSiteChrome";
import { getDocumentos, rotuloEnum } from "@/src/lib/public-site-api";

export const dynamic = "force-dynamic";

export default async function DocumentosPage() {
  const documentos = await getDocumentos();
  const grupos = new Map<string, typeof documentos>();

  for (const documento of documentos) {
    const grupo = grupos.get(documento.categoria) || [];
    grupo.push(documento);
    grupos.set(documento.categoria, grupo);
  }

  return (
    <main>
      <PublicHeader />
      <section className="public-page-hero">
        <div className="shell">
          <span className="eyebrow light">Transparência institucional</span>
          <h1>Documentos Públicos</h1>
          <p>Documentos institucionais disponibilizados publicamente pela Associação.</p>
        </div>
      </section>

      <section className="public-page-section shell">
        {documentos.length ? (
          [...grupos.entries()].map(([categoria, itens]) => (
            <section className="public-doc-group" key={categoria}>
              <span className="eyebrow">{rotuloEnum(categoria)}</span>
              <div className="public-doc-list">
                {itens.map((item) => (
                  <a href={item.arquivoUrl} target="_blank" rel="noreferrer" key={item.id}>
                    <div>
                      <strong>{item.titulo}</strong>
                      <p>{item.descricao || item.nomeArquivo || "Documento institucional"}</p>
                    </div>
                    <span>{item.ano} ↗</span>
                  </a>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="public-empty">Nenhum documento público disponível no momento.</div>
        )}
      </section>

      <PublicFooter />
    </main>
  );
}
