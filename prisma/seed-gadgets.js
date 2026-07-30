import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateProducts = () => {
  const products = [];

  const brands = {
    Phones: ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus'],
    Laptops: ['Apple', 'Dell', 'HP', 'Asus', 'Lenovo'],
    Tablets: ['Apple', 'Samsung', 'Xiaomi'],
    Accessories: ['Anker', 'Sony', 'Bose', 'Logitech'],
  };

  const images = [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
  ];

  // Phones
  for (let i = 1; i <= 30; i++) {
    const brand = brands.Phones[i % brands.Phones.length];
    products.push({
      name: `${brand} Smartphone Pro ${i}`,
      brand: brand,
      company: brand,
      category: brand === 'Apple' ? 'iPhone' : 'Phones',
      purchasePrice: 60000 + (i * 1000),
      sellingPrice: 70000 + (i * 1200),
      stock: Math.floor(Math.random() * 50) + 5,
      warranty: '1 Year',
      image: images[i % images.length],
      status: 'In Stock'
    });
  }

  // Laptops
  for (let i = 1; i <= 25; i++) {
    const brand = brands.Laptops[i % brands.Laptops.length];
    products.push({
      name: `${brand} Ultrabook X${i}`,
      brand: brand,
      company: brand,
      category: brand === 'Apple' ? 'MacBook' : (i % 2 === 0 ? 'Gaming Laptops' : 'Ultrabooks'),
      purchasePrice: 90000 + (i * 2000),
      sellingPrice: 110000 + (i * 2500),
      stock: Math.floor(Math.random() * 30) + 2,
      warranty: '2 Years',
      image: images[(i + 2) % images.length],
      status: 'In Stock'
    });
  }

  // Tablets
  for (let i = 1; i <= 15; i++) {
    const brand = brands.Tablets[i % brands.Tablets.length];
    products.push({
      name: `${brand} Pad ${i}th Gen`,
      brand: brand,
      company: brand,
      category: brand === 'Apple' ? 'iPad' : (brand === 'Samsung' ? 'Samsung Tab' : 'Xiaomi Pad'),
      purchasePrice: 40000 + (i * 500),
      sellingPrice: 48000 + (i * 600),
      stock: Math.floor(Math.random() * 40) + 10,
      warranty: '1 Year',
      image: images[(i + 4) % images.length],
      status: 'In Stock'
    });
  }

  // Smartwatches & Accessories
  for (let i = 1; i <= 20; i++) {
    const brand = brands.Accessories[i % brands.Accessories.length];
    const isWatch = i % 3 === 0;
    products.push({
      name: isWatch ? `${brand} Smartwatch Series ${i}` : `${brand} Noise Cancelling Headphones ${i}`,
      brand: brand,
      company: brand,
      category: isWatch ? 'Smartwatches' : 'Headphones',
      purchasePrice: 10000 + (i * 200),
      sellingPrice: 15000 + (i * 300),
      stock: Math.floor(Math.random() * 100) + 20,
      warranty: '6 Months',
      image: images[(i + 1) % images.length],
      status: 'In Stock'
    });
  }

  // Desktop & Components
  for (let i = 1; i <= 15; i++) {
    const isMac = i % 4 === 0;
    products.push({
      name: isMac ? `Mac Studio M${i}` : `Custom Gaming Rig ${i}`,
      brand: isMac ? 'Apple' : 'Custom',
      company: isMac ? 'Apple' : 'LocalBuild',
      category: isMac ? 'Mac Studio' : 'Custom PC',
      purchasePrice: 120000 + (i * 5000),
      sellingPrice: 150000 + (i * 6000),
      stock: Math.floor(Math.random() * 10) + 1,
      warranty: '3 Years',
      image: images[(i + 3) % images.length],
      status: 'In Stock'
    });
  }

  return products;
};

async function main() {
  console.log('Seeding gadget products...');
  const products = generateProducts();
  
  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
  
  console.log(`Successfully inserted ${products.length} products!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
