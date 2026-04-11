import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
// import { useTransferMutation } from "../services/transferApi";

export default function TransferScreen() {
  const router = useRouter();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  // const [transfer, { isLoading }] = useTransferMutation();

  const handleTransfer = async () => {
    try {
      // await transfer({ recipient, amount: Number(amount) }).unwrap();
      alert(`Transferred ₦${amount} to ${recipient} successfully!`);
      router.replace("/dashboardscreen");
    } catch (err) {
      alert("Transfer failed. Try again.");
    }
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Text style={styles.title}>Transfer Funds</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipient Account Number"
        keyboardType="numeric"
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Back to Dashboard</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 25 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 30, textAlign: "center" },
  input: { backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 12, padding: 14, marginBottom: 20 },
  button: { backgroundColor: "#0984e3", paddingVertical: 15, borderRadius: 12 },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "600" },
  link: { color: "#dfe6e9", marginTop: 20, textAlign: "center" },
});
