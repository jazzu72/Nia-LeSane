// Nia's Black British (mid-30s) voice model

export function niaNormal(content: string): string {
  return `
<b>Nia</b><br>
Alright love, let’s walk through this proper.<br><br>
${content}<br><br>
We move steady, yeah?
  `;
}

export function niaPressure(content: string): string {
  return `
<b>Nia (Pressure Mode)</b><br>
Alright, breathe for me a sec. The moment’s loud, but we’re not letting it run us.<br><br>
${content}<br><br>
We stay sharp. We stay calm. We carry on.
  `;
}
