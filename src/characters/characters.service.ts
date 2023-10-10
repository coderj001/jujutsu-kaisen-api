import { EnService } from "../helper/EnService";
import { Character } from "./characters.entity";

export type IQuery = {
  offset?: number | null;
  limit?: number | null;
};

export class CharactersService {
  // private readonly dataService: EnService = new EnService();
  constructor(private readonly dataService: EnService = new EnService()) { }

  async findAll({ offset, limit }: IQuery = {}): Promise<Character[]> {
    offset = offset ?? 0;
    limit = limit ?? 5;
    const allCharacters = await this.dataService.getAllCharacters();
    const skip = allCharacters.slice(offset, allCharacters.length);
    const limited = skip.slice(0, limit);

    return limited;
  }

  async findByName(name: string): Promise<Character[]> {
    const normalizedName = name.split(" ").map((name) =>
      name
        .normalize("NFD")
        .toLowerCase(),
    );
    const all = await this.findAll();

    const normalizeNames = all.map(({ name }, id): [number, string] => [
      id,
      name
        .normalize("NFD")
        .toLowerCase(),
    ]);

    let exactlyMatchId: number = -1;
    const scores = [];
    const alternatives: number[] = [];

    for (let i = 0; i < normalizeNames.length; i++) {
      const [id, name] = normalizeNames[i];
      let points = 0;

      if (name.toLowerCase() === normalizedName.join(" ")) {
        exactlyMatchId = id;
        break;
      }

      const splittedNames = name.split(" ");

      normalizedName.forEach((_name) => {
        const includes = splittedNames.filter(
          (__name) => __name === _name,
        ).length;
        if (includes) points++;
      });

      if (points > 0) {
        scores.push({ points, id });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      normalizeNames.forEach(([_, _name]) => {
        const includes = splittedNames.filter((__name) =>
          __name.match(_name),
        ).length;
        if (includes) alternatives.push(id);
      });
    }

    const semiMatch = scores.map(({ id }) => all[id]);
    const alternativeMatch = alternatives.map((alt) => all[alt]);

    const find =
      exactlyMatchId >= 0
        ? [all[exactlyMatchId]]
        : semiMatch.length
          ? semiMatch
          : alternativeMatch;

    if (!find.length) {
      return [];
    }

    return find;
  }
}
