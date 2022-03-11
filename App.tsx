/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { wallet } from '@liquality/wallet-core'
import { assets, unitToCurrency } from '@liquality/cryptoassets'
import BigNumber from 'bignumber.js'

const SEED = 'obvious digital bronze kangaroo crew basic drink liquid secret unveil dose conduct'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [state, setState] = useState(wallet.state);

  wallet.subscribe((mutation, newState) => {
    setState(newState);
    console.log('state updated')
  })

  const createWallet = async () => {
    await wallet.dispatch('createWallet', {
      key: 'test123',
      mnemonic: SEED,
      imported: true
    })

    await wallet.dispatch('changeActiveNetwork', { walletId: wallet.state.activeWalletId, network: 'testnet' })

    await wallet.dispatch('updateBalances', { network: wallet.state.activeNetwork, walletId: wallet.state.activeWalletId, assets: ['ETH', 'MATIC'] })
  }

  const polygonAccount = state.accounts[state.activeWalletId]?.[state.activeNetwork]?.find(account => account.chain === 'polygon')

  let balance
  if (polygonAccount) {
    balance = unitToCurrency(assets.MATIC, new BigNumber(polygonAccount.balances.MATIC)).toString()
  }

  console.log('polygon account', polygonAccount)

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button onPress={createWallet} title="Create Wallet"></Button>
      { polygonAccount && <Text selectable style={[
          {
            textAlign: 'center',
            fontSize: 40
          },
        ]}>MATIC Balance: { balance }, MATIC Address: 0x{ polygonAccount.addresses[0] }</Text> }
    </SafeAreaView>
  );
};

export default App;
