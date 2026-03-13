export default async function leads(args: string[]) {
  const name = args.join(' ') || 'Unknown';

  const res = await fetch('/api/leads', {
    method: 'POST',
    body: JSON.stringify({ name })
  });

  const data = await res.json();
  return `Lead submitted:\n${JSON.stringify(data, null, 2)}`;
}
