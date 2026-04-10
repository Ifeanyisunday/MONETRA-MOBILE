import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLoginMutation } from '../services/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { jwtDecode } from 'jwt-decode';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      console.log('Backend response:', res);

      const decoded: any = jwtDecode(res.access_token);
      const username = decoded.username || decoded.email || '';

      await AsyncStorage.multiSet([
        ['token', res.access_token],
        ['username', username],
      ]);

      alert('Login successful!');
      router.replace('/dashboardscreen');
    } catch (err: any) {
      console.log('Login error:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Register')}>
        <Text style={styles.link}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginBottom: 40, textAlign: 'center' },
  input: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: 14, marginBottom: 20 },
  button: { backgroundColor: '#2ecc71', paddingVertical: 15, borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: '600' },
  link: { color: '#dfe6e9', marginTop: 20, textAlign: 'center' },
});

export default LoginScreen;
