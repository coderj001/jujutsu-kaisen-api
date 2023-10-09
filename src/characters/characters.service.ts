import { EnService } from "../helper/EnService";
import { Character } from "./characters.entity";

export type IQuery = {
  offset?: number | null;
  limit?: number | null;
};

export class CharactersService {
  private readonly dataService: EnService = new EnService();

  async findAll({ offset, limit }: IQuery = {}): Promise<Character[]> {
    offset = offset ?? 0;
    limit = limit ?? 5;
    const allCharacters = await this.dataService.getAllCharacters();
    const skip = allCharacters.slice(offset, allCharacters.length);
    const limited = skip.slice(0, limit);

    return limited;
  }
}
