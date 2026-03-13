export function detectPressure(cmd: string): boolean {
  const signals = [
    "urgent", "now", "immediately", "critical", "fix",
    "help", "deadline", "investors", "risk", "collapse",
    "i'm stressed", "i'm overwhelmed", "this is bad",
    "sort this", "we're losing", "panic"
  ];

  return signals.some(s => cmd.toLowerCase().includes(s));
}
