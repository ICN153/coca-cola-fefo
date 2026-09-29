import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!matricula.trim()) {
      Alert.alert('Erro', 'Por favor, informe sua matrícula.');
      return;
    }

    const isAdmin = matricula === '9999' || matricula.toLowerCase() === 'admin';
    onLogin({
      matricula,
      role: isAdmin ? 'ADMIN' : 'OPERADOR',
      name: isAdmin ? 'Administrador Coca-Cola' : `Operador (${matricula})`
    });
  };

  return (
    <View className="flex-1 bg-coca-red justify-center px-6">
      <View className="items-center mb-10">
        <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4 shadow-lg">
          <Text className="text-coca-red font-bold text-3xl tracking-tighter">Coca-Cola</Text>
        </View>
        <Text className="text-white text-2xl font-bold tracking-wide">Controle FEFO</Text>
        <Text className="text-white/80 text-sm mt-1">Gestão de Validades no Galpão</Text>
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-xl space-y-4">
        <Text className="text-coca-black font-semibold text-lg border-b border-gray-100 pb-2">
          Acesso ao Sistema
        </Text>

        <View>
          <Text className="text-gray-600 text-xs mb-1 font-medium">MATRÍCULA DO COLABORADOR</Text>
          <TextInput
            value={matricula}
            onChangeText={setMatricula}
            placeholder="Ex: 108420 ou 9999 (Admin)"
            keyboardType="numeric"
            className="bg-coca-gray border border-coca-softGray rounded-xl p-3 text-coca-black font-medium"
          />
        </View>

        <View>
          <Text className="text-gray-600 text-xs mb-1 font-medium">SENHA / PIN</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            className="bg-coca-gray border border-coca-softGray rounded-xl p-3 text-coca-black"
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.8}
          className="bg-coca-red rounded-xl py-3.5 items-center mt-2 shadow-md"
        >
          <Text className="text-white font-bold text-base">ENTRAR NO SISTEMA</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-white/60 text-center text-xs mt-8">
        Sistema Interno Coca-Cola • Versão 1.0.0
      </Text>
    </View>
  );
}