// Dados dos planetas do sistema solar
const planetData = [
  {
    name: 'Mercúrio',
    description: 'Mercúrio é o planeta mais próximo do Sol e o menor planeta do Sistema Solar. Tem uma órbita excêntrica e rápida, completando uma volta ao redor do Sol em apenas 88 dias terrestres.',
    radius: '2.439,7 km',
    distanceFromSun: '57,91 milhões km',
    orbitalPeriod: '88 dias',
    rotationPeriod: '58,6 dias',
  },
  {
    name: 'Vênus',
    description: 'Vênus é o segundo planeta do Sistema Solar e o mais quente, com temperaturas superficiais de até 462°C devido ao efeito estufa extremo. Suas nuvens densas de ácido sulfúrico refletem bem a luz solar.',
    radius: '6.051,8 km',
    distanceFromSun: '108,2 milhões km',
    orbitalPeriod: '225 dias',
    rotationPeriod: '243 dias (retrógrado)',
  },
  {
    name: 'Terra',
    description: 'Nosso planeta é o terceiro a partir do Sol e o único conhecido a abrigar vida. É caracterizado por oceanos de água líquida, uma atmosfera rica em oxigênio e uma lua grande que estabiliza seu eixo.',
    radius: '6.371 km',
    distanceFromSun: '149,6 milhões km',
    orbitalPeriod: '365,25 dias',
    rotationPeriod: '23,9 horas',
  },
  {
    name: 'Marte',
    description: 'Marte, o planeta vermelho, é o quarto planeta a partir do Sol. Possui uma fina atmosfera, calotas polares de gelo e a maior montanha do Sistema Solar - Olympus Mons.',
    radius: '3.389,5 km',
    distanceFromSun: '227,9 milhões km',
    orbitalPeriod: '687 dias',
    rotationPeriod: '24,6 horas',
  },
  {
    name: 'Júpiter',
    description: 'Júpiter é o maior planeta do Sistema Solar e o quinto a partir do Sol. É um gigante gasoso com uma característica Grande Mancha Vermelha, que é uma tempestade que dura há pelo menos 400 anos.',
    radius: '69.911 km',
    distanceFromSun: '778,5 milhões km',
    orbitalPeriod: '11,86 anos',
    rotationPeriod: '9,93 horas',
  },
  {
    name: 'Saturno',
    description: 'Saturno é conhecido por seus impressionantes anéis compostos principalmente de gelo e rochas. É o sexto planeta do Sistema Solar e o segundo maior depois de Júpiter.',
    radius: '58.232 km',
    distanceFromSun: '1.434 bilhão km',
    orbitalPeriod: '29,46 anos',
    rotationPeriod: '10,7 horas',
  },
  {
    name: 'Urano',
    description: 'Urano é o sétimo planeta e tem um eixo de rotação quase paralelo ao seu plano orbital, fazendo-o "rolar" em sua órbita. Tem uma coloração azul-esverdeada devido ao metano em sua atmosfera.',
    radius: '25.362 km',
    distanceFromSun: '2.871 bilhão km',
    orbitalPeriod: '84 anos',
    rotationPeriod: '17,2 horas (retrógrado)',
  },
  {
    name: 'Netuno',
    description: 'Netuno é o oitavo e mais distante planeta do Sistema Solar. É um gigante de gelo com ventos fortíssimos, que podem atingir até 2.100 km/h, os mais rápidos do Sistema Solar.',
    radius: '24.622 km',
    distanceFromSun: '4.495 bilhão km',
    orbitalPeriod: '164,8 anos',
    rotationPeriod: '16,1 horas',
  }
];

// Elementos da interface
const planetNameElement = document.getElementById('planet-name');
const planetDescriptionElement = document.getElementById('planet-description');

// Função para inicializar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  // Inicializando o sistema de AR
  console.log("Sistema AR de Planetas inicializado");
  
  // Configurando listeners para detecção dos planetas
  setupPlanetDetection();
});

// Configurar eventos de detecção de marcadores
function setupPlanetDetection() {
  // Adicionar eventos para cada entidade de destino de imagem MindAR
  for (let i = 0; i < planetData.length; i++) {
    const targetEntity = document.querySelector(`[mindar-image-target="targetIndex: ${i}"]`);
    
    if (targetEntity) {
      // Quando um planeta é detectado
      targetEntity.addEventListener('targetFound', () => {
        console.log(`Planeta detectado: ${planetData[i].name}`);
        updatePlanetInfo(i);
        
        // Adicionar animação ao modelo 3D
        const model = targetEntity.querySelector('a-gltf-model');
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
      
      // Quando um planeta é perdido de vista
      targetEntity.addEventListener('targetLost', () => {
        console.log(`Planeta perdido: ${planetData[i].name}`);
        resetPlanetInfo();
      });
    }
  }
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
  planetNameElement.textContent = "Aponte para um planeta";
  planetDescriptionElement.textContent = "Informações sobre o planeta aparecerão aqui quando um marcador for detectado.";
  
  // Esconder a caixa de informações
  document.getElementById('info-box').classList.remove('visible');
}
