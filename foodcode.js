// ===== FOODCODE MONGODB =====

// Coleção usuarios
db.usuarios.insertMany([
  {
    "_id": ObjectId("65a1b1c1f1d1e1f1a1b1c1d1"),
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "senha": "123456",
    "telefone": "11999887766",
    "endereco": "Rua A, 123, São Paulo",
    "tipo": "cliente",
    "favoritos": [
      ObjectId("65a1b3c3f3d3e3f3a3b3c3d2"),
      ObjectId("65a1b3c3f3d3e3f3a3b3c3d8")
    ],
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b1c1f1d1e1f1a1b1c1d2"),
    "nome": "João Santos",
    "email": "joao@email.com",
    "senha": "123456",
    "telefone": "11888776655",
    "endereco": "Av. B, 456, São Paulo",
    "tipo": "cliente",
    "favoritos": [
      ObjectId("65a1b3c3f3d3e3f3a3b3c3d1")
    ],
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b1c1f1d1e1f1a1b1c1d3"),
    "nome": "Ana Costa",
    "email": "ana@email.com",
    "senha": "123456",
    "telefone": "11777665544",
    "endereco": "Rua C, 789, São Paulo",
    "tipo": "cliente",
    "favoritos": [
      ObjectId("65a1b3c3f3d3e3f3a3b3c3d7")
    ],
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b1c1f1d1e1f1a1b1c1d4"),
    "nome": "Admin",
    "email": "admin@foodcode.com",
    "senha": "admin123",
    "tipo": "admin",
    "role": "admin",
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  }
]);

// Coleção categorias
db.categorias.insertMany([
  {
    "_id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d1"),
    "nome": "Prato do dia",
    "descricao": "Pratos especiais e sazonais do chef",
    "icone": "⭐",
    "ordem": 1,
    "ativo": true
  },
  {
    "_id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d2"),
    "nome": "Carne",
    "descricao": "Pratos à base de carne vermelha premium",
    "icone": "🥩",
    "ordem": 2,
    "ativo": true
  },
  {
    "_id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d3"),
    "nome": "Frango",
    "descricao": "Deliciosas opções com frango e aves",
    "icone": "🍗",
    "ordem": 3,
    "ativo": true
  },
  {
    "_id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d4"),
    "nome": "Frutos do Mar",
    "descricao": "Peixes e frutos do mar frescos do dia",
    "icone": "🦐",
    "ordem": 4,
    "ativo": true
  },
  {
    "_id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d5"),
    "nome": "Vegetariano",
    "descricao": "Opções vegetarianas e veganas saudáveis",
    "icone": "🥬",
    "ordem": 5,
    "ativo": true
  },
  {
    "_id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d6"),
    "nome": "Sobremesa",
    "descricao": "Doces irresistíveis para finalizar",
    "icone": "🍰",
    "ordem": 6,
    "ativo": true
  }
]);

// Coleção produtos (TODOS OS 9 PRODUTOS)
db.produtos.insertMany([
  {
    "_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d1"),
    "nome": "Mega Monster",
    "descricao": "Dois hambúrgueres 120g, bacon duplo, queijo cheddar",
    "preco": 24.90,
    "categoria": {
      "id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d1"),
      "nome": "Prato do dia"
    },
    "imagem_url": "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
    "tempo_preparo": 20,
    "ingredientes": ["Pão", "carne", "bacon", "queijo"],
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d2"),
    "nome": "X-Bacon Clássico",
    "descricao": "Pão brioche, hambúrguer 150g, bacon crocante, queijo cheddar",
    "preco": 18.90,
    "categoria": {
      "id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d2"),
      "nome": "Carne"
    },
    "imagem_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    "tempo_preparo": 15,
    "ingredientes": ["Pão", "carne", "bacon", "queijo"],
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d3"),
    "nome": "Spicy Fire",
    "descricao": "Hambúrguer temperado, queijo pepper jack, jalapeños",
    "preco": 19.90,
    "categoria": {
      "id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d2"),
      "nome": "Carne"
    },
    "imagem_url": "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
    "tempo_preparo": 15,
    "ingredientes": ["Pão", "carne", "pimenta", "queijo"],
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d4"),
    "nome": "Frango Crispy",
    "descricao": "Filé de frango empanado crocante, queijo suíço",
    "preco": 17.90,
    "categoria": {
      "id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d3"),
      "nome": "Frango"
    },
    "imagem_url": "https://images.unsplash.com/photo-1760533536738-f0965fd52354",
    "tempo_preparo": 20,
    "ingredientes": ["Frango", "queijo", "temperos"],
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d5"),
    "nome": "Chicken Wings",
    "descricao": "8 asinhas de frango temperadas com molho buffalo",
    "preco": 18.90,
    "categoria": {
      "id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d3"),
      "nome": "Frango"
    },
    "imagem_url": "https://images.unsplash.com/photo-1669742928112-19364a33b530",
    "tempo_preparo": 25,
    "ingredientes": ["Frango", "molho buffalo"],
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d6"),
    "nome": "Salmão Grelhado",
    "descricao": "Filé de salmão grelhado com temperos",
    "preco": 35.90,
    "categoria": {
      "id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d4"),
      "nome": "Frutos do Mar"
    },
    "imagem_url": "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    "tempo_preparo": 20,
    "ingredientes": ["Salmão", "temperos", "limão"],
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d7"),
    "nome": "Veggie Deluxe",
    "descricao": "Hambúrguer de grão-de-bico, queijo vegano, rúcula",
    "preco": 16.90,
    "categoria": {
      "id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d5"),
      "nome": "Vegetariano"
    },
    "imagem_url": "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2",
    "tempo_preparo": 15,
    "ingredientes": ["Grão-de-bico", "queijo vegano"],
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d8"),
    "nome": "Brownie com Sorvete",
    "descricao": "Brownie de chocolate com sorvete de baunilha",
    "preco": 14.90,
    "categoria": {
      "id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d6"),
      "nome": "Sobremesa"
    },
    "imagem_url": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    "tempo_preparo": 10,
    "ingredientes": ["Chocolate", "sorvete"],
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  },
  {
    "_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d9"),
    "nome": "Cheesecake",
    "descricao": "Cheesecake cremoso com frutas vermelhas",
    "preco": 16.90,
    "categoria": {
      "id": ObjectId("65a1b2c2f2d2e2f2a2b2c2d6"),
      "nome": "Sobremesa"
    },
    "imagem_url": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",
    "tempo_preparo": 5,
    "ingredientes": ["Cream cheese", "frutas"],
    "ativo": true,
    "created_at": new Date("2024-01-20T10:30:00.000Z")
  }
]);

