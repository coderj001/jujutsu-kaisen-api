/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { CharactersService, IQuery } from "./characters.service";
import { serializeStringToNumeric } from "../helper/serialize-string-numeric";

export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  // async findAll({ limit, name, offset, sort }: IQuerystring = {}) {
  async findAll({ limit, offset }: IQuerystring = {}) {
    // const isSorted = sort != undefined && sort != null && Boolean(sort);
    const query: IQuery = {
      offset: offset ? serializeStringToNumeric(offset) : 0,
      limit: limit ? serializeStringToNumeric(limit) : 0,
    };

    const characters = await this.charactersService.findAll(query);
    return characters;
  }
}

type IQuerystring = {
  name?: string;
  offset?: string;
  limit?: string;
  sort?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function charactersController(
  app: FastifyInstance,
  opts: any,
  done: any,
) {
  const characters = new CharactersController(new CharactersService());
  app.get<{ Querystring: IQuerystring }>("/", async (req, res) => {
    const { name, offset, limit, sort } = req.query;
    console.log(name);
    console.log(sort);
    const all = await characters.findAll({ offset, limit });
    res.code(200).send(all);
  });
  done();
}
