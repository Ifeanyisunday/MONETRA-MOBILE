import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useSendTransferMutation } from '../services/transferApi';

export default function TransferScreen() {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [sendTransfer, { isLoading }] = useSendTransferMutation();

  const handleSend = async () => {
    try {
      await sendTransfer({ recipientEmail, amount: parseFloat(amount) }).unwrap();
      Alert.alert('Success', 'Transfer completed!');
      setRecipientEmail('');
      setAmount('');
    } catch (err: any) {
      Alert.alert('Error', err?.data?.message || 'Transfer failed');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Send Money</Text>
      <TextInput
        placeholder="Recipient Email"
        value={recipientEmail}
        onChangeText={setRecipientEmail}
        style={{ marginVertical: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ marginVertical: 10, borderWidth: 1, padding: 10 }}
      />
      <Button title={isLoading ? 'Sending...' : 'Send'} onPress={handleSend} disabled={isLoading} />
    </View>
  );
}