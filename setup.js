// Utilitário para configuração inicial do projeto
// Executar com: node setup.js

const fs = require('fs');
const path = require('path');
const https = require('https');

// Diretórios necessários
const directories = [
  'assets',
  'assets/models',
  'assets/planet-markers',
  'targets',
  'mindar'
];

// Função para criar diretórios
function createDirectories() {
  console.log('Criando estrutura de diretórios...');
  
  directories.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✓ Diretório criado: ${dir}`);
    } else {
      console.log(`→ Diretório já existe: ${dir}`);
    }
  });
}

// Função para baixar imagens de exemplo de planetas
function downloadSampleMarkers() {
  console.log('\nBaixando imagens de exemplo para marcadores...');
  
  const sampleImages = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/800px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
      filename: 'assets/planet-markers/jupiter-sample.jpg'
    }
  ];
  
  sampleImages.forEach(image => {
    const filePath = path.join(__dirname, image.filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(image.url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Baixado: ${image.filename}`);
      });
    }).on('error', err => {
      fs.unlink(filePath);
      console.error(`✗ Erro ao baixar ${image.filename}:`, err.message);
    });
  });
}

// Função para criar um README com instruções
function createSetupReadme() {
  console.log('\nCriando arquivo de instruções...');
  
  const readmeContent = `# Configuração do Projeto Solar AR

Este projeto foi configurado com as pastas necessárias para o sistema AR de planetas.

## Próximos Passos

1. **Preparar os marcadores**:
   - Tire fotos claras dos planetas de isopor
   - Coloque as fotos na pasta \`assets/planet-markers/\`
   - Use a ferramenta \`generate-mind-file.html\` para criar o arquivo .mind

2. **Adicionar modelos 3D**:
   - Baixe modelos 3D de planetas em formato .glb
   - Coloque-os na pasta \`assets/models/\`

3. **Testar a aplicação**:
   - Execute a página \`test-marker.html\` para verificar se a detecção AR funciona
   - Se tudo estiver OK, teste a página principal \`index.html\`

Para mais detalhes, consulte o guia completo em \`guide.html\`.
`;

  fs.writeFileSync(path.join(__dirname, 'SETUP.md'), readmeContent);
  console.log('✓ Arquivo SETUP.md criado com instruções');
}

// Função para verificar a versão do Node.js
function checkNodeVersion() {
  const nodeVersion = process.version;
  console.log(`Versão do Node.js: ${nodeVersion}`);
  
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);
  if (majorVersion < 14) {
    console.warn('⚠️  Recomendamos Node.js v14 ou superior para melhor compatibilidade.');
  }
}

// Função principal de configuração
function setupProject() {
  console.log('=== Configurando Projeto Solar AR ===\n');
  
  checkNodeVersion();
  createDirectories();
  downloadSampleMarkers();
  createSetupReadme();
  
  console.log('\n✅ Configuração concluída com sucesso!');
  console.log('\nPróximos passos:');
  console.log('1. Abra guide.html para instruções detalhadas');
  console.log('2. Use generate-mind-file.html para criar seu arquivo .mind');
  console.log('3. Teste a aplicação com test-marker.html');
}

// Executar a configuração
setupProject();
