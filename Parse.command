import { detectPressure } from './pressure';

export async function parseCommand(cmd: string): Promise<string> {
  const isPressure = detectPressure(cmd);
  const [command, ...args] = cmd.split(' ');

  let output;

  switch (command.toLowerCase()) {
    case 'help':
      output = help();
      break;
    case 'score':
      output = await score(args);
      break;
    case 'quantum':
      output = await quantum(args);
      break;
    case 'lead':
    case 'leads':
      output = await leads(args);
      break;
    default:
      output = `Unknown command: ${command}`;
  }

  return isPressure ? pressureWrapper(output) : output;
}
