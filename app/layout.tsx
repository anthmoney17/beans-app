import "./globals.css";
import Nav from "./components/nav";

export const metadata = {
  title: "Beans — Reap What You Sow",
  description: "The all-in-one trading platform for the next generation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '32px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '80px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🫘</span>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '16px', color: 'var(--text-muted)' }}>BEANS</span>
          </div>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px' }}>REAP WHAT YOU SOW</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>© 2025 Dean Industries</span>
        </footer>
      </body>
    </html>
  );
}