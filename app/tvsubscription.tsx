import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTvSubscriptionMutation } from "@/services/walletApi";

export default function TvSubscriptionScreen() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [tvSubscription, { isLoading }] = useTvSubscriptionMutation();

  const handleSubscription = async() => {
    console.log(`Paying ₦${amount} for TV card ${cardNumber}`);
    await tvSubscription({ cardNumber, amount: Number(amount) }).unwrap();
    alert("TV Subscription successful!");
    router.replace("/dashboardscreen");
  };

  return (
    <LinearGradient colors={["#e17055", "#d63031"]} style={styles.container}>
      <Text style={styles.title}>TV Subscription</Text>
      <TextInput
        style={styles.input}
        placeholder="Smart Card Number"
        placeholderTextColor="#ccc"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount (₦)"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubscription}>
        <Text style={styles.buttonText}>Subscribe</Text>
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
  button: { backgroundColor: "#6c5ce7", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#fafdff", marginTop: 20, textAlign: "center" },
});
