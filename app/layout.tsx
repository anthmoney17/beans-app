import "./globals.css";

export const metadata = {
  title: "Beans — Reap What You Sow",
  description: "The all-in-one trading platform for the next generation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#080c0a', color: '#e8f0ea' }}>
        
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 40px',
          background: 'rgba(8,12,10,0.95)',
          borderBottom: '1px solid #1e2e22',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '22px', letterSpacing: '3px', color: '#f0f7f2' }}>
              BEANS<span style={{ color: '#2ecc71' }}>.</span>
            </span>
          </a>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="/learn" style={{ color: '#6b8a72', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Learn</a>
            <a href="/play" style={{ color: '#6b8a72', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Play</a>
            <a href="/exchange" style={{ color: '#c9a84c', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Exchange</a>
            <a href="/trade" style={{ color: '#6b8a72', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Trade</a>
            <a href="/profile" style={{
              background: '#1a7a43',
              color: 'white',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '8px 20px',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}>Profile</a>
          </div>
        </nav>

        <main>{children}</main>

      </body>
    </html>
  );
}