import { notFound } from "next/navigation";
import { PublicFooter, PublicHeader } from "@/src/components/PublicSiteChrome";
import { formatarData, getNoticia, rotuloEnum } from "@/src/lib/public-site-api";

export const dynamic = "force-dynamic";

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) notFound();

  const imagens = noticia.midias?.filter((item) => item.tipo === "IMAGEM") || [];
  const anexos = noticia.midias?.filter((item) => item.tipo !== "IMAGEM") || [];

  return (
    <main>
      <PublicHeader />
      <article>
        <section className="public-page-hero compact">
          <div className="shell public-article-heading">
            <span className="eyebrow light">{rotuloEnum(noticia.categoria)}</span>
            <h1>{noticia.titulo}</h1>
            <p>{noticia.resumo}</p>
            <small>{formatarData(noticia.publicarEm || noticia.criadoEm)}</small>
          </div>
        </section>

        <div className="shell public-article">
          {noticia.imagemCapaUrl && (
            <img className="public-article-cover" src={noticia.imagemCapaUrl} alt="" />
          )}

          <div className="public-rich-text">
            {noticia.texto?.split(/\n+/).filter(Boolean).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {imagens.length ? (
            <div className="public-gallery">
              {imagens.map((item) => <img src={item.url} alt={item.nome || ""} key={item.id} />)}
            </div>
          ) : null}

          {anexos.length ? (
            <div className="public-attachments">
              <h2>Anexos</h2>
              {anexos.map((item) => (
                <a href={item.url} target="_blank" rel="noreferrer" key={item.id}>
                  {item.nome || "Abrir documento"}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </article>
      <PublicFooter />
    </main>
  );
}
