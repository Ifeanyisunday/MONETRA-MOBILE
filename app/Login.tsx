import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLoginMutation } from '../services/authApi';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/auth/authSlice'; // ✅ import slice action
import { useLazyGetWalletQuery } from '../services/walletApi'; // ✅ import wallet query hook

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [triggerGetWallet] = useLazyGetWalletQuery();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      const token = res.access_token;
      console.log('Backend response:', res);

      // Decode JWT to extract username/email
      const decoded: any = jwtDecode(res.access_token);
      const username = decoded.username || decoded.email || '';

      // ✅ Dispatch to Redux store
      dispatch(setCredentials({ token, user: { ...decoded, username } }));
    
    // ✅ Trigger wallet fetch AFTER login
    const walletRes = await triggerGetWallet().unwrap();
    console.log('Wallet response:', walletRes);
      
      // Merge wallet into user object
    dispatch(setCredentials({
      token,
      user: { ...decoded, username, wallet: walletRes },
    }));

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
