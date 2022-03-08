How to run successfully because this is completely normal:

- `yarn`
- `./node_modules/.bin/rn-nodeify --hack --install`
- `cd ios && pod install`
- Amend `node_modules/@solana/web3.js/package.json`. Make sure this exists: `"lib/index.cjs.js": "./lib/index.cjs.js"`
- Rename `node_modules/superstruct/lib/index.cjs` to `node_modules/superstruct/lib/index.cjs.js`
- `yarn ios`