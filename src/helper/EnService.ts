import { Character } from "../characters/characters.entity";
import { data as rawCharacters } from '../data/characters.json';

const cache: {
  getAllCharacters: Character[];
  getAllCharacterById: Character[];
} = {
  getAllCharacters: [],
  getAllCharacterById: []
};


export class EnService {
  async getAllCharacters(): Promise<Character[]> {
    if (!cache.getAllCharacters) {
      cache.getAllCharacters = rawCharacters;
    }
    return cache.getAllCharacters;
  }

  async getAllCharacterById(id: number): Promise<Character[]> {
    const userInCache = cache.getAllCharacterById.find(({ id: _id }) => _id === id,);
    if (userInCache) return [userInCache];

    const all = await this.getAllCharacters()
    const user = all.find(({ id: _id }) => _id === id);

    if (user) {
      cache.getAllCharacterById.push(user)
      return [user];
    }

    return []
  }
}
