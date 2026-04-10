import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRegisterMutation } from '../services/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await register({ username, email, phoneNumber, password }).unwrap();
      console.log('Backend response:', res);

      // Save token, username, and account number
      await AsyncStorage.multiSet([
        ['token', res.access_token],
        ['username', res.username],
        ['accountNumber', res.wallet.accountNumber],
      ]);

      alert('Registration successful! Please login.');
      router.replace('/Login');
    } catch (err: any) {
      if (err?.status === 409) {
        alert('A user with this email or phone already exists. Please login.');
      } else {
        alert('Registration failed. Please try again.');
      }
      console.log('FULL RESPONSE:', JSON.stringify(err, null, 2));
    }
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Text style={styles.title}>Create Account ✨</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={username} onChangeText={setUserName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Signing up...' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginBottom: 40, textAlign: 'center' },
  input: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: 14, marginBottom: 20 },
  button: { backgroundColor: '#00b894', paddingVertical: 15, borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: '600' },
  link: { color: '#dfe6e9', marginTop: 25, textAlign: 'center' },
});

export default RegisterScreen;