// Coleção pedidos
db.pedidos.insertMany([
  {
    "_id": ObjectId("65a1b4c4f4d4e4f4a4b4c4d1"),
    "numero_pedido": "001",
    "usuario_id": ObjectId("65a1b1c1f1d1e1f1a1b1c1d1"),
    "usuario": {
      "nome": "Maria Silva",
      "telefone": "11999887766",
      "endereco": "Rua A, 123, São Paulo"
    },
    "data_pedido": new Date("2024-01-20T10:30:00.000Z"),
    "status": "entregue",
    "forma_pagamento": "pix",
    "produtos": [
      {
        "produto_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d2"),
        "nome": "X-Bacon Clássico",
        "preco_unitario": 18.90,
        "quantidade": 1,
        "subtotal": 18.90
      }
    ],
    "valor_produtos": 18.90,
    "taxa_entrega": 5.00,
    "valor_total": 23.90
  },
  {
    "_id": ObjectId("65a1b4c4f4d4e4f4a4b4c4d2"),
    "numero_pedido": "002",
    "usuario_id": ObjectId("65a1b1c1f1d1e1f1a1b1c1d2"),
    "usuario": {
      "nome": "João Santos", 
      "telefone": "11888776655",
      "endereco": "Av. B, 456, São Paulo"
    },
    "data_pedido": new Date("2024-01-20T11:00:00.000Z"),
    "status": "preparando",
    "forma_pagamento": "cartao_credito",
    "produtos": [
      {
        "produto_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d1"),
        "nome": "Mega Monster",
        "preco_unitario": 24.90,
        "quantidade": 1,
        "subtotal": 24.90
      }
    ],
    "valor_produtos": 24.90,
    "taxa_entrega": 5.00,
    "valor_total": 29.90
  },
  {
    "_id": ObjectId("65a1b4c4f4d4e4f4a4b4c4d3"),
    "numero_pedido": "003",
    "usuario_id": ObjectId("65a1b1c1f1d1e1f1a1b1c1d3"),
    "usuario": {
      "nome": "Ana Costa",
      "telefone": "11777665544", 
      "endereco": "Rua C, 789, São Paulo"
    },
    "data_pedido": new Date("2024-01-20T12:00:00.000Z"),
    "status": "pendente", 
    "forma_pagamento": "dinheiro",
    "produtos": [
      {
        "produto_id": ObjectId("65a1b3c3f3d3e3f3a3b3c3d7"),
        "nome": "Veggie Deluxe",
        "preco_unitario": 16.90,
        "quantidade": 1,
        "subtotal": 16.90
      }
    ],
    "valor_produtos": 16.90,
    "taxa_entrega": 5.00,
    "valor_total": 21.90
  }
]);

// Consultas de teste
print("=== DADOS INSERIDOS COM SUCESSO ===");
print("Total de usuários: " + db.usuarios.count());
print("Total de categorias: " + db.categorias.count());
print("Total de produtos: " + db.produtos.count());
print("Total de pedidos: " + db.pedidos.count());

// Exemplos de consultas
print("\n=== CONSULTAS DE EXEMPLO ===");
print("Produtos da categoria Carne:");
db.produtos.find({"categoria.nome": "Carne"}).forEach(printjson);

print("Pedidos entregues:");
db.pedidos.find({"status": "entregue"}).forEach(printjson);