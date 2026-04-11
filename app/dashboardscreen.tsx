import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store"; // adjust path
import { logout } from "../store/auth/authSlice";
import { useGetWalletQuery } from "../services/walletApi";

export default function DashboardScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Read auth state directly from Redux
  const auth = useSelector((state: RootState) => state.auth);
  console.log("Auth state in Dashboard:", auth.user); // Debug log to verify auth state

  const { data: wallet, isLoading } = useGetWalletQuery();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/Login");
  };

  // Dummy transactions for now — replace with RTK Query later
  const transactions = [
    { id: 1, description: "Deposit", type: "credit", amount: 5000 },
    { id: 2, description: "Transfer to John", type: "debit", amount: 2000 },
  ];

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Welcome, {auth.user?.username} 👋</Text>
        <Text style={styles.subHeader}>Your financial snapshot</Text>
      </View>

      {/* Wallet Info */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Account Number</Text>
        <Text style={styles.summaryValue}>{wallet?.accountNumber || "N/A"}</Text>
        <Text style={styles.summaryTitle}>Balance</Text>
        <Text style={styles.summaryValue}>₦{wallet?.balance ?? 0}</Text>
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
          onPress={() => router.push("/deposit")}
        >
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#0984e3" }]}
          onPress={() => router.push("/transfer")}
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
