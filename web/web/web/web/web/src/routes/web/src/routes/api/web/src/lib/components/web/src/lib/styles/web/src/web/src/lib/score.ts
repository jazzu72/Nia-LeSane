export default async function score(args: string[]) {
  const value = Number(args[0] || 0);

  const res = await fetch('/api/score', {
    method: 'POST',
    body: JSON.stringify({ value })
  });

  const data = await res.json();
  return `Score result: ${JSON.stringify(data, null, 2)}`;
}
