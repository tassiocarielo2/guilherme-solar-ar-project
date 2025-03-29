// Este componente cria um modelo fallback de Júpiter 
// quando o modelo 3D (.glb) não pode ser carregado

AFRAME.registerComponent('jupiter-fallback', {
  schema: {
    radius: {type: 'number', default: 0.5},
    color: {type: 'color', default: '#E39E54'},
    detail: {type: 'number', default: 32}
  },
  
  init: function() {
    this.createModel();
  },
  
  createModel: function() {
    const data = this.data;
    const el = this.el;
    
    // Criar a esfera para o planeta
    const sphere = document.createElement('a-sphere');
    sphere.setAttribute('radius', data.radius);
    sphere.setAttribute('color', data.color);
    sphere.setAttribute('segments-height', data.detail);
    sphere.setAttribute('segments-width', data.detail);
    
    // Adicionar animação de rotação
    sphere.setAttribute('animation', {
      property: 'rotation',
      to: '0 360 0',
      dur: 15000,
      easing: 'linear',
      loop: true
    });
    
    // Criar os padrões característicos de Júpiter (listras)
    for (let i = 0; i < 5; i++) {
      const offset = (i - 2) * 0.08;
      const stripe = document.createElement('a-torus');
      const color = i % 2 === 0 ? '#D28F4F' : '#C18644';
      const radius = data.radius + 0.001; // Levemente maior que o planeta
      
      stripe.setAttribute('radius', radius);
      stripe.setAttribute('radius-tubular', 0.02 + Math.abs(offset) * 0.02);
      stripe.setAttribute('segments-tubular', 32);
      stripe.setAttribute('segments-radial', 32);
      stripe.setAttribute('rotation', `${90 + offset * 12} 0 0`);
      stripe.setAttribute('color', color);
      
      el.appendChild(stripe);
    }
    
    // Criar a Grande Mancha Vermelha
    const spot = document.createElement('a-entity');
    spot.setAttribute('geometry', {
      primitive: 'ellipsoid',
      radiusX: 0.15,
      radiusY: 0.08,
      radiusZ: 0.05
    });
    spot.setAttribute('position', `0.35 0.15 ${data.radius * 0.8}`);
    spot.setAttribute('rotation', '0 0 -25');
    spot.setAttribute('material', 'color: #AA4444');
    
    // Adicionar todos os elementos ao planeta
    el.appendChild(sphere);
    el.appendChild(spot);
    
    console.log('Modelo fallback de Júpiter criado com sucesso');
  }
});
