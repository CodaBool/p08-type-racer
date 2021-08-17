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

## Hosting
I first attempted to host the service on Vercel since I did find capabilites for Express servers on Vercel through certain configuration specification. 

However, Vercel is made for serverless or static hosting and there was timeout issues and socket based apps are not viable on the Vercel platform. 

I then moved to a Heroku deploy which works perfectly. 

The only limitation is that the app sleeps after inactivity and requires some wake time after sleeping. 