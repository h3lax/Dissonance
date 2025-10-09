# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Servers

Start the app server on `http://localhost:3000`:

```bash
# npm
npx nuxi dev
```

Start Websocket Node server in another terminal:

```bash
# npm
node server/socket.ts 
```



Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

Afin de lancer le client et le server sous windows : Ouvrir 2 terminal et se rendre dans le dossier 'frontend':
1er terminal : npx nuxi dev
2ème terminal : npx tsx server/socket.ts
