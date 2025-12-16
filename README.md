🍔 FoodCode - App de Delivery com Painel Administrativo
Um aplicativo completo de delivery de comida desenvolvido em React Native com Expo, incluindo sistema de autenticação, carrinho de compras e painel administrativo profissional.


 
<div align="center">
  <img src="assets/screenshots/home-screen.png" width="200" alt="Tela Inicial"/>
  <img src="assets/screenshots/product-catalog.png" width="200" alt="Catálogo"/>
  <img src="assets/screenshots/admin-dashboard.png" width="400" alt="Dashboard Admin"/>
</div>
 
 

📱 Sobre o Projeto
O FoodCode é um aplicativo moderno de delivery de comida que oferece uma experiência completa tanto para clientes quanto para administradores. O projeto inclui um app mobile intuitivo para pedidos e um painel administrativo web-based para gestão completa do negócio.

✨ Funcionalidades Principais
👥 App do Cliente
✅ Autenticação completa (Login, Registro, Logout)
✅ Catálogo de produtos com categorias e filtros
✅ Carrinho de compras com persistência
✅ Sistema de favoritos
✅ Busca avançada de produtos
✅ Perfil do usuário editável
✅ Histórico de pedidos
✅ Interface responsiva e moderna
🔧 Painel Administrativo
✅ Dashboard com métricas em tempo real
✅ Gestão de pedidos (visualizar, alterar status, filtros)
✅ Gestão de produtos (listar, ativar/desativar, controle de estoque)
✅ Autenticação separada para admins
✅ Sidebar de navegação profissional
✅ Relatórios visuais com indicadores
✅ Sistema de notificações e alertas
✅ Interface desktop-first otimizada
🚀 Tecnologias Utilizadas
Frontend Mobile
React Native - Framework principal
Expo - Toolchain e desenvolvimento
TypeScript - Tipagem estática
React Navigation - Navegação entre telas
Context API - Gerenciamento de estado
AsyncStorage - Persistência local
Expo Vector Icons - Iconografia
Backend (Simulado)
Node.js - Runtime JavaScript
Express.js - Framework web
TypeORM - ORM para banco de dados
PostgreSQL - Banco de dados
JWT - Autenticação
bcryptjs - Criptografia de senhas


📁 Estrutura do Projeto
src/
├── app/                          # Páginas e navegação (Expo Router)
│   ├── (tabs)/                   # Navegação principal
│   │   ├── home/                 # Página inicial
│   │   ├── search/               # Busca de produtos
│   │   ├── favorites/            # Produtos favoritos
│   │   ├── cart/                 # Carrinho de compras
│   │   └── profile/              # Perfil do usuário
│   ├── admin/                    # Painel administrativo
│   │   ├── orders/               # Gestão de pedidos
│   │   ├── products/             # Gestão de produtos
│   │   ├── users/                # Gestão de usuários
│   │   ├── analytics/            # Relatórios
│   │   └── settings/             # Configurações
│   ├── login.tsx                 # Login do cliente
│   ├── admin-login.tsx           # Login do admin
│   └── order-confirmation.tsx    # Confirmação de pedido
├── components/                   # Componentes reutilizáveis
│   ├── Admin/                    # Componentes do admin
│   ├── Box.tsx                   # Layout component
│   ├── Button.tsx                # Botão customizado
│   ├── Header/                   # Cabeçalho
│   ├── Input.tsx                 # Input customizado
│   ├── ProductCard.tsx           # Card de produto
│   └── SearchBar.tsx             # Barra de busca
├── context/                      # Gerenciamento de estado
│   ├── AuthContext.tsx           # Autenticação do cliente
│   ├── AdminContext.tsx          # Autenticação do admin
│   ├── CartContext.tsx           # Carrinho de compras
│   └── AppContext.tsx            # Estado global
├── constants/                    # Constantes
│   └── theme.ts                  # Tema e cores
├── data/                         # Dados simulados
│   └── products.ts               # Produtos mockados
└── types/                        # Definições TypeScript
    └── index.ts                  # Tipos globais
🛠️ Instalação e Execução
Pré-requisitos
Node.js (versão 18+)
npm ou yarn
Expo CLI
Android Studio (para Android) ou Xcode (para iOS)
1. Clone o repositório
bash
Copiar

git clone https://github.com/seu-usuario/foodcode-app.git
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
Cliente
Email: usuario@teste.com
Senha: 123456
Administrador
Email: admin@foodcode.com
Senha: 123456
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
�� Funcionalidades do Admin
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
�� Scripts Disponíveis
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
