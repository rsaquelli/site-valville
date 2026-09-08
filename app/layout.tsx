import type { Metadata } from "next";
import "./globals.css";
import "./site-dynamic.css";

export const metadata: Metadata = {
  title: "Valville | Residenciais Valville I e IA",
  description:
    "Site institucional da Associação Residenciais Valville I e IA — qualidade de vida, infraestrutura, gestão e serviços.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
