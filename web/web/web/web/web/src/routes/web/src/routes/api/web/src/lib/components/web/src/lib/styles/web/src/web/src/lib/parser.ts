import help from './commands/help';
import score from './commands/score';
import quantum from './commands/quantum';
import leads from './commands/leads';

export async function parseCommand(cmd: string): Promise<string> {
  const [command, ...args] = cmd.split(' ');

  switch (command.toLowerCase()) {
    case 'help':
      return help();
    case 'score':
      return await score(args);
    case 'quantum':
      return await quantum(args);
    case 'lead':
    case 'leads':
      return await leads(args);
    default:
      return `Unknown command: ${command}\nType "help" for available commands.`;
  }
}
export function detectPressure(cmd: string): boolean {
  const signals = [
    "urgent", "now", "immediately", "critical", "fix", "help",
    "deadline", "investors", "risk", "collapse", "i'm stressed",
    "i'm overwhelmed", "this is bad"
  ];

  return signals.some(s => cmd.toLowerCase().includes(s));
}
