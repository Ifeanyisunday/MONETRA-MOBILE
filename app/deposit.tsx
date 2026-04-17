import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useDepositMutation } from "../services/walletApi";

export default function DepositScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [deposit, { isLoading }] = useDepositMutation();

  const handleDeposit = async () => {
    try {
      await deposit({ amount }).unwrap();
      alert(`Deposited ₦${amount} successfully!`);

      console.log(deposit)
      router.replace("/dashboardscreen");
    } catch (err: any) {
      const message = err?.data?.message?.message
      alert(message);
    }
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Text style={styles.title}>Deposit Funds</Text>
      <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount.toString()} // convert number → string for display
          onChangeText={(text) => {
            // convert string → number before saving
          const numericValue = Number(text);
          setAmount(isNaN(numericValue) ? 0 : numericValue);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleDeposit}>
        <Text style={styles.buttonText}>Deposit</Text>
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
  button: { backgroundColor: "#00b894", paddingVertical: 15, borderRadius: 12 },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "600" },
  link: { color: "#dfe6e9", marginTop: 20, textAlign: "center" },
});
