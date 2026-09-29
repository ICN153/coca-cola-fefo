import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function HomeScreen({ user, products, onLogout, onNavigateAdmin }) {
  const [searchCode, setSearchCode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (code) => {
    const targetCode = (code || searchCode).trim();
    if (!targetCode) {
      Alert.alert('Código Vazio', 'Digite o código do produto para buscar.');
      return;
    }

    if (products[targetCode]) {
      const prod = products[targetCode];
      // Ordena lotes por validade mais próxima (FEFO)
      const sortedLots = [...prod.lots].sort((a, b) => new Date(a.validity) - new Date(b.validity));
      setSelectedProduct({ ...prod, code: targetCode, sortedLots });
    } else {
      Alert.alert('Produto Não Encontrado', `Nenhum produto cadastrado com o código "${targetCode}".`);
      setSelectedProduct(null);
    }
  };

  const getDaysUntil = (dateStr) => {
    const diffTime = new Date(dateStr) - new Date();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <View className="flex-1 bg-coca-gray">
      {/* Header */}
      <View className="bg-coca-red pt-12 pb-6 px-6 rounded-b-3xl shadow-lg">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white/80 text-xs font-semibold">BEM-VINDO(A)</Text>
            <Text className="text-white font-bold text-lg">{user.name}</Text>
          </View>
          <TouchableOpacity onPress={onLogout} className="bg-coca-darkRed px-3 py-1.5 rounded-lg">
            <Text className="text-white text-xs font-bold">SAIR</Text>
          </TouchableOpacity>
        </View>

        {/* Campo de Busca */}
        <View className="flex-row items-center bg-white rounded-xl px-3 py-1 shadow-inner">
          <TextInput
            value={searchCode}
            onChangeText={setSearchCode}
            placeholder="Digite o código (ex: 110440)..."
            keyboardType="numeric"
            onSubmitEditing={() => handleSearch()}
            className="flex-1 py-3 px-2 text-coca-black font-semibold text-base"
          />
          <TouchableOpacity
            onPress={() => handleSearch()}
            className="bg-coca-red px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-bold text-sm">BUSCAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-4">
        {/* Botão para Acesso Admin (Se aplicável) */}
        {user.role === 'ADMIN' && (
          <TouchableOpacity
            onPress={onNavigateAdmin}
            className="bg-coca-darkRed p-3 rounded-xl mb-4 items-center"
          >
            <Text className="text-white font-bold text-xs uppercase tracking-wider">
              ⚙️ Acessar Painel de Importação Semanal
            </Text>
          </TouchableOpacity>
        )}

        {/* Atalhos Rápidos para Teste */}
        <Text className="text-gray-500 text-xs font-bold mb-2 uppercase">Códigos Rápidos para Testar:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {Object.keys(products).map((code) => (
            <TouchableOpacity
              key={code}
              onPress={() => {
                setSearchCode(code);
                handleSearch(code);
              }}
              className="bg-white border border-coca-softGray px-3 py-2 rounded-lg mr-2 shadow-sm"
            >
              <Text className="text-coca-red font-bold text-xs">{code}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Resultado do Produto */}
        {selectedProduct ? (
          <View className="mb-6">
            <View className="bg-white p-4 rounded-2xl shadow-md border-l-4 border-coca-red mb-4">
              <Text className="text-gray-400 text-xs font-bold uppercase">Código: {selectedProduct.code}</Text>
              <Text className="text-coca-black font-bold text-xl mt-1">{selectedProduct.name}</Text>
              <Text className="text-gray-500 text-xs">{selectedProduct.category}</Text>
            </View>

            <Text className="text-coca-black font-bold text-base mb-2">
              Lotes Disponíveis (Ordenados por FEFO)
            </Text>

            {selectedProduct.sortedLots.map((lot, index) => {
              const daysLeft = getDaysUntil(lot.validity);
              const isFirst = index === 0;

              return (
                <View
                  key={lot.id}
                  className={`bg-white rounded-2xl p-4 mb-3 border ${
                    isFirst ? 'border-2 border-coca-red shadow-lg' : 'border-coca-softGray shadow-sm'
                  }`}
                >
                  {isFirst && (
                    <View className="bg-coca-red self-start px-2.5 py-0.5 rounded-full mb-2">
                      <Text className="text-white text-[10px] font-bold uppercase">
                        ⭐ Retirar Primeiro (Menor Validade)
                      </Text>
                    </View>
                  )}

                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-gray-500 text-xs">Lote: {lot.id}</Text>
                      <Text className="text-coca-black font-extrabold text-lg mt-0.5">
                        Vence: {lot.validity.split('-').reverse().join('/')}
                      </Text>
                    </View>

                    <View className={`px-2.5 py-1 rounded-lg ${daysLeft < 30 ? 'bg-red-100' : 'bg-green-100'}`}>
                      <Text className={`text-xs font-bold ${daysLeft < 30 ? 'text-red-700' : 'text-green-700'}`}>
                        {daysLeft} dias restantes
                      </Text>
                    </View>
                  </View>

                  <View className="mt-3 pt-3 border-t border-gray-100 flex-row justify-between items-center">
                    <View>
                      <Text className="text-gray-400 text-[10px] uppercase font-bold">Localização no Galpão</Text>
                      <Text className="text-coca-darkRed font-bold text-xs mt-0.5">{lot.location}</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-gray-400 text-[10px] uppercase font-bold">Quantidade</Text>
                      <Text className="text-coca-black font-bold text-sm">{lot.quantity} cx/fardos</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-400 font-semibold text-center">
              Digite o código do produto acima para consultar a menor validade para a operação.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}