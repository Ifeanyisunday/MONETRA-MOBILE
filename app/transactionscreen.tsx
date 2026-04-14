import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useGetTransactionsQuery } from "../services/walletApi";

export default function TransactionsScreen() {
  const { data, isLoading, error } = useGetTransactionsQuery();

  if (isLoading)
    return (
      <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" style={{ flex: 1 }} />
      </LinearGradient>
    );

  if (error)
    return (
      <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
        <Text style={styles.errorText}>Error loading transactions</Text>
      </LinearGradient>
    );

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={data || []}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.txRow}>
            <View>
              <Text style={styles.txDesc}>{item.description || item.type}</Text>
              <Text style={styles.txDate}>{item.date}</Text>
            </View>
            <Text
              style={[
                styles.txAmount,
                item.type === "deposit" ? styles.credit : styles.debit,
              ]}
            >
              {item.type === "deposit" ? "+" : "-"}₦{item.amount}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: { color: "#e74c3c", fontSize: 18, textAlign: "center", marginTop: 40 },
  txRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
  },
  txDesc: { fontSize: 16, color: "#fff", fontWeight: "600" },
  txDate: { fontSize: 14, color: "#dfe6e9", marginTop: 4 },
  txAmount: { fontSize: 16, fontWeight: "bold" },
  credit: { color: "#2ecc71" },
  debit: { color: "#e74c3c" },
  separator: { height: 12 },
});
