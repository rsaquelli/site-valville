import { PublicFooter, PublicHeader } from "@/src/components/PublicSiteChrome";
import { getProjetos, rotuloEnum } from "@/src/lib/public-site-api";

export const dynamic = "force-dynamic";

export default async function ProjetosPage() {
  const projetos = await getProjetos();

  return (
    <main>
      <PublicHeader />
      <section className="public-page-hero">
        <div className="shell">
          <span className="eyebrow light">Evolução do residencial</span>
          <h1>Projetos e Melhorias</h1>
          <p>Transparência sobre iniciativas, avanços e entregas que ajudam a preservar e evoluir o Valville.</p>
        </div>
      </section>

      <section className="public-page-section shell">
        {projetos.length ? (
          <div className="public-project-grid">
            {projetos.map((item) => (
              <a className="public-project-card" href={`/projetos/${item.slug}`} key={item.id}>
                {item.imagemCapaUrl && <img src={item.imagemCapaUrl} alt="" />}
                <div>
                  <span>{rotuloEnum(item.categoria)} · {rotuloEnum(item.statusProjeto)}</span>
                  <h2>{item.titulo}</h2>
                  <p>{item.resumo}</p>
                  <div className="public-progress"><i style={{ width: `${item.percentualAvanco}%` }} /></div>
                  <small>{item.percentualAvanco}% concluído</small>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="public-empty">Nenhum projeto público no momento.</div>
        )}
      </section>

      <PublicFooter />
    </main>
  );
}
