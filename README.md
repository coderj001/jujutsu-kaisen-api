# Jujutsu Kaisen API


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

|  Path   |     Source     | Method |       Response       | Queries |
| :-----: | :------------: | :----: | :------------------: | :-----: |
| /api/v1 |   characters   |  GET   |    All characters    |  soon   |
| /api/v1 | characters/:id |  GET   | Only character by id |   --    |

## TODOs
1. Unit testing
2. GCP deployed
