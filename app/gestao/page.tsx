import { PublicFooter, PublicHeader } from "@/src/components/PublicSiteChrome";
import { getGestao, rotuloEnum } from "@/src/lib/public-site-api";

export const dynamic = "force-dynamic";

export default async function GestaoPage() {
  const membros = await getGestao();
  const grupos = new Map<string, typeof membros>();

  for (const membro of membros) {
    const grupo = grupos.get(membro.orgao) || [];
    grupo.push(membro);
    grupos.set(membro.orgao, grupo);
  }

  return (
    <main>
      <PublicHeader />
      <section className="public-page-hero">
        <div className="shell">
          <span className="eyebrow light">Institucional</span>
          <h1>Diretoria e Conselho</h1>
          <p>Conheça a composição institucional vigente da Associação Residenciais Valville I e IA.</p>
        </div>
      </section>

      <section className="public-page-section shell">
        {membros.length ? (
          [...grupos.entries()].map(([orgao, itens]) => (
            <section className="public-people-group" key={orgao}>
              <span className="eyebrow">{rotuloEnum(orgao)}</span>
              <div className="public-people-grid">
                {itens.map((membro) => (
                  <article className="public-person" key={membro.id}>
                    <div className="public-person-photo">
                      {membro.fotoUrl ? <img src={membro.fotoUrl} alt={membro.nome} /> : <span>{membro.nome.charAt(0)}</span>}
                    </div>
                    <div>
                      <h2>{membro.nome}</h2>
                      <strong>{membro.cargo}</strong>
                      {membro.miniBio && <p>{membro.miniBio}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="public-empty">Composição institucional não disponível no momento.</div>
        )}
      </section>

      <PublicFooter />
    </main>
  );
}
