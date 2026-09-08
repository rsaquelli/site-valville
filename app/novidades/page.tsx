import { PublicFooter, PublicHeader } from "@/src/components/PublicSiteChrome";
import { getNoticias, rotuloEnum, formatarData } from "@/src/lib/public-site-api";

export const dynamic = "force-dynamic";

export default async function NovidadesPage() {
  const noticias = await getNoticias();

  return (
    <main>
      <PublicHeader />
      <section className="public-page-hero">
        <div className="shell">
          <span className="eyebrow light">Informação & comunidade</span>
          <h1>Novidades do Valville</h1>
          <p>Notícias, comunicados e conteúdos institucionais publicados pela Associação.</p>
        </div>
      </section>

      <section className="public-page-section shell">
        {noticias.length ? (
          <div className="public-news-list">
            {noticias.map((item) => (
              <a className="public-news-item" href={`/novidades/${item.slug}`} key={item.id}>
                {item.imagemCapaUrl && <img src={item.imagemCapaUrl} alt="" />}
                <div>
                  <span>{rotuloEnum(item.categoria)}</span>
                  <h2>{item.titulo}</h2>
                  <p>{item.resumo}</p>
                  <small>{formatarData(item.publicarEm || item.criadoEm)}</small>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="public-empty">Nenhuma novidade pública no momento.</div>
        )}
      </section>

      <PublicFooter />
    </main>
  );
}
