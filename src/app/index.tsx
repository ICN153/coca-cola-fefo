import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login solicitado:', { email, password });
  };

  return (
    <View style={{ flex: 1, width: '100vw', height: '100vh', backgroundColor: '#000' }}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1920&auto=format&fit=crop',
        }}
        style={{ width: '100%', height: '100%', flex: 1 }}
        resizeMode="cover"
      >
        <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
          <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1, width: '100%' }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  width: '100%',
                  minHeight: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 32,
                }}
                showsVerticalScrollIndicator={false}
              >
                {/* Card de Login */}
                <View
                  style={{
                    width: '100%',
                    maxWidth: 420,
                    backgroundColor: 'rgba(9, 9, 11, 0.92)',
                    padding: 28,
                    borderRadius: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(220, 38, 38, 0.4)',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <Text
                      style={{
                        color: '#dc2626',
                        fontWeight: '900',
                        fontSize: 32,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        textAlign: 'center',
                      }}
                    >
                      Coca-Cola
                    </Text>
                    <Text
                      style={{
                        color: '#d4d4d8',
                        fontSize: 11,
                        fontWeight: '700',
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        marginTop: 4,
                      }}
                    >
                      Sistema FEFO • Acesso ao Operador
                    </Text>
                  </View>

                  <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 4 }}>
                    Bem-vindo
                  </Text>
                  <Text style={{ color: '#a1a1aa', fontSize: 13, textAlign: 'center', marginBottom: 24 }}>
                    Insira suas credenciais para acessar a consulta de lotes e estoque.
                  </Text>

                  <View style={{ width: '100%' }}>
                    <View style={{ marginBottom: 16 }}>
                      <Text style={{ color: '#d4d4d8', fontSize: 11, fontWeight: '600', marginBottom: 6, textTransform: 'uppercase' }}>
                        E-mail ou Matrícula
                      </Text>
                      <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="operador@cocacola.com"
                        placeholderTextColor="#71717a"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{
                          width: '100%',
                          backgroundColor: 'rgba(24, 24, 27, 0.9)',
                          color: '#fff',
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: '#3f3f46',
                          fontSize: 15,
                        }}
                      />
                    </View>

                    <View style={{ marginBottom: 24 }}>
                      <Text style={{ color: '#d4d4d8', fontSize: 11, fontWeight: '600', marginBottom: 6, textTransform: 'uppercase' }}>
                        Senha
                      </Text>
                      <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        placeholderTextColor="#71717a"
                        secureTextEntry
                        style={{
                          width: '100%',
                          backgroundColor: 'rgba(24, 24, 27, 0.9)',
                          color: '#fff',
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: '#3f3f46',
                          fontSize: 15,
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={handleLogin}
                      activeOpacity={0.8}
                      style={{
                        width: '100%',
                        backgroundColor: '#dc2626',
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Entrar no Sistema
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={{ marginTop: 20 }}>
                    <Text style={{ color: '#a1a1aa', fontSize: 12, textAlign: 'center' }}>
                      Esqueceu a senha ou precisa de suporte?
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 32, alignItems: 'center' }}>
                  <Text style={{ color: '#71717a', fontSize: 11, textAlign: 'center' }}>
                    Coca-Cola FEFO Management System • v1.0
                  </Text>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}