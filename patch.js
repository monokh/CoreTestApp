const fs = require('fs/promises')

;(async () => {
  const solanaWeb3Package = await fs.readFile('node_modules/@solana/web3.js/package.json', { encoding: 'utf8' })
  const fixedSolanaWeb3Package = solanaWeb3Package.replaceAll('./lib/index.browser.cjs.js', './lib/index.cjs.js')
  await fs.writeFile('node_modules/@solana/web3.js/package.json', fixedSolanaWeb3Package)

  const vueRuntimeDom = await fs.readFile('node_modules/@vue/runtime-dom/dist/runtime-dom.cjs.js', { encoding: 'utf8' })
  const fixedVueRuntimeDom = vueRuntimeDom.replaceAll(`if (typeof window !== 'undefined')`, `if (typeof window !== 'undefined' && typeof document !== 'undefined')`)
  await fs.writeFile('node_modules/@vue/runtime-dom/dist/runtime-dom.cjs.js', fixedVueRuntimeDom)

  try {
    await fs.rename('node_modules/superstruct/lib/index.cjs', 'node_modules/superstruct/lib/index.cjs.js')
  } catch (e) {
    console.log('node_modules/superstruct/lib/index.cjs', 'already renamed?')
  }
})()