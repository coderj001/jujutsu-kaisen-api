# Jujutsu Kaisen API

<p align="center">
    <img src="https://ci.appveyor.com/api/projects/status/github/coderj001/jujutsu-kaisen-api?svg=true" alt="Build status: Passing" />
  <a href="https://github.com/coderj001/jujutsu-kaisen-api/actions" alt="Build status: Passing">
    <img src="https://github.com/coderj001/jujutsu-kaisen-api/actions/workflows/node.js.yml/badge.svg" alt="Build status: Passing">
  </a>
</p>


### Description

API to fetch data about Jujutsu Kaisen API anime and manga. With a short resume of history of life, images and a table of more specific information of each character.


### Installation

```bash
pnpm install
```

### Running the app

```bash
# development
pnpm start:dev

# production
pnpm build
pnpm start:prod
```

## Paths

|  Path   |   Source   | Method |    Response    | Queries |
| :-----: | :--------: | :----: | :------------: | :-----: |
| /api/v1 | characters |  GET   | All characters |  soon   |