import { EnService } from "../helper/EnService";
import { Character } from "./characters.entity";

const _offset = 0;
const _limit = 5;

export type IQuery = {
  offset?: number;
  limit?: number;
}

export class CharactersService {
  private readonly dataService: EnService = new EnService();

  async findAll({ offset, limit }: IQuery = {}): Promise<Character[]> {
    offset ??= _offset
    limit ??= _limit
    const allCharacters = await this.dataService.getAllCharacters()
    const skip = allCharacters.slice(offset, allCharacters.length - 1);
    const limited = skip.slice(0, limit)

    return limited
  }

}
