export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        🎷 Nia LeSane
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>
        CEO Application
      </p>
      <p style={{ maxWidth: '600px', textAlign: 'center', lineHeight: '1.6' }}>
        Autonomous, Soulful, Powerful. A premium application featuring quantum computing integration, 
        biometric security, and best-in-class UX.
      </p>
    </main>
  );
}
