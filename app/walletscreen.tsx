import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useGetWalletQuery } from '../services/walletApi';

export default function WalletScreen({ navigation }: any) {
  const { data: wallet, isLoading, error } = useGetWalletQuery(undefined);

  if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error) return <Text>Error loading wallet</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>My Wallet</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>
        Balance: ${wallet?.balance.toFixed(2) || 0}
      </Text>

      <Button title="Send Money" onPress={() => navigation.navigate('Transfer')} />
      <Button title="Transactions" onPress={() => navigation.navigate('Transactions')} />
    </View>
  );
}