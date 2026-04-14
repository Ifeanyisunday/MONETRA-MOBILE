import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTransferMutation } from "../services/walletApi";

export default function TransferScreen() {
  const router = useRouter();
  const [recipientAccountNumber, setRecipientAccountNumber] = useState(""); // ✅ renamed
  const [amount, setAmount] = useState<number>(0);
  const [transfer, { isLoading }] = useTransferMutation();

  const handleTransfer = async () => {
    try {
      await transfer({
        recipientAccountNumber, // ✅ matches DTO
        amount,
      }).unwrap();

      alert(`Transferred ₦${amount} to ${recipientAccountNumber} successfully!`);
      router.replace("/dashboardscreen");
    } catch (err) {
      console.log("Transfer error:", err);
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
        value={recipientAccountNumber}
        onChangeText={setRecipientAccountNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount.toString()}
        onChangeText={(text) => {
          const numericValue = Number(text);
          setAmount(isNaN(numericValue) ? 0 : numericValue);
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleTransfer} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? "Processing..." : "Transfer"}</Text>
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
