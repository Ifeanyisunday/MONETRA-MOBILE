import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useDepositMutation } from "@/services/depositApi";

export default function DepositScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [deposit, { isLoading }] = useDepositMutation();

  const handleDeposit = async () => {
    try {
      const res = await deposit({ amount }).unwrap();

      console.log("Deposit response:", res);

      alert(`Deposited ₦${amount} successfully!`);
      router.replace("/dashboardscreen");
    } catch (err) {
      console.log("Deposit error:", err);
      alert("Deposit failed. Try again.");
    }
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Text style={styles.title}>Deposit Funds</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
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
