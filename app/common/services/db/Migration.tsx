import { SQLiteDatabase } from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const dbPath = `${FileSystem.documentDirectory}SQLite/store.db`;
  console.log('Database Path:', dbPath);

  // Criação da tabela de categorias
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon TEXT NOT NULL CHECK(icon IN (${Object.keys(Ionicons.glyphMap).map(icon => `'${icon}'`).join(', ')}))
    );
  `);

  // Criação da tabela de produtos, com uma relação com a tabela de categorias e o campo de quantidade adicionado
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT,
      favorite INTEGER NOT NULL DEFAULT 0,
      quantity INTEGER NOT NULL DEFAULT 1, -- Novo campo de quantidade
      categoryId INTEGER NOT NULL,
      FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL
    );
  `);

  // Criação da tabela de banners
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS banners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL
    );
  `);

  // Verifica se já existem categorias no banco de dados
  const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM categories');

  if (result && result.count === 0) {
    // Inserção das categorias se elas ainda não existirem
    await db.execAsync(`
      INSERT INTO categories (name, icon) VALUES 
        ('Phones', 'phone-portrait-outline'),
        ('Laptops', 'laptop-outline'),
        ('Smart Watch', 'watch-outline'),
        ('Peripherals', 'headset-outline'),
        ('Gaming', 'game-controller-outline');
    `);
    console.log('Categorias inseridas com sucesso.');
  } else {
    console.log('Categorias já existem no banco de dados.');
  }

  // Verifica se já existem banners no banco de dados
  const banners = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM banners');

  if (banners && banners.count === 0) {
    // Inserção dos banners se eles ainda não existirem
    await db.execAsync(`
      INSERT INTO banners (url) VALUES 
        ('https://images.ctfassets.net/xa93kvziwaye/18DKNrmxAVagLwLerQBaZ4/ccf63ce7ada5fc92587d09c24e8de06f/jb-au-20230915-mobile-phones-iphone-15-pro-out_carousel_desktop.jpg?fm=webp&f=top&fit=fill&w=4000&h=689'),
        ('https://images.ctfassets.net/xa93kvziwaye/18DKNrmxAVagLwLerQBaZ4/ccf63ce7ada5fc92587d09c24e8de06f/jb-au-20230915-mobile-phones-iphone-15-pro-out_carousel_desktop.jpg?fm=webp&f=top&fit=fill&w=4000&h=689'),
        ('https://images.ctfassets.net/xa93kvziwaye/18DKNrmxAVagLwLerQBaZ4/ccf63ce7ada5fc92587d09c24e8de06f/jb-au-20230915-mobile-phones-iphone-15-pro-out_carousel_desktop.jpg?fm=webp&f=top&fit=fill&w=4000&h=689');
    `);
    console.log('Banners inseridos com sucesso.');
  } else {
    console.log('Banners já existem no banco de dados.');
  }
}