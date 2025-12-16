# 🍔 FoodCode - App de Delivery com Painel Administrativo

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

</div>

<div align="center">
<em>Um aplicativo completo de delivery de comida desenvolvido em React Native com Expo, incluindo sistema de autenticação, carrinho de compras e painel administrativo profissional.</em>
</div>

---

## 🎯 Demonstração

<div align="center">
  <img src="assets/screenshots/home-screen.png" width="200" alt="Tela Inicial"/>
  <img src="assets/screenshots/product-catalog.png" width="200" alt="Catálogo"/>
  <img src="assets/screenshots/admin-dashboard.png" width="400" alt="Dashboard Admin"/>
</div>

## 📱 Sobre o Projeto

O **FoodCode** é um aplicativo moderno de delivery de comida que oferece uma experiência completa tanto para clientes quanto para administradores. O projeto inclui um app mobile intuitivo para pedidos e um painel administrativo web-based para gestão completa do negócio.

## ✨ Funcionalidades Principais

### 👥 **App do Cliente**
- ✅ **Autenticação completa** (Login, Registro, Logout)
- ✅ **Catálogo de produtos** com categorias e filtros
- ✅ **Carrinho de compras** com persistência
- ✅ **Sistema de favoritos**
- ✅ **Busca avançada** de produtos
- ✅ **Perfil do usuário** editável
- ✅ **Histórico de pedidos**
- ✅ **Interface responsiva** e moderna

### 🔧 **Painel Administrativo**
- ✅ **Dashboard com métricas** em tempo real
- ✅ **Gestão de pedidos** (visualizar, alterar status, filtros)
- ✅ **Gestão de produtos** (listar, ativar/desativar, controle de estoque)
- ✅ **Autenticação separada** para admins
- ✅ **Sidebar de navegação** profissional
- ✅ **Relatórios visuais** com indicadores
- ✅ **Sistema de notificações** e alertas
- ✅ **Interface desktop-first** otimizada

## 🚀 Tecnologias Utilizadas

<div align="center">

