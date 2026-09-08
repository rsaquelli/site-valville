import {
  brand,
  contact,
  headerActions,
  links,
  restrictedSystems,
} from "@/src/lib/site-content.mjs";

export function PublicHeader({ solid = true }: { solid?: boolean }) {
  return (
    <header className={`site-header ${solid ? "site-header-solid" : ""}`}>
      <a className="brand brand-card" href="/" aria-label="Valville - início">
        <img src={brand.logoUrl} alt={brand.fullName} />
      </a>

      <nav className="desktop-nav" aria-label="Navegação principal">
        <a href="/#valville">O Valville</a>
        <a href="/#estrutura">Estrutura</a>
        <a href="/novidades">Novidades</a>
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
  );
}

export function PublicFooter() {
  return (
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
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp: {contact.whatsappLabel}
          </a>
          <a href={links.instagram} target="_blank" rel="noreferrer">
            Instagram @assocvalville1
          </a>
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
  );
}
