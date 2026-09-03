import {
  brand,
  contact,
  headerActions,
  infrastructure,
  links,
  pillars,
  previewNews,
  restrictedSystems,
  spotlight,
} from "@/src/lib/site-content.mjs";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HomePage() {
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
          <a href="#contato">Contato</a>
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
            Na próxima etapa, esta área será administrada diretamente pelo App Operações, sem necessidade de alterar o site.
          </p>
        </div>
        <div className="news-grid">
          {previewNews.map((item) => (
            <article className="news-card" key={item.title}>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <small>Prévia de conteúdo</small>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter-section shell">
        <div>
          <span className="eyebrow light">Newsletter Valville</span>
          <h2>Informação oficial, de forma simples.</h2>
          <p>
            Um novo canal para receber novidades, informações públicas e conteúdos relevantes da Associação.
          </p>
        </div>
        <div className="newsletter-preview">
          <span>Integração prevista para a próxima etapa</span>
          <strong>Cadastro de newsletter</strong>
          <p>O gerenciamento será feito pelo módulo de conteúdo do App Operações.</p>
        </div>
      </section>

      <footer className="site-footer" id="contato">
        <div className="shell footer-grid">
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
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 {brand.fullName}</span>
          <span>Site institucional</span>
        </div>
      </footer>
    </main>
  );
}
