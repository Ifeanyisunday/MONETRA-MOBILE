import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useBuyAirtimeMutation } from "@/services/walletApi";

export default function AirtimeScreen() {
  
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [airtime] = useBuyAirtimeMutation();

  const handlePurchase = async() => {
    console.log(`Buying ₦${amount} airtime for ${phone}`);
    await airtime({ phone, amount: Number(amount) }).unwrap()
    alert("Airtime purchase successful!");
    router.replace("/dashboardscreen");
  };

  return (
    <LinearGradient colors={["#6c5ce7", "#341f97"]} style={styles.container}>
      <Text style={styles.title}>Airtime Purchase</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#ccc"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount (₦)"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handlePurchase}>
        <Text style={styles.buttonText}>Buy Airtime</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Back to Dashboard</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: "#00b894", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#dfe6e9", marginTop: 20, textAlign: "center" },
});
