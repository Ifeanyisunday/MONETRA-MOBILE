import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
// If you have RTK Query hooks for transactions, import them here
// import { useGetTransactionsQuery } from "../services/transactionApi";

export default function DashboardScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("0");
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const loadUserData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/Login");
        return;
      }
      const storedName = await AsyncStorage.getItem("username");
      const storedAccount = await AsyncStorage.getItem("accountNumber");
      const storedBalance = await AsyncStorage.getItem("balance");
      if (storedName) setUserName(storedName);
      if (storedAccount) setAccountNumber(storedAccount);
      if (storedBalance) setBalance(storedBalance);

      // Example: fetch transactions from backend
      // If you have RTK Query:
      // const { data } = useGetTransactionsQuery();
      // setTransactions(data || []);

      // For now, simulate with dummy data
      setTransactions([
        { id: 1, description: "Deposit", type: "credit", amount: 5000 },
        { id: 2, description: "Transfer to John", type: "debit", amount: 2000 },
      ]);
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["token", "username", "accountNumber", "balance"]);
    router.replace("/Login");
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Welcome, {userName} 👋</Text>
        <Text style={styles.subHeader}>Your financial snapshot</Text>
      </View>

      {/* Wallet Info */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Account Number</Text>
        <Text style={styles.summaryValue}>{accountNumber || "N/A"}</Text>
        <Text style={styles.summaryTitle}>Balance</Text>
        <Text style={styles.summaryValue}>₦{balance}</Text>
      </View>

      {/* Transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.txRow}>
            <Text style={styles.txDesc}>{item.description}</Text>
            <Text
              style={[
                styles.txAmount,
                item.type === "credit" ? styles.credit : styles.debit,
              ]}
            >
              {item.type === "credit" ? "+" : "-"}₦{item.amount}
            </Text>
          </View>
        )}
      />

      {/* Quick Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#00b894" }]}
          onPress={() => router.push("/depositscreen")}
        >
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#0984e3" }]}
          onPress={() => router.push("/transferscreen")}
        >
          <Text style={styles.actionText}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#d63031" }]}
          onPress={handleLogout}
        >
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerBox: { marginBottom: 25 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#fff", textAlign: "center" },
  subHeader: { fontSize: 16, color: "#dfe6e9", textAlign: "center", marginTop: 5 },
  summaryCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    alignItems: "center",
  },
  summaryTitle: { fontSize: 18, color: "#dfe6e9" },
  summaryValue: { fontSize: 24, fontWeight: "bold", color: "#fff", marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "600", color: "#dfe6e9", marginBottom: 10 },
  txRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
  },
  txDesc: { fontSize: 16, color: "#fff" },
  txAmount: { fontSize: 16, fontWeight: "bold" },
  credit: { color: "#2ecc71" },
  debit: { color: "#e74c3c" },
  actions: { flexDirection: "row", justifyContent: "space-around", marginTop: 35 },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  actionText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
