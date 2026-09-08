import { notFound } from "next/navigation";
import { PublicFooter, PublicHeader } from "@/src/components/PublicSiteChrome";
import {
  formatarData,
  formatarMoeda,
  getProjeto,
  rotuloEnum,
} from "@/src/lib/public-site-api";

export const dynamic = "force-dynamic";

export default async function ProjetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projeto = await getProjeto(slug);
  if (!projeto) notFound();

  const previsto = formatarMoeda(projeto.valorPrevisto);
  const realizado = formatarMoeda(projeto.valorRealizado);
  const imagens = projeto.midias?.filter((item) => item.tipo === "IMAGEM") || [];
  const anexos = projeto.midias?.filter((item) => item.tipo !== "IMAGEM") || [];

  return (
    <main>
      <PublicHeader />
      <section className="public-page-hero compact">
        <div className="shell public-article-heading">
          <span className="eyebrow light">{rotuloEnum(projeto.categoria)}</span>
          <h1>{projeto.titulo}</h1>
          <p>{projeto.resumo}</p>
        </div>
      </section>

      <section className="public-page-section shell">
        {projeto.imagemCapaUrl && (
          <img className="public-article-cover" src={projeto.imagemCapaUrl} alt="" />
        )}

        <div className="public-project-stats">
          <div><small>Status</small><strong>{rotuloEnum(projeto.statusProjeto)}</strong></div>
          <div><small>Avanço</small><strong>{projeto.percentualAvanco}%</strong></div>
          <div><small>Início</small><strong>{formatarData(projeto.dataInicio) || "—"}</strong></div>
          <div><small>Previsão</small><strong>{formatarData(projeto.previsaoConclusao) || "—"}</strong></div>
        </div>

        <div className="public-progress large"><i style={{ width: `${projeto.percentualAvanco}%` }} /></div>

        <div className="public-rich-text">
          {projeto.descricao?.split(/\n+/).filter(Boolean).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {(previsto || realizado || projeto.responsavel) && (
          <div className="public-project-info">
            {projeto.responsavel && <div><small>Responsável</small><strong>{projeto.responsavel}</strong></div>}
            {previsto && <div><small>Valor previsto</small><strong>{previsto}</strong></div>}
            {realizado && <div><small>Valor realizado</small><strong>{realizado}</strong></div>}
          </div>
        )}

        {imagens.length ? (
          <div className="public-gallery">
            {imagens.map((item) => <img src={item.url} alt={item.nome || ""} key={item.id} />)}
          </div>
        ) : null}

        {projeto.atualizacoes?.length ? (
          <section className="public-timeline">
            <span className="eyebrow">Acompanhamento</span>
            <h2>Atualizações do projeto</h2>
            {projeto.atualizacoes.map((item) => (
              <article key={item.id}>
                <small>{formatarData(item.publicadoEm)}{item.percentualAvanco !== null ? ` · ${item.percentualAvanco}%` : ""}</small>
                {item.titulo && <h3>{item.titulo}</h3>}
                <p>{item.texto}</p>
                {item.midiaUrl && <a href={item.midiaUrl} target="_blank" rel="noreferrer">Abrir foto / anexo</a>}
              </article>
            ))}
          </section>
        ) : null}

        {anexos.length ? (
          <div className="public-attachments">
            <h2>Documentos do projeto</h2>
            {anexos.map((item) => (
              <a href={item.url} target="_blank" rel="noreferrer" key={item.id}>
                {item.nome || "Abrir documento"}
              </a>
            ))}
          </div>
        ) : null}
      </section>

      <PublicFooter />
    </main>
  );
}
