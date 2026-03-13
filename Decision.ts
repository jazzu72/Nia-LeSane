import { niaPressure } from './voice';

export function niaDecision({ threat, distortion, endurance, directive }) {
  const content = `
Alright, here’s the truth of it.<br><br>

<b>Distortion:</b> ${distortion}.<br>
<b>Real threat:</b> ${threat}.<br>
<b>What we can take:</b> ${endurance}.<br><br>

<b>Directive:</b> ${directive}.<br>
  `;

  return niaPressure(content);
}
