export default async function quantum() {
  const res = await fetch('/api/quantum', { method: 'GET' });
  const data = await res.json();

  return `Quantum backends:\n${data.backends.join('\n')}`;
}
