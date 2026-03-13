export async function load() {
  const res = await fetch('/api/score', {
    method: 'POST',
    body: JSON.stringify({ value: 42 })
  });

  const data = await res.json();
  return { score: data.score };
}
