How to run successfully because this is completely normal:


Just run `yarn` `cd ios && pod install` `yarn ios`


- `yarn`
- `./node_modules/.bin/rn-nodeify --hack --install`
- `cd ios && pod install`
- Amend `node_modules/@solana/web3.js/package.json`. Make sure this exists: `"lib/index.cjs.js": "./lib/index.cjs.js"`
- Rename `node_modules/superstruct/lib/index.cjs` to `node_modules/superstruct/lib/index.cjs.js`
- Amend `node_modules/@vue/runtime-dom/dist/runtime-dom.cjs.js` find `if (typeof window !== 'undefined')` replace with `if (typeof window !== 'undefined' && typeof document !== 'undefined') {`
- `yarn ios`