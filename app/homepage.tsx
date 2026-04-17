import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function MonetraHomepage() {
  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >
      {/* Logo */}
      <Image
        source={{ uri: "https://img.icons8.com/color/96/money.png" }}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Monetra</Text>
      <Text style={styles.subtitle}>Control your money with clarity</Text>

      {/* Action buttons */}
      <View style={styles.buttonGroup}>
        <Link href="/loginpage" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/registerpage" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.ghostButton}>
          <Text style={styles.ghostText}>Guest View</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Secure • Fast • Reliable</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 25,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#dfe6e9",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: "#00b894",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginBottom: 15,
  },
  ghostButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  ghostText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  footer: {
    marginTop: 50,
    fontSize: 14,
    color: "#bdc3c7",
    opacity: 0.9,
  },
});
