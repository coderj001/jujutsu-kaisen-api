/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { CharactersService, IQuery } from "./characters.service";
import { serializeStringToNumeric } from "../helper/serialize-string-numeric";

export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  // async findAll({ limit, name, offset, sort }: IQuerystring = {}) {
  async findAll({ limit, offset, name }: IQuerystring = {}) {
    // const isSorted = sort != undefined && sort != null && Boolean(sort);
    if (name) {
      return await this.charactersService.findByName(name);
    }
    const query: IQuery = {
      offset: serializeStringToNumeric(offset),
      limit: serializeStringToNumeric(limit),
    };

    const characters = await this.charactersService.findAll(query);
    return characters;
  }
}

type IQuerystring = {
  name?: string;
  offset?: string;
  limit?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function charactersController(
  app: FastifyInstance,
  opts: any,
  done: any,
) {
  const characters = new CharactersController(new CharactersService());
  app.get<{ Querystring: IQuerystring }>("/", async (req, res) => {
    const { name, offset, limit } = req.query;
    const all = await characters.findAll({ limit, offset, name });
    res.code(200).send(all);
  });
  done();
}
