# Wallet Connect Relay on Heroku


This project is meant to simplify deployment of a wallet connect bridge on Heroku.


- Emded original wallet connect monorepo as git submodule
- Define an Heroku mini config through App.json
- Runs node through PM2

## Try it locally
Run redis locally on port 6379 or pick a cloud managed instance.

Then run the relay server

```sh
yarn install
yarn build
REDIS_URL=redis://localhost:6379 yarn start
```

Then check at [http://localhost:5555/hello](http://localhost:5555/hello)

## Want to contribute ?

Feel free to open issues and pull requests.