export default function help() {
  return `
Available commands:

help        — Show this help menu
score X     — Send a score request to /api/score
quantum     — Query available quantum backends
leads NAME  — Submit a lead to /api/leads

More commands coming soon: memory, rituals, vault, governance.
  `;
}
