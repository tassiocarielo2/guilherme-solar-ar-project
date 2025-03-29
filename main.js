// Dados dos planetas do sistema solar
const planetData = [
  {
    name: 'Júpiter',
    description: 'Júpiter é o maior planeta do Sistema Solar e o quinto a partir do Sol. É um gigante gasoso com uma característica Grande Mancha Vermelha, que é uma tempestade que dura há pelo menos 400 anos.',
    radius: '69.911 km',
    distanceFromSun: '778,5 milhões km',
    orbitalPeriod: '11,86 anos',
    rotationPeriod: '9,93 horas',
  }
  // Outros planetas comentados para implementação futura
  /*
  {
    name: 'Mercúrio',
    description: 'Mercúrio é o planeta mais próximo do Sol e o menor planeta do Sistema Solar. Tem uma órbita excêntrica e rápida, completando uma volta ao redor do Sol em apenas 88 dias terrestres.',
    radius: '2.439,7 km',
    distanceFromSun: '57,91 milhões km',
    orbitalPeriod: '88 dias',
    rotationPeriod: '58,6 dias',
  },
  // ... outros planetas
  */
];

// Elementos da interface
const planetNameElement = document.getElementById('planet-name');
const planetDescriptionElement = document.getElementById('planet-description');
const detectionStatusElement = document.getElementById('detection-status');

// Variáveis de estado
let arSystem = null;
let isMarkerDetectionEnabled = true;

// Função para inicializar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  // Inicializando o sistema de AR
  console.log("Sistema AR de Planetas inicializado");

  // Aguardar o carregamento completo da cena AR
  const sceneEl = document.querySelector('a-scene');
  sceneEl.addEventListener('loaded', function () {
    console.log('A-Frame scene carregada');
    arSystem = sceneEl.systems['mindar-image-system'];
    
    // Adiciona eventos ao sistema AR para debugging
    arSystem.el.addEventListener('arReady', () => {
      console.log('AR está pronto!');
      detectionStatusElement.textContent = 'AR pronta - aponte para Júpiter';
      detectionStatusElement.classList.add('ready');
    });

    arSystem.el.addEventListener('arError', (error) => {
      console.error('Erro de AR:', error);
      detectionStatusElement.textContent = 'Erro na AR: Verifique permissões de câmera';
      detectionStatusElement.classList.add('error');
    });
  });
  
  // Configurando listeners para detecção dos planetas
  setupPlanetDetection();

  // Configurar botão de teste para debugging
  document.getElementById('test-detection').addEventListener('click', () => {
    console.log("Simulando detecção de Júpiter");
    updatePlanetInfo(0); // Simula a detecção de Júpiter (índice 0 no array simplificado)
    detectionStatusElement.textContent = 'Detecção simulada: Júpiter';
    detectionStatusElement.classList.add('detected');
  });
});

// Configurar eventos de detecção de marcadores
function setupPlanetDetection() {
  // Para Júpiter (ou qualquer planeta que seja o índice 0 no array atual)
  const jupiterEntity = document.querySelector('[mindar-image-target="targetIndex: 0"]');
  
  if (jupiterEntity) {
    // Quando Júpiter é detectado
    jupiterEntity.addEventListener('targetFound', () => {
      console.log(`Planeta detectado: ${planetData[0].name}`);
      detectionStatusElement.textContent = `Planeta detectado: ${planetData[0].name}`;
      detectionStatusElement.classList.add('detected');
      updatePlanetInfo(0);
      
      // Adicionar animação ao modelo 3D
      const model = jupiterEntity.querySelector('a-gltf-model');
      if (model) {
        model.setAttribute('animation', {
          property: 'rotation',
          to: '0 360 0',
          dur: 10000,
          easing: 'linear',
          loop: true
        });
      }
    });
    
    // Quando Júpiter é perdido de vista
    jupiterEntity.addEventListener('targetLost', () => {
      console.log(`Planeta perdido: ${planetData[0].name}`);
      detectionStatusElement.textContent = 'Procurando por planetas...';
      detectionStatusElement.classList.remove('detected');
      resetPlanetInfo();
    });
  }
  
  // Código comentado para adição futura de outros planetas
  /*
  // Adicionar eventos para cada entidade de destino de imagem MindAR
  for (let i = 0; i < planetData.length; i++) {
    const targetEntity = document.querySelector(`[mindar-image-target="targetIndex: ${i}"]`);
    
    if (targetEntity) {
      // Quando um planeta é detectado
      targetEntity.addEventListener('targetFound', () => {...});
      
      // Quando um planeta é perdido de vista
      targetEntity.addEventListener('targetLost', () => {...});
    }
  }
  */
}

// Função para atualizar as informações do planeta
function updatePlanetInfo(planetIndex) {
  const planet = planetData[planetIndex];
  
  planetNameElement.textContent = planet.name;
  
  // Formatando a descrição com informações adicionais
  planetDescriptionElement.innerHTML = `
    ${planet.description}<br><br>
    <strong>Raio:</strong> ${planet.radius}<br>
    <strong>Distância do Sol:</strong> ${planet.distanceFromSun}<br>
    <strong>Período orbital:</strong> ${planet.orbitalPeriod}<br>
    <strong>Período de rotação:</strong> ${planet.rotationPeriod}
  `;
  
  // Mostrar a caixa de informações
  document.getElementById('info-box').classList.add('visible');
}

// Função para resetar as informações quando nenhum planeta é detectado
function resetPlanetInfo() {
  planetNameElement.textContent = "Aponte para Júpiter";
  planetDescriptionElement.textContent = "Informações sobre Júpiter aparecerão aqui quando o marcador for detectado.";
  
  // Esconder a caixa de informações
  document.getElementById('info-box').classList.remove('visible');
}
