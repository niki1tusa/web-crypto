const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Определяем пути
const emailsDir = path.join(__dirname, '../emails');
const distDir = path.join(__dirname, '../emails/dist');

// Удаляем директорию dist, если она существует
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

// Создаем директорию dist
fs.mkdirSync(distDir, { recursive: true });

// Находим все MJML файлы, кроме начинающихся с _
const files = fs.readdirSync(emailsDir)
  .filter(file => file.endsWith('.mjml') && !file.startsWith('_'));

if (files.length === 0) {
  process.exit(0);
}

// Компилируем каждый файл
files.forEach(file => {
  const inputPath = path.join(emailsDir, file);
  const outputPath = path.join(distDir, file.replace('.mjml', '.html'));
  
  try {
    execSync(`npx mjml "${inputPath}" -o "${outputPath}"`, { stdio: 'inherit' });
  } catch (error) {
    process.exit(1);
  }
});

