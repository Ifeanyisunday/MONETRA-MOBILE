import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useGetTransactionsQuery } from '../services/transactionApi';

export default function TransactionsScreen() {
  const { data, isLoading, error } = useGetTransactionsQuery(undefined);

  if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error) return <Text>Error loading transactions</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Transactions</Text>
      <FlatList
        data={data || []}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1 }}>
            <Text>{item.type} - ${item.amount}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}