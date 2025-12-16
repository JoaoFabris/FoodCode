FoodCode - App de Delivery
Um aplicativo de delivery de comida desenvolvido em React Native com Expo, incluindo painel administrativo.

📱 Sobre o Projeto
App de delivery de comida com interface para clientes e painel administrativo para gestão. Desenvolvido como projeto de extensão universitária.

⚡ Funcionalidades
App Cliente
Login e cadastro
Catálogo de produtos
Carrinho de compras
Sistema de favoritos
Busca de produtos
Perfil do usuário
Painel Admin
Dashboard com estatísticas
Gestão de pedidos
Gestão de produtos
Controle de usuários
Login separado para admin
��️ Tecnologias
React Native - Framework mobile
Expo - Plataforma de desenvolvimento
TypeScript - Linguagem
Expo Router - Navegação
Context API - Estado global
AsyncStorage - Armazenamento local
📁 Estrutura
src/
├── app/                    # Páginas
│   ├── (tabs)/            # App principal
│   │   ├── home/          # Início e produtos
│   │   ├── perfil/        # Perfil e favoritos
│   │   └── cart.tsx       # Carrinho
│   ├── admin/             # Painel admin
│   ├── login.tsx          # Login cliente
│   └── admin-login.tsx    # Login admin
├── components/            # Componentes
├── context/               # Estado global
├── data/                  # Dados simulados
└── constants/             # Configurações
🚀 Como Executar
Pré-requisitos
Node.js 18+
Expo CLI
Instalação
bash
Copiar

# Clone o projeto
git clone https://github.com/JoaoFabris/foodcode-app.git
cd foodcode-app

# Instale dependências
npm install

# Execute o projeto
npx expo start
Executar no dispositivo
Android: Pressione a ou escaneie QR Code
iOS: Pressione i ou escaneie QR Code
Web: Pressione w
�� Credenciais de Teste
Usuário	Email	Senha
Cliente	usuario@teste.com	123456
Admin	admin@foodcode.com	123456
📖 Como Usar
Cliente
Faça login ou crie conta
Navegue pelos produtos
Adicione ao carrinho
Finalize pedido
Admin
Clique em ⚙️ na home
Login com credenciais admin
Acesse dashboard e gestão
🎨 Tema
Cor Principal: #FF6B35
Cor Secundária: #2D3748
Sucesso: #10B981
Erro: #EF4444
�� Scripts
bash
Copiar

npm start          # Executar desenvolvimento
npm run android    # Executar no Android
npm run ios        # Executar no iOS
npm run web        # Executar no Web
👨‍💻 Autor
João Fabris

Projeto de extensão universitária - Análise e Desenvolvimento de Sistemas


www.linkedin.com
 

github.com
