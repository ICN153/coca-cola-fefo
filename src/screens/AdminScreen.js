import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";

export default function AdminScreen({ onBack, onUpdateProducts }) {
  const [jsonInput, setJsonInput] = useState("");

  const handleImportMock = () => {
    try {
      if (!jsonInput.trim()) {
        Alert.alert(
          "Campo Vazio",
          "Cole o conteúdo da atualização para importar.",
        );
        return;
      }
      const parsedData = JSON.parse(jsonInput);
      onUpdateProducts(parsedData);
      Alert.alert(
        "Sucesso",
        "Base de dados de validades atualizada com sucesso!",
      );
      setJsonInput("");
    } catch (e) {
      Alert.alert(
        "Erro no Formato",
        "O formato informado é inválido. Certifique-se de usar JSON correto.",
      );
    }
  };

  return (
    <View className="flex-1 bg-coca-gray">
      <View className="bg-coca-darkRed pt-12 pb-6 px-6 rounded-b-3xl">
        <TouchableOpacity onPress={onBack} className="mb-2">
          <Text className="text-white text-xs font-bold">
            ← VOLTAR PARA CONSULTA
          </Text>
        </TouchableOpacity>
        <Text className="text-white font-bold text-xl">
          Painel de Atualização Semanal
        </Text>
        <Text className="text-white/80 text-xs">
          Carga de Validades e Estoque
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-4">
        <View className="bg-white p-5 rounded-2xl shadow-sm mb-4">
          <Text className="text-coca-black font-bold text-base mb-1">
            Carga via Planilha / Dados
          </Text>
          <Text className="text-gray-500 text-xs mb-3">
            Cole aqui os dados da nova planilha semanal exportada para atualizar
            o estoque dos empilhadores.
          </Text>

          <TextInput
            value={jsonInput}
            onChangeText={setJsonInput}
            placeholder="Cole aqui os dados (Formato JSON ou Estruturado)..."
            multiline
            numberOfLines={6}
            className="bg-coca-gray border border-coca-softGray rounded-xl p-3 text-xs text-coca-black mb-3"
            textAlignVertical="top"
          />

          <TouchableOpacity
            onPress={handleImportMock}
            className="bg-coca-red py-3 rounded-xl items-center"
          >
            <Text className="text-white font-bold text-sm">
              PROCESSAR E ATUALIZAR APP
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
