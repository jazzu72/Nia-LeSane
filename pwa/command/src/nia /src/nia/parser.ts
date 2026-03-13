import { runGrantSearch, runMintCheck } from "./commands";
import { niaNormal, niaPressure } from "./voice";

export async function parseCommand(cmd: string) {
  const [command, ...args] = cmd.split(" ");

  if (command === "grants") {
    const query = args.join(" ");
    const data = await runGrantSearch(query);

    return niaNormal(
      data.results?.length
        ? `BirdDog found ${data.results.length} opportunities.\n\n${JSON.stringify(data.results, null, 2)}`
        : "BirdDog didn’t spot anything with a deadline, love."
    );
  }

  if (command === "mint") {
    const stats = JSON.parse(args.join(" "));
    const data = await runMintCheck(stats);

    if (data.action === "MINT_NFT") {
      return niaPressure(
        `Savon’s calling it — momentum’s loud enough.\n\n${JSON.stringify(data, null, 2)}`
      );
    }

    return niaNormal(
      `Clout’s still building. Current views: ${data.current}.`
    );
  }

  return niaNormal("Not sure about that one, love.");
}
