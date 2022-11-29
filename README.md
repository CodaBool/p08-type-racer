# Type Racing Game
## Stack
- Express.js
- Node.js
- MongoDB
- Socket-io
- React/Nextjs

## Logic Explanation
The root index.js contains the Node Express server which starts a socket-io instance. 

There is a Nextjs (sub framework of React) app which builds the client code which will allow client socket instances to connect to each other. 

/pages/online contains most of the game JSX code, as well as integrated chat which utilizes the same socket as the game. 

Most logic is done serverside and clients are just listening to socket events from the server for game state updates. 

As well as emitting their own updates when game progress is made through typing. 


### Node 17+
use cross-env NODE_OPTIONS=--openssl-legacy-provider to avoid nextjs crypto package error

# New Deployment
I used to have this on Heroku but now switched this to onRender.com

# Presentation Notes
> HINT: did you create the .env and terraform2/terraform.tfvars file

### Commands
`cd terraform1`

`docker build -t tampa-nginx:latest .`

`terraform init`

`terraform apply -auto-approve` (30s)

`cd ..`

`docker build -t tampa-typer:latest .`

`cd terraform2`

`terraform init`

`terraform apply -auto-approve` (5m)

#### Bonus
`docker run --env-file ./.env --name typer -d -p 80:3000 tampa-typer`

`docker container stop typer`

`docker rm typer`

docker production images should be private

database should not be internet accessable

docker compose file


# New deploy 2022
1. create ECS repo
2. click "view push commands" & run the cli commands

## Boostrap
I decided against upgrading `react-bootstrap` to v2. There was something likely with either the inputgroup or popover which caused errors I did not fully debug.