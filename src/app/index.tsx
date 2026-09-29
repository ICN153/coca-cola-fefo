import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StatusBar, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

// Banco de Dados Simulado
const initialProducts = {
  "110440": {
    name: "Coca-Cola Original 2L (Fardo c/ 6)",
    category: "Refrigerantes PET",
    sku: "CC-PET-2L-06",
    lots: [
      { id: "L-201", validity: "2026-10-05", quantity: 140, location: "Rua A - Bloco 02 - Nível 1" },
      { id: "L-202", validity: "2026-10-18", quantity: 210, location: "Rua A - Bloco 02 - Nível 2" },
      { id: "L-203", validity: "2026-11-02", quantity: 95,  location: "Rua B - Bloco 01 - Nível 1" },
    ]
  },
  "110882": {
    name: "Coca-Cola Sem Açúcar 350ml (Lata c/ 12)",
    category: "Refrigerantes Lata",
    sku: "CC-ZERO-350-12",
    lots: [
      { id: "L-108", validity: "2026-09-30", quantity: 80,  location: "Rua C - Bloco 05 - Nível 1" },
      { id: "L-109", validity: "2026-10-12", quantity: 300, location: "Rua C - Bloco 05 - Nível 2" }
    ]
  },
  "115001": {
    name: "Fanta Laranja 1.5L (Fardo c/ 6)",
    category: "Refrigerantes PET",
    sku: "FL-PET-15-06",
    lots: [
      { id: "L-301", validity: "2026-11-15", quantity: 120, location: "Rua D - Bloco 01 - Nível 1" }
    ]
  }
};

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [matriculaInput, setMatriculaInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'consulta' | 'lotes' | 'perfil'>('consulta');
  
  const [searchCode, setSearchCode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products] = useState<any>(initialProducts);

  const handleLogin = () => {
    if (!matriculaInput.trim()) {
      alert('Por favor, informe a matrícula do colaborador.');
      return;
    }
    setUser({
      matricula: matriculaInput,
      name: `Op. ${matriculaInput}`,
      shift: 'Turno A - CD Nova Iguaçu'
    });
  };

  const handleSearch = (codeToSearch?: string) => {
    const code = (codeToSearch || searchCode).trim();
    if (!code) {
      alert('Digite o código do produto.');
      return;
    }

    if (products[code]) {
      const prod = products[code];
      const sortedLots = [...prod.lots].sort((a: any, b: any) => 
        new Date(a.validity).getTime() - new Date(b.validity).getTime()
      );
      setSelectedProduct({ ...prod, code, sortedLots });
    } else {
      alert(`Produto com código "${code}" não encontrado.`);
      setSelectedProduct(null);
    }
  };

  const getDaysUntil = (dateStr: string) => {
    const diffTime = new Date(dateStr).getTime() - new Date().getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // ==========================================
  // TELA DE LOGIN PROFISSIONAL (GRADIENTE PRETO E VERMELHO)
  // ==========================================
  if (!user) {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
        
        {/* Fundo com efeito de gradiente */}
        <View style={styles.gradientTopBg} />
        
        <View style={styles.loginCard}>
          {/* Header da Marca */}
          <View style={styles.brandHeader}>
            <View style={styles.cocaBadge}>
              <Text style={styles.cocaBadgeText}>Coca-Cola</Text>
            </View>
            <Text style={styles.systemSubTitle}>ANDINA LOGÍSTICA</Text>
          </View>

          <Text style={styles.loginTitle}>Controle de Validades FEFO</Text>
          <Text style={styles.loginDesc}>Acesse o terminal do operador para consulta de lotes e estoque.</Text>

          {/* Form */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>MATRÍCULA DO OPERADOR</Text>
            <TextInput
              value={matriculaInput}
              onChangeText={setMatriculaInput}
              placeholder="Ex: 108420"
              placeholderTextColor="#555"
              keyboardType="number-pad"
              style={styles.darkInput}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>SENHA DE ACESSO</Text>
            <TextInput
              value={passwordInput}
              onChangeText={setPasswordInput}
              placeholder="••••••••"
              placeholderTextColor="#555"
              secureTextEntry
              style={styles.darkInput}
            />
          </View>

          <TouchableOpacity style={styles.btnRedGradient} onPress={handleLogin}>
            <Text style={styles.btnRedText}>ENTRAR NO SISTEMA</Text>
          </TouchableOpacity>

          <View style={styles.loginFooter}>
            <Text style={styles.footerText}>Suporte WMS / FEFO • v2.4.0</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // TELA PRINCIPAL COM MENUS E DESIGN CORPORATIVO
  // ==========================================
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0B" />

      {/* Top Bar / Header Corporativo */}
      <View style={styles.topHeader}>
        <View style={styles.topHeaderContent}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{user.matricula.slice(0, 2)}</Text>
            </View>
            <View>
              <Text style={styles.userMatricula}>{user.name}</Text>
              <Text style={styles.userShift}>{user.shift}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btnExit} onPress={() => setUser(null)}>
            <Text style={styles.btnExitText}>SAIR</Text>
          </TouchableOpacity>
        </View>

        {/* Menu de Abas */}
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'consulta' && styles.tabItemActive]}
            onPress={() => setActiveTab('consulta')}
          >
            <Text style={[styles.tabText, activeTab === 'consulta' && styles.tabTextActive]}>
              🔍 Consulta FEFO
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'lotes' && styles.tabItemActive]}
            onPress={() => setActiveTab('lotes')}
          >
            <Text style={[styles.tabText, activeTab === 'lotes' && styles.tabTextActive]}>
              📦 Produtos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'perfil' && styles.tabItemActive]}
            onPress={() => setActiveTab('perfil')}
          >
            <Text style={[styles.tabText, activeTab === 'perfil' && styles.tabTextActive]}>
              👤 Operador
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTEÚDO DA ABA CONSULTA */}
      {activeTab === 'consulta' && (
        <ScrollView style={styles.mainContent}>
          {/* Caixa de Busca com Estilo Dark Red */}
          <View style={styles.searchCard}>
            <Text style={styles.searchCardTitle}>CONSULTAR CÓDIGO DO PRODUTO</Text>
            <View style={styles.searchRow}>
              <TextInput
                value={searchCode}
                onChangeText={setSearchCode}
                placeholder="Ex: 110440..."
                placeholderTextColor="#666"
                keyboardType="number-pad"
                style={styles.searchInputDark}
              />
              <TouchableOpacity style={styles.btnSearchRed} onPress={() => handleSearch()}>
                <Text style={styles.btnSearchRedText}>BUSCAR</Text>
              </TouchableOpacity>
            </View>

            {/* Chips Rápidos */}
            <Text style={styles.quickLabel}>Atalhos de teste rápido:</Text>
            <View style={styles.chipsRow}>
              {Object.keys(products).map((code) => (
                <TouchableOpacity
                  key={code}
                  style={styles.chipDark}
                  onPress={() => {
                    setSearchCode(code);
                    handleSearch(code);
                  }}
                >
                  <Text style={styles.chipDarkText}>#{code}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Resultado da Consulta */}
          {selectedProduct ? (
            <View style={{ marginBottom: 40 }}>
              {/* Informações do Produto */}
              <View style={styles.productBanner}>
                <View style={styles.productBannerHeader}>
                  <Text style={styles.productSku}>{selectedProduct.sku}</Text>
                  <Text style={styles.productCodeBadge}>COD: {selectedProduct.code}</Text>
                </View>
                <Text style={styles.productTitle}>{selectedProduct.name}</Text>
                <Text style={styles.productCategory}>{selectedProduct.category}</Text>
              </View>

              <Text style={styles.sectionHeader}>PRIORIDADE DE RETIRADA (ORDEM FEFO)</Text>

              {selectedProduct.sortedLots.map((lot: any, index: number) => {
                const daysLeft = getDaysUntil(lot.validity);
                const isFirst = index === 0;

                return (
                  <View 
                    key={lot.id} 
                    style={[styles.lotCardDark, isFirst && styles.lotCardDarkHighlight]}
                  >
                    {isFirst && (
                      <View style={styles.fefoBadgeRed}>
                        <Text style={styles.fefoBadgeText}>★ 1ª PRIORIDADE DE SAÍDA (FEFO)</Text>
                      </View>
                    )}

                    <View style={styles.lotRowTop}>
                      <View>
                        <Text style={styles.lotLabel}>CÓDIGO DO LOTE</Text>
                        <Text style={styles.lotValueId}>{lot.id}</Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.lotLabel}>DATA DE VALIDADE</Text>
                        <Text style={styles.lotValueDate}>
                          {lot.validity.split('-').reverse().join('/')}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.lotDivider} />

                    <View style={styles.lotRowBottom}>
                      <View>
                        <Text style={styles.lotLabel}>ENDEREÇAMENTO NO GALPÃO</Text>
                        <Text style={styles.lotLocationText}>{lot.location}</Text>
                      </View>
                      <View style={styles.qtyContainer}>
                        <Text style={styles.qtyNumber}>{lot.quantity}</Text>
                        <Text style={styles.qtyUnit}>cx/fardos</Text>
                      </View>
                    </View>

                    <View style={styles.daysBadgeRow}>
                      <Text style={[
                        styles.daysText, 
                        daysLeft < 30 ? styles.daysAlertRed : styles.daysOkGreen
                      ]}>
                        ⏳ Vence em {daysLeft} dias
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Nenhum produto selecionado</Text>
              <Text style={styles.emptySub}>
                Insira o código do produto ou toque em um dos atalhos acima para visualizar os lotes ordenados por validade.
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* CONTEÚDO DA ABA PRODUTOS */}
      {activeTab === 'lotes' && (
        <ScrollView style={styles.mainContent}>
          <Text style={styles.sectionHeader}>CATÁLOGO DE PRODUTOS CADASTRADOS</Text>
          {Object.keys(products).map((code) => {
            const item = products[code];
            return (
              <TouchableOpacity 
                key={code} 
                style={styles.catalogCard}
                onPress={() => {
                  setActiveTab('consulta');
                  setSearchCode(code);
                  handleSearch(code);
                }}
              >
                <Text style={styles.catalogCode}>CÓDIGO #{code}</Text>
                <Text style={styles.catalogName}>{item.name}</Text>
                <Text style={styles.catalogSub}>{item.category} • {item.lots.length} Lote(s) em estoque</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* CONTEÚDO DA ABA PERFIL */}
      {activeTab === 'perfil' && (
        <View style={styles.mainContent}>
          <View style={styles.profileCard}>
            <View style={styles.profileAvatarLarge}>
              <Text style={styles.profileAvatarText}>{user.matricula.slice(0, 2)}</Text>
            </View>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileRole}>Operador de Empilhadeira / Logística</Text>
            <Text style={styles.profileDetail}>{user.shift}</Text>

            <TouchableOpacity style={styles.btnLogoutFull} onPress={() => setUser(null)}>
              <Text style={styles.btnLogoutFullText}>ENCERRAR SESSÃO</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

// ==========================================
// ESTILOS: PRETO, CINZA ESCURO E VERMELHO COCA-COLA
// ==========================================
const styles = StyleSheet.create({
  // Telas e Containers Base
  loginContainer: { flex: 1, backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center' },
  appContainer: { flex: 1, backgroundColor: '#121212' },
  
  // Gradiente Visual Fake (Preto para Vermelho Escuro)
  gradientTopBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#8B0000',
    opacity: 0.35,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },

  // Login Card
  loginCard: {
    backgroundColor: '#1A1A1A',
    width: width * 0.88,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    elevation: 10,
    shadowColor: '#F40009',
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  brandHeader: { alignItems: 'center', marginBottom: 16 },
  cocaBadge: {
    backgroundColor: '#F40009',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cocaBadgeText: { color: '#FFF', fontWeight: '900', fontSize: 20, letterSpacing: 1 },
  systemSubTitle: { color: '#888', fontSize: 10, fontWeight: 'bold', marginTop: 6, letterSpacing: 2 },
  loginTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  loginDesc: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 4, marginBottom: 20 },
  
  inputGroup: { marginBottom: 14 },
  inputLabel: { color: '#AAA', fontSize: 10, fontWeight: 'bold', marginBottom: 6, letterSpacing: 1 },
  darkInput: {
    backgroundColor: '#0D0D0D',
    borderRadius: 12,
    padding: 14,
    color: '#FFF',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  btnRedGradient: {
    backgroundColor: '#F40009',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FF2A30',
  },
  btnRedText: { color: '#FFF', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  loginFooter: { marginTop: 20, alignItems: 'center' },
  footerText: { color: '#555', fontSize: 10 },

  // Top Header e Menu
  topHeader: {
    backgroundColor: '#1A1A1A',
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  topHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F40009',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userAvatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  userMatricula: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  userShift: { color: '#888', fontSize: 10 },
  btnExit: { backgroundColor: '#262626', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnExitText: { color: '#F40009', fontWeight: 'bold', fontSize: 11 },

  // Tab Bar
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#262626' },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabItemActive: { borderBottomWidth: 2, borderBottomColor: '#F40009', backgroundColor: '#222' },
  tabText: { color: '#777', fontSize: 12, fontWeight: 'bold' },
  tabTextActive: { color: '#FFF' },

  // Conteúdo Principal
  mainContent: { flex: 1, padding: 16 },

  // Busca Dark
  searchCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    marginBottom: 20,
  },
  searchCardTitle: { color: '#888', fontSize: 10, fontWeight: 'bold', marginBottom: 10, letterSpacing: 1 },
  searchRow: { flexDirection: 'row', gap: 10 },
  searchInputDark: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    borderRadius: 10,
    paddingHorizontal: 14,
    color: '#FFF',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#333',
  },
  btnSearchRed: { backgroundColor: '#F40009', borderRadius: 10, paddingHorizontal: 18, justifyContent: 'center' },
  btnSearchRedText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  quickLabel: { color: '#666', fontSize: 10, marginTop: 12, marginBottom: 8 },
  chipsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chipDark: { backgroundColor: '#262626', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  chipDarkText: { color: '#F40009', fontWeight: 'bold', fontSize: 11 },

  // Banner do Produto
  productBanner: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F40009',
    marginBottom: 16,
  },
  productBannerHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  productSku: { color: '#888', fontSize: 10, fontWeight: 'bold' },
  productCodeBadge: { color: '#F40009', fontSize: 10, fontWeight: 'bold' },
  productTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  productCategory: { color: '#AAA', fontSize: 12, marginTop: 2 },

  sectionHeader: { color: '#888', fontSize: 11, fontWeight: 'bold', marginBottom: 12, letterSpacing: 1 },

  // Cards dos Lotes FEFO
  lotCardDark: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  lotCardDarkHighlight: {
    borderColor: '#F40009',
    backgroundColor: '#221515',
  },
  fefoBadgeRed: {
    backgroundColor: '#F40009',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  fefoBadgeText: { color: '#FFF', fontSize: 9, fontWeight: 'bold', letterSpacing: 1 },
  lotRowTop: { flexDirection: 'row', justifyContent: 'space-between' },
  lotLabel: { color: '#777', fontSize: 9, fontWeight: 'bold', marginBottom: 2 },
  lotValueId: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  lotValueDate: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  lotDivider: { height: 1, backgroundColor: '#2A2A2A', marginVertical: 10 },
  lotRowBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lotLocationText: { color: '#FF4D4D', fontWeight: 'bold', fontSize: 13 },
  qtyContainer: { alignItems: 'flex-end' },
  qtyNumber: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  qtyUnit: { color: '#777', fontSize: 9 },
  daysBadgeRow: { marginTop: 10 },
  daysText: { fontSize: 11, fontWeight: 'bold' },
  daysAlertRed: { color: '#FF4D4D' },
  daysOkGreen: { color: '#4CAF50' },

  // Empty State & Outros
  emptyCard: { backgroundColor: '#1A1A1A', padding: 24, borderRadius: 16, alignItems: 'center', marginTop: 10 },
  emptyTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginBottom: 6 },
  emptySub: { color: '#666', textAlign: 'center', fontSize: 12 },

  catalogCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  catalogCode: { color: '#F40009', fontSize: 10, fontWeight: 'bold' },
  catalogName: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginTop: 2 },
  catalogSub: { color: '#777', fontSize: 11, marginTop: 4 },

  profileCard: { backgroundColor: '#1A1A1A', borderRadius: 20, padding: 24, alignItems: 'center', marginTop: 20 },
  profileAvatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F40009',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileAvatarText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  profileName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  profileRole: { color: '#888', fontSize: 12, marginTop: 2 },
  profileDetail: { color: '#F40009', fontSize: 12, fontWeight: 'bold', marginTop: 8 },
  btnLogoutFull: {
    backgroundColor: '#2A1010',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#551010',
  },
  btnLogoutFullText: { color: '#FF4D4D', fontWeight: 'bold', fontSize: 12 },
});