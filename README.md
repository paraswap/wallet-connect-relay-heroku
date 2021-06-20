# Wallet Connect Relay on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/paraswap/wallet-connect-relay-heroku)


This project is meant to simplify deployment of a wallet connect bridge on Heroku.


- Clones original [wallet connect monorepo](https://github.com/WalletConnect/walletconnect-monorepo) (cannot use git submodule because of Heroku Build API [read here](https://devcenter.heroku.com/articles/heroku-button#requirements) for more details)
- Define an Heroku minimal config through App.json
- Runs node through PM2

Note that you can still pass whathever environment variable WC Relay server accepts (for instance WAKU_URL).

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
