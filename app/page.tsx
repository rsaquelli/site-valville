import {
  brand,
  contact,
  headerActions,
  infrastructure,
  links,
  pillars,
  restrictedSystems,
  spotlight,
} from "@/src/lib/site-content.mjs";
import { getNoticias, getProjetos, rotuloEnum } from "@/src/lib/public-site-api";

export const dynamic = "force-dynamic";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default async function HomePage() {
  const [noticias, projetos] = await Promise.all([getNoticias(), getProjetos()]);
  const destaquesNoticias = noticias.slice(0, 3);
  const destaquesProjetos = projetos.filter((item) => item.destaqueHome).slice(0, 3);

  return (
    <main>
      <header className="site-header">
        <a className="brand brand-card" href="#inicio" aria-label="Valville - início">
          <img src={brand.logoUrl} alt={brand.fullName} />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#valville">O Valville</a>
          <a href="#estrutura">Estrutura</a>
          <a href="#novidades">Novidades</a>
          <a href="/projetos">Projetos</a>
          <details className="institutional-menu">
            <summary>Institucional <span aria-hidden="true">⌄</span></summary>
            <div className="institutional-menu-panel">
              <span className="institutional-menu-label">Institucional</span>
              <a href="/gestao">
                <strong>Diretoria e Conselho</strong>
                <small>Conheça os órgãos de gestão do Valville</small>
              </a>
              <a href="/documentos">
                <strong>Documentos Públicos</strong>
                <small>Estatuto, regulamentos, atas e documentos</small>
              </a>
            </div>
          </details>
        </nav>

        <div className="header-actions">
          {headerActions.map((action) => (
            <a
              className={`header-action header-action-${action.variant}`}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noreferrer" : undefined}
              key={action.title}
            >
              {action.title}
            </a>
          ))}

          <details className="restricted-menu">
            <summary className="header-action header-action-gold">Acesso Restrito</summary>
            <div className="restricted-menu-panel">
              <span className="restricted-menu-label">Acesso aos sistemas</span>
              {restrictedSystems.map((system) => (
                <a href={system.href} target="_blank" rel="noreferrer" key={system.title}>
                  <strong>{system.title}</strong>
                  <small>{system.href.replace("https://", "")}</small>
                </a>
              ))}
            </div>
          </details>
        </div>
      </header>

      <section className="hero" id="inicio">
        <img className="hero-image" src="/images/portaria-noite.jpeg" alt="Portaria do Valville à noite" />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-content shell">
          <div className="hero-copy">
            <span className="eyebrow light">{brand.eyebrow}</span>
            <h1>Viver bem em todos os detalhes.</h1>
            <p>
              Um residencial de alto padrão onde infraestrutura, cuidado, tecnologia e qualidade de vida
              se encontram em uma experiência pensada para viver com tranquilidade.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#valville">
                Conheça o Valville <ArrowIcon />
              </a>
            </div>
          </div>
          <div className="hero-caption">
            <span>Arquitetura</span>
            <span>Paisagismo</span>
            <span>Gestão</span>
            <span>Tranquilidade</span>
          </div>
        </div>
      </section>

      <section className="intro-section shell" id="valville">
        <div className="intro-image-wrap">
          <img src="/images/bem-vindo-valville.png" alt="Totem Bem-vindo ao Valville em meio ao paisagismo" />
          <div className="image-note">
            <span>Bem-vindo ao</span>
            <strong>Valville</strong>
          </div>
        </div>
        <div className="intro-copy">
          <span className="eyebrow">Um jeito especial de viver</span>
          <h2>Alto padrão é cuidado que se percebe.</h2>
          <p className="lead">
            A experiência de viver no Valville nasce da soma de muitos detalhes: uma chegada marcante,
            paisagismo bem cuidado, infraestrutura acompanhada de perto e uma gestão que evolui junto com o residencial.
          </p>
          <p>
            Mais do que um endereço, o Valville é um ambiente residencial pensado para preservar conforto,
            organização, convivência e valorização ao longo do tempo.
          </p>
          <a className="text-link" href="#estrutura">
            Conheça nossos pilares <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="spotlight-section shell" aria-label="Valville ao pôr do sol">
        <div className="spotlight-image-wrap">
          <img src={spotlight.image} alt="Valville ao pôr do sol, com paisagismo e identidade do residencial" />
        </div>
        <div className="spotlight-copy">
          <span className="eyebrow light">{spotlight.eyebrow}</span>
          <h2>{spotlight.title}</h2>
          <p>{spotlight.text}</p>
          <div className="spotlight-signature">
            <span>Valville</span>
            <small>Viver bem em todos os detalhes.</small>
          </div>
        </div>
      </section>

      <section className="pillars-section" id="estrutura">
        <div className="shell">
          <div className="section-heading heading-row">
            <div>
              <span className="eyebrow light">Experiência Valville</span>
              <h2>Estrutura para viver.<br />Gestão para preservar.</h2>
            </div>
            <p>
              Segurança, infraestrutura, natureza e tecnologia tratadas como partes de uma mesma experiência residencial.
            </p>
          </div>

          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.index}>
                <span className="pillar-index">{pillar.index}</span>
                <div className="pillar-media">
                  <img src={pillar.image} alt={pillar.imageAlt} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="details-section shell">
        <div className="section-heading centered">
          <span className="eyebrow">Cuidado em cada frente</span>
          <h2>Um residencial que evolui sem perder sua essência.</h2>
          <p>
            A qualidade percebida no dia a dia é resultado de planejamento, conservação, acompanhamento técnico e serviços que funcionam.
          </p>
        </div>
        <div className="details-grid">
          {infrastructure.map((item) => (
            <article className="detail-card" key={item.title}>
              <div className="detail-line" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-bg" />
        <div className="shell quote-content">
          <span className="eyebrow light">Valville</span>
          <blockquote>
            “Qualidade de vida não está em um único detalhe. Está na forma como todos eles são cuidados.”
          </blockquote>
        </div>
      </section>

      <section className="news-section shell" id="novidades">
        <div className="section-heading heading-row dark-text">
          <div>
            <span className="eyebrow">Informação & comunidade</span>
            <h2>Novidades do Valville</h2>
          </div>
          <p>
            Notícias, comunicados e informações institucionais publicados diretamente pela Administração.
          </p>
        </div>

        {destaquesNoticias.length ? (
          <div className="news-grid">
            {destaquesNoticias.map((item) => (
              <a className="news-card news-card-link" href={`/novidades/${item.slug}`} key={item.id}>
                <span>{rotuloEnum(item.categoria)}</span>
                <h3>{item.titulo}</h3>
                <p>{item.resumo}</p>
                <small>Leia mais →</small>
              </a>
            ))}
          </div>
        ) : (
          <div className="public-empty">Nenhuma novidade pública no momento.</div>
        )}

        <div className="public-section-action">
          <a className="text-link" href="/novidades">Ver todas as novidades <ArrowIcon /></a>
        </div>
      </section>

      {destaquesProjetos.length ? (
        <section className="home-projects shell">
          <div className="section-heading heading-row dark-text">
            <div>
              <span className="eyebrow">Evolução do residencial</span>
              <h2>Projetos e melhorias</h2>
            </div>
            <p>Acompanhe iniciativas que ajudam a preservar e evoluir o Valville.</p>
          </div>

          <div className="public-project-grid">
            {destaquesProjetos.map((item) => (
              <a className="public-project-card" href={`/projetos/${item.slug}`} key={item.id}>
                {item.imagemCapaUrl && <img src={item.imagemCapaUrl} alt="" />}
                <div>
                  <span>{rotuloEnum(item.categoria)}</span>
                  <h3>{item.titulo}</h3>
                  <p>{item.resumo}</p>
                  <div className="public-progress"><i style={{ width: `${item.percentualAvanco}%` }} /></div>
                  <small>{item.percentualAvanco}% concluído</small>
                </div>
              </a>
            ))}
          </div>

          <div className="public-section-action">
            <a className="text-link" href="/projetos">Ver todos os projetos <ArrowIcon /></a>
          </div>
        </section>
      ) : null}

      <footer className="site-footer" id="contato">
        <div className="shell footer-grid footer-grid-institutional">
          <div className="footer-brand footer-address">
            <strong>Valville</strong>
            <span>{brand.fullName}</span>
            <address>
              <span>{contact.addressLine1}</span>
              <span>{contact.addressLine2}</span>
              <span>{contact.postalCode}</span>
            </address>
          </div>
          <div className="footer-contact-block">
            <span className="footer-label">Atendimento</span>
            <a href={contact.phoneHref}>Fone: {contact.phoneLabel}</a>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp: {contact.whatsappLabel}</a>
            <a href={links.instagram} target="_blank" rel="noreferrer">Instagram @assocvalville1</a>
          </div>
          <div className="footer-contact-block">
            <span className="footer-label">E-mails</span>
            {contact.emails.map((email) => (
              <a href={`mailto:${email}`} key={email}>{email}</a>
            ))}
            <a href={links.portal} target="_blank" rel="noreferrer">Portal do Morador</a>
          </div>
          <div className="footer-contact-block">
            <span className="footer-label">Institucional</span>
            <a href="/gestao">Diretoria e Conselho</a>
            <a href="/projetos">Projetos e Melhorias</a>
            <a href="/documentos">Documentos Públicos</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 {brand.fullName}</span>
          <span>Site institucional</span>
        </div>
      </footer>
    </main>
  );
}
