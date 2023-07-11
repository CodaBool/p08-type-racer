# Type Racing Game

## Database
- Mongodb

## Server
- Socket.io
- pm2 (manage node server)
- nginx (reverse proxy)

## Client
- React
- Bootstrap (style)
- Vite (builds)


## Logic Explanation
Most logic is done serverside and clients are just listening to socket events from the server for game state updates. 

As well as emitting their own updates when game progress is made through typing. 

# Deployment
> how I deploy this

This has gone through a couple iterations. It used to be a Next.js app until I found out about websocket limitations.

I then deployed this on Heroku, but they removed free tier, I moved it to onRender.

I now have since moved it to a AWS VPS. 

This has now allowed me to bundle a couple websocket server instances onto a single ec2 instance.

I then use nginx to reverse proxy requests to the respective websocket server. 

The build process is complicated due to it being all automated.

A full build has the following steps

1. A push to the main branch will upload the typer.mjs and any necessary files to [sock](https://github.com/CodaBool/sock) repo.
2. If there are any changes to the files in the sock repo it will begin a new packer build
3. Packer will build a new AMI which bakes in the server code with all necessary dependencies
4. A new EC2 spot instance is deployed at a cost of around $3 a month (we are talking about a .5Gb of memory on the machine so it's cheap)
5. Vercel deploys a new client and the process is complete