### **Frontend Mobile**
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=flat-square&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React Navigation](https://img.shields.io/badge/React_Navigation-6C47FF?style=flat-square&logo=react&logoColor=white)

### **Backend (Simulado)**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

</div>

- **React Native** - Framework principal
- **Expo** - Toolchain e desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **Context API** - Gerenciamento de estado
- **AsyncStorage** - Persistência local
- **Expo Vector Icons** - Iconografia

rias
        └── helpers.ts

## 📁 Estrutura do Projeto

**Arquivos Principais:**
- README.md
- app.json
- package.json
- tsconfig.json

**Assets:**
- assets/images/ (ícones e imagens)

**Código Fonte (src/):**

**Páginas (app/):**
- (tabs)/ - Navegação principal do app
  - home/ - Página inicial e detalhes de produto
  - perfil/ - Perfil do usuário e favoritos
  - cart.tsx - Carrinho de compras
- admin/ - Painel administrativo
  - orders/ - Gestão de pedidos
  - products/ - Gestão de produtos
  - users/ - Gestão de usuários
- login.tsx - Login do cliente
- admin-login.tsx - Login do admin
- checkout.tsx - Finalizar pedido

**Componentes (components/):**
- Admin/ - Componentes do painel admin
- Box/ - Container de layout
- Button/ - Botão customizado
- CartItem/ - Item do carrinho
- Header/ - Cabeçalho
- ProductCard/ - Card de produto
- SearchBar/ - Barra de busca

**Estado Global (context/):**
- AuthContext.tsx - Autenticação
- CartContext.ts - Carrinho
- AdminContext.tsx - Admin
- FavoritesContext.tsx - Favoritos
- ProductsContext.tsx - Produtos

**Outros:**
- constants/ - Tema e configurações
- data/ - Dados simulados
- hooks/ - Hooks customizados
- services/ - APIs e integrações
- types/ - Tipagem TypeScript
- utils/ - Funções auxiliares

### **Diretórios Principais**
- **`src/app/`** - Páginas e rotas (Expo Router)
- **`src/components/`** - Componentes reutilizáveis
- **`src/context/`** - Gerenciamento de estado global
- **`src/data/`** - Dados simulados e mockados
- **`src/hooks/`** - Hooks customizados
- **`src/services/`** - Integrações e APIs
- **`src/types/`** - Definições TypeScript
- **`src/utils/`** - Funções utilitárias

## 🛠️ Instalação e Execução

### **Pré-requisitos**
![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-v8+-CB3837?style=flat-square&logo=npm&logoColor=white)
![Expo](https://img.shields.io/badge/Expo_CLI-Required-1B1F23?style=flat-square&logo=expo&logoColor=white)

- Node.js (versão 18+)
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### **1. Clone o repositório**
```bash
git clone https://github.com/JoaoFabris/foodcode-app.git
cd foodcode-app
2. Instale as dependências
bash
Copiar

npm install
# ou
yarn install
3. Execute o projeto
bash
Copiar

npx expo start
4. Execute no dispositivo
Android: Pressione a no terminal ou escaneie o QR Code
iOS: Pressione i no terminal ou escaneie o QR Code
Web: Pressione w no terminal
🔐 Credenciais de Teste
Tipo	Email	Senha
Cliente	usuario@teste.com	123456
Admin	admin@foodcode.com	123456
📱 Como Usar
App do Cliente
Faça login ou crie uma conta
Navegue pelas categorias de produtos
Adicione itens ao carrinho
Finalize seu pedido
Acompanhe o status na aba perfil
Painel Administrativo
Acesse via botão ⚙️ na home
Faça login com credenciais de admin
Visualize métricas no dashboard
Gerencie pedidos e produtos
Acompanhe relatórios e analytics
�� Design System
Cores Principais
Primária: #FF6B35 (Laranja vibrante)
Secundária: #2D3748 (Cinza escuro)
Sucesso: #10B981 (Verde)
Erro: #EF4444 (Vermelho)
Aviso: #F59E0B (Amarelo)
Tipografia
Títulos: System/San Francisco (iOS) | Roboto (Android)
Corpo: 14px - 16px
Pequeno: 12px
📋 Funcionalidades do Admin
Dashboard
Métricas em tempo real
Gráficos de vendas
Pedidos recentes
Indicadores de performance
Gestão de Pedidos
Lista completa de pedidos
Filtros por status e data
Alteração de status
Detalhes completos do pedido
Gestão de Produtos
Catálogo completo
Controle de estoque
Ativar/desativar produtos
Filtros por categoria
🔄 Próximas Funcionalidades
 Push notifications para pedidos
 Integração com pagamento (Stripe/PayPal)
 Chat entre cliente e loja
 Avaliações e comentários
 Programa de fidelidade
 Delivery tracking em tempo real
 API REST completa
 Testes automatizados
🤝 Como Contribuir
Fork o projeto
Crie uma branch para sua feature (git checkout -b feature/nova-feature)
Commit suas mudanças (git commit -m 'Adiciona nova feature')
Push para a branch (git push origin feature/nova-feature)
Abra um Pull Request
📝 Scripts Disponíveis
bash
Copiar

# Executar em desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar no Web
npm run web

# Build para produção
npm run build

# Limpar cache
npx expo start --clear
📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Autor
João Fabris

Desenvolvido com ❤️ como projeto de extensão universitária.


www.linkedin.com
 

github.com

📞 Suporte
Se você tiver alguma dúvida ou problema, sinta-se à vontade para:

Abrir uma issue no GitHub
Entrar em contato via LinkedIn
Enviar um email
⭐ Se este projeto foi útil para você, considere dar uma estrela!
Projeto desenvolvido durante o curso de Análise e Desenvolvimento de Sistemas
```


![GitHub repo size](https://img.shields.io/github/repo-size/JoaoFabris/foodcode-app)
![GitHub language count](https://img.shields.io/github/languages/count/JoaoFabris/foodcode-app)
![GitHub top language](https://img.shields.io/github/languages/top/JoaoFabris/foodcode-app)
![GitHub last commit](https://img.shields.io/github/last-commit/JoaoFabris/foodcode-app)
