import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { usePayBillsMutation } from "@/services/walletApi";

export default function NepaBillScreen() {

  const router = useRouter();
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [payNepaBill] = usePayBillsMutation();

  const handlePayment = async() => {
    console.log(`Paying ₦${amount} for meter ${meterNumber}`);
    await payNepaBill({ billType: "NEPA", accountNumber: meterNumber, amount: Number(amount) }).unwrap();
    alert("NEPA Bill payment successful!");
    router.replace("/dashboardscreen");
  };

  return (
    <LinearGradient colors={["#fdcb6e", "#e17055"]} style={styles.container}>
      <Text style={styles.title}>NEPA Bill Payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Meter Number"
        placeholderTextColor="#333"
        value={meterNumber}
        onChangeText={setMeterNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount (₦)"
        placeholderTextColor="#333"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Bill</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#2d3436", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "rgba(255,255,255,0.8)", color: "#2d3436", padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: "#0984e3", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
