import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dados de exemplo do FEFO (Lotes e Validades)
  const lotesFEFO = [
    {
      id: "1",
      produto: "Coca-Cola 350ml Lata",
      lote: "L-20260901",
      validade: "15/10/2026",
      status: "Crítico (Prioridade 1)",
      quantidade: "120 caixas",
    },
    {
      id: "2",
      produto: "Coca-Cola Zero 350ml",
      lote: "L-20260905",
      validade: "02/11/2026",
      status: "Atenção (Prioridade 2)",
      quantidade: "85 caixas",
    },
    {
      id: "3",
      produto: "Coca-Cola 2L Pet",
      lote: "L-20260912",
      validade: "20/12/2026",
      status: "Normal (Prioridade 3)",
      quantidade: "210 caixas",
    },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1920&auto=format&fit=crop",
        }}
        style={{ width: "100%", height: "100%", flex: 1 }}
        resizeMode="cover"
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.82)",
          }}
        >
          <SafeAreaView style={{ flex: 1, width: "100%", height: "100%" }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1, width: "100%" }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  width: "100%",
                  minHeight: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 32,
                }}
                showsVerticalScrollIndicator={false}
              >
                {!isLoggedIn ? (
                  /* --- CARD DE LOGIN --- */
                  <View
                    style={{
                      width: "100%",
                      maxWidth: 420,
                      backgroundColor: "rgba(9, 9, 11, 0.92)",
                      padding: 28,
                      borderRadius: 24,
                      borderWidth: 1,
                      borderColor: "rgba(220, 38, 38, 0.4)",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ alignItems: "center", marginBottom: 24 }}>
                      <Text
                        style={{
                          color: "#dc2626",
                          fontWeight: "900",
                          fontSize: 32,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          textAlign: "center",
                        }}
                      >
                        Coca-Cola
                      </Text>
                      <Text
                        style={{
                          color: "#d4d4d8",
                          fontSize: 11,
                          fontWeight: "700",
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          marginTop: 4,
                        }}
                      >
                        Sistema FEFO • Acesso ao Operador
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: 4,
                      }}
                    >
                      Bem-vindo
                    </Text>
                    <Text
                      style={{
                        color: "#a1a1aa",
                        fontSize: 13,
                        textAlign: "center",
                        marginBottom: 24,
                      }}
                    >
                      Insira suas credenciais para acessar a consulta de lotes e
                      estoque.
                    </Text>

                    <View style={{ width: "100%" }}>
                      <View style={{ marginBottom: 16 }}>
                        <Text
                          style={{
                            color: "#d4d4d8",
                            fontSize: 11,
                            fontWeight: "600",
                            marginBottom: 6,
                            textTransform: "uppercase",
                          }}
                        >
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
                            width: "100%",
                            backgroundColor: "rgba(24, 24, 27, 0.9)",
                            color: "#fff",
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: "#3f3f46",
                            fontSize: 15,
                          }}
                        />
                      </View>

                      <View style={{ marginBottom: 24 }}>
                        <Text
                          style={{
                            color: "#d4d4d8",
                            fontSize: 11,
                            fontWeight: "600",
                            marginBottom: 6,
                            textTransform: "uppercase",
                          }}
                        >
                          Senha
                        </Text>
                        <TextInput
                          value={password}
                          onChangeText={setPassword}
                          placeholder="••••••••"
                          placeholderTextColor="#71717a"
                          secureTextEntry
                          style={{
                            width: "100%",
                            backgroundColor: "rgba(24, 24, 27, 0.9)",
                            color: "#fff",
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: "#3f3f46",
                            fontSize: 15,
                          }}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={handleLogin}
                        activeOpacity={0.8}
                        style={{
                          width: "100%",
                          backgroundColor: "#dc2626",
                          paddingVertical: 14,
                          borderRadius: 12,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: 15,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}
                        >
                          Entrar no Sistema
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ marginTop: 20 }}>
                      <Text
                        style={{
                          color: "#a1a1aa",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        Esqueceu a senha ou precisa de suporte?
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  /* --- PAINEL DE CONSULTA FEFO (EXIBIDO APÓS CLICAR EM ENTRAR) --- */
                  <View
                    style={{
                      width: "100%",
                      maxWidth: 640,
                      backgroundColor: "rgba(9, 9, 11, 0.94)",
                      padding: 24,
                      borderRadius: 24,
                      borderWidth: 1,
                      borderColor: "rgba(220, 38, 38, 0.5)",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: "#dc2626",
                            fontWeight: "900",
                            fontSize: 24,
                            textTransform: "uppercase",
                          }}
                        >
                          Painel FEFO
                        </Text>
                        <Text style={{ color: "#a1a1aa", fontSize: 12 }}>
                          Primeiro a Vencer, Primeiro a Sair
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={handleLogout}
                        style={{
                          backgroundColor: "rgba(63, 63, 70, 0.6)",
                          paddingHorizontal: 14,
                          paddingVertical: 8,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: "600",
                          }}
                        >
                          Sair
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "700",
                        marginBottom: 12,
                      }}
                    >
                      Lotes em Ordem de Expedição:
                    </Text>

                    {lotesFEFO.map((item) => (
                      <View
                        key={item.id}
                        style={{
                          backgroundColor: "rgba(24, 24, 27, 0.9)",
                          padding: 16,
                          borderRadius: 14,
                          borderWidth: 1,
                          borderColor: "#3f3f46",
                          marginBottom: 12,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 6,
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontWeight: "700",
                              fontSize: 15,
                            }}
                          >
                            {item.produto}
                          </Text>
                          <Text
                            style={{
                              color: "#ef4444",
                              fontWeight: "800",
                              fontSize: 13,
                            }}
                          >
                            {item.status}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 4,
                          }}
                        >
                          <Text style={{ color: "#a1a1aa", fontSize: 13 }}>
                            Lote: {item.lote}
                          </Text>
                          <Text
                            style={{
                              color: "#facc15",
                              fontWeight: "700",
                              fontSize: 13,
                            }}
                          >
                            Validade: {item.validade}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#71717a",
                            fontSize: 12,
                            marginTop: 4,
                          }}
                        >
                          Qtd disponível: {item.quantidade}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={{ marginTop: 32, alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#71717a",
                      fontSize: 11,
                      textAlign: "center",
                    }}
                  >
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
