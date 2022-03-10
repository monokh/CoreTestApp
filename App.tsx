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

const SEED = 'obvious digital bronze kangaroo crew basic drink liquid secret unveil dose conduct'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [state, setState] = useState(wallet.state);

  wallet.subscribe((mutation, newState) => {
    setState(newState);
  })

  const createWallet = () => {
    wallet.dispatch('createWallet', {
      key: 'test123',
      mnemonic: SEED,
      imported: true
    })
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button onPress={createWallet} title="Create Wallet"></Button>
      <Text  style={[
          {
            textAlign: 'center',
            fontSize: 40
          },
        ]}>{ state.wallets.length }</Text>
    </SafeAreaView>
  );
};

export default App;
