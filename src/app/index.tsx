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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados do Painel FEFO
  const [activeTab, setActiveTab] = useState<"fefo" | "produtos" | "operador">(
    "fefo",
  );
  const [searchCode, setSearchCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Base de dados mockada dos produtos
  const productsData: Record<string, any> = {
    "110440": {
      code: "110440",
      name: "Coca-Cola 350ml Lata",
      category: "Refrigerantes",
      lotes: [
        {
          lote: "L-20260901",
          validade: "15/10/2026",
          status: "CRÍTICO (Prioridade 1)",
          quantidade: "120 CX",
        },
        {
          lote: "L-20260910",
          validade: "05/11/2026",
          status: "ATENÇÃO (Prioridade 2)",
          quantidade: "250 CX",
        },
        {
          lote: "L-20260920",
          validade: "20/12/2026",
          status: "NORMAL (Prioridade 3)",
          quantidade: "400 CX",
        },
      ],
    },
    "110882": {
      code: "110882",
      name: "Coca-Cola Zero 350ml Lata",
      category: "Refrigerantes Zero",
      lotes: [
        {
          lote: "L-20260815",
          validade: "10/10/2026",
          status: "CRÍTICO (Prioridade 1)",
          quantidade: "85 CX",
        },
        {
          lote: "L-20260905",
          validade: "01/12/2026",
          status: "NORMAL (Prioridade 2)",
          quantidade: "180 CX",
        },
      ],
    },
    "115001": {
      code: "115001",
      name: "Coca-Cola 2L PET",
      category: "Refrigerantes Family",
      lotes: [
        {
          lote: "L-20260730",
          validade: "02/10/2026",
          status: "CRÍTICO (Prioridade 1)",
          quantidade: "60 CX",
        },
        {
          lote: "L-20260822",
          validade: "18/11/2026",
          status: "ATENÇÃO (Prioridade 2)",
          quantidade: "310 CX",
        },
      ],
    },
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedProduct(null);
    setSearchCode("");
  };

  const handleSearch = (codeToSearch?: string) => {
    const query = (codeToSearch || searchCode).trim();
    if (productsData[query]) {
      setSelectedProduct(productsData[query]);
    } else {
      setSelectedProduct(null);
      alert("Produto não encontrado com este código.");
    }
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
      {!isLoggedIn ? (
        /* --- TELA DE LOGIN COM MOLDURA E RETRO-ILUMINAÇÃO COCA-COLA --- */
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
              backgroundColor: "rgba(0, 0, 0, 0.8)",
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
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </SafeAreaView>
          </View>
        </ImageBackground>
      ) : (
        /* --- PAINEL PRINCIPAL DO OPERADOR (IGUAL À IMAGEM) --- */
        <SafeAreaView
          style={{ flex: 1, width: "100%", backgroundColor: "#09090b" }}
        >
          {/* BARRA SUPERIOR DO OPERADOR */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 12,
              backgroundColor: "#121214",
              borderBottomWidth: 1,
              borderBottomColor: "#27272a",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "#dc2626",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}
                >
                  12
                </Text>
              </View>
              <View>
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}
                >
                  Op. 123456
                </Text>
                <Text style={{ color: "#71717a", fontSize: 11 }}>
                  Turno A - CD Nova Iguaçu
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleLogout}
              style={{
                backgroundColor: "#18181b",
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: "#27272a",
              }}
            >
              <Text
                style={{ color: "#ef4444", fontSize: 12, fontWeight: "700" }}
              >
                SAIR
              </Text>
            </TouchableOpacity>
          </View>

          {/* MENUS DAS ABAS */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#121214",
              borderBottomWidth: 1,
              borderBottomColor: "#27272a",
            }}
          >
            <TouchableOpacity
              onPress={() => setActiveTab("fefo")}
              style={{
                flex: 1,
                paddingVertical: 14,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor:
                  activeTab === "fefo" ? "#dc2626" : "transparent",
              }}
            >
              <Text
                style={{
                  color: activeTab === "fefo" ? "#fff" : "#a1a1aa",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                🔍 Consulta FEFO
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("produtos")}
              style={{
                flex: 1,
                paddingVertical: 14,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor:
                  activeTab === "produtos" ? "#dc2626" : "transparent",
              }}
            >
              <Text
                style={{
                  color: activeTab === "produtos" ? "#fff" : "#a1a1aa",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                📦 Produtos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("operador")}
              style={{
                flex: 1,
                paddingVertical: 14,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor:
                  activeTab === "operador" ? "#dc2626" : "transparent",
              }}
            >
              <Text
                style={{
                  color: activeTab === "operador" ? "#fff" : "#a1a1aa",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                👨‍💼 Operador
              </Text>
            </TouchableOpacity>
          </View>

          {/* CONTEÚDO PRINCIPAL DA ABA SELECIONADA */}
          <ScrollView
            contentContainerStyle={{ padding: 20, alignItems: "center" }}
          >
            {activeTab === "fefo" && (
              <View style={{ width: "100%", maxWidth: 900 }}>
                {/* CARD DE CONSULTA */}
                <View
                  style={{
                    backgroundColor: "#121214",
                    padding: 20,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: "#27272a",
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#a1a1aa",
                      fontSize: 11,
                      fontWeight: "700",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    CONSULTAR CÓDIGO DO PRODUTO
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      marginBottom: 12,
                    }}
                  >
                    <TextInput
                      value={searchCode}
                      onChangeText={setSearchCode}
                      placeholder="Ex: 110440..."
                      placeholderTextColor="#52525b"
                      keyboardType="numeric"
                      style={{
                        flex: 1,
                        backgroundColor: "#09090b",
                        color: "#fff",
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "#27272a",
                        fontSize: 14,
                        marginRight: 10,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => handleSearch()}
                      style={{
                        backgroundColor: "#dc2626",
                        paddingHorizontal: 24,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      >
                        BUSCAR
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* ATALHOS RÁPIDOS */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "#71717a",
                        fontSize: 11,
                        marginRight: 10,
                      }}
                    >
                      Atalhos de teste rápido:
                    </Text>
                    {["110440", "110882", "115001"].map((code) => (
                      <TouchableOpacity
                        key={code}
                        onPress={() => {
                          setSearchCode(code);
                          handleSearch(code);
                        }}
                        style={{
                          backgroundColor: "rgba(220, 38, 38, 0.15)",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 8,
                          marginRight: 8,
                          borderWidth: 1,
                          borderColor: "rgba(220, 38, 38, 0.3)",
                        }}
                      >
                        <Text
                          style={{
                            color: "#ef4444",
                            fontSize: 11,
                            fontWeight: "bold",
                          }}
                        >
                          #{code}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* RESULTADO DA CONSULTA */}
                {!selectedProduct ? (
                  <View
                    style={{
                      backgroundColor: "#121214",
                      padding: 40,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: "#27272a",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 16,
                        marginBottom: 6,
                      }}
                    >
                      Nenhum produto selecionado
                    </Text>
                    <Text
                      style={{
                        color: "#71717a",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      Insira o código do produto ou toque em um dos atalhos
                      acima para visualizar os lotes ordenados por validade.
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: "#121214",
                      padding: 20,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: "#27272a",
                    }}
                  >
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#27272a",
                        paddingBottom: 12,
                        marginBottom: 16,
                      }}
                    >
                      <Text
                        style={{
                          color: "#dc2626",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {selectedProduct.name}
                      </Text>
                      <Text style={{ color: "#71717a", fontSize: 12 }}>
                        Código: #{selectedProduct.code} •{" "}
                        {selectedProduct.category}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 14,
                        marginBottom: 12,
                      }}
                    >
                      Lotes Organizados por Ordem de Expedição (FEFO):
                    </Text>

                    {selectedProduct.lotes.map((lote: any, index: number) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor: "#18181b",
                          padding: 14,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: "#27272a",
                          marginBottom: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: 14,
                            }}
                          >
                            {lote.lote}
                          </Text>
                          <Text style={{ color: "#71717a", fontSize: 12 }}>
                            Quantidade: {lote.quantidade}
                          </Text>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                          <Text
                            style={{
                              color: "#ef4444",
                              fontWeight: "bold",
                              fontSize: 12,
                              marginBottom: 2,
                            }}
                          >
                            {lote.status}
                          </Text>
                          <Text
                            style={{
                              color: "#facc15",
                              fontSize: 12,
                              fontWeight: "600",
                            }}
                          >
                            Validade: {lote.validade}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}

            {activeTab === "produtos" && (
              <View
                style={{
                  width: "100%",
                  maxWidth: 900,
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Catálogo de Produtos Cadastrados
                </Text>
                <Text style={{ color: "#71717a", fontSize: 12, marginTop: 4 }}>
                  Selecione um código na aba Consulta FEFO.
                </Text>
              </View>
            )}

            {activeTab === "operador" && (
              <View
                style={{
                  width: "100%",
                  maxWidth: 900,
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Dados do Operador Ativo
                </Text>
                <Text style={{ color: "#71717a", fontSize: 12, marginTop: 4 }}>
                  Operador: 123456 • CD Nova Iguaçu
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}
