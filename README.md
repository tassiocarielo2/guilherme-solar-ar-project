Crie um projeto Web simples usando HTML, CSS e JavaScript puro, sem frameworks como React ou Next.

O projeto deve exibir realidade aumentada usando a biblioteca MindAR.js. A ideia é reconhecer planetas pintados em bolas de isopor como marcadores, e exibir informações interativas sobre eles quando a câmera do celular for apontada para a maquete.

**Requisitos:**

1. Estrutura de pastas:
   - `index.html`: Página principal.
   - `main.js`: Script principal.
   - `style.css`: Estilo básico.
   - `assets/planet-markers/`: Imagens dos planetas para reconhecimento.
   - `assets/models/`: Modelos 3D dos planetas (formato .glb ou .gltf).
   - `targets/`: Arquivos .mind gerados com as imagens dos planetas.
   - `mindar/`: Biblioteca MindAR.js (versão mínima para imagem tracking).

2. O `index.html` deve:
   - Carregar a biblioteca MindAR.js e A-Frame.
   - Iniciar a câmera.
   - Usar o arquivo de marcadores `.mind` para reconhecer os planetas.
   - Para cada planeta reconhecido, exibir um modelo 3D (ou uma animação simples) e uma caixa de texto com informações.

3. O `main.js` deve:
   - Controlar o que aparece conforme o planeta é detectado.
   - Atualizar a informação exibida na tela com base no índice do marcador.

4. A `style.css` deve:
   - Ter estilos básicos para exibir uma interface leve e limpa no celular.
   - Estilizar a área de informações (nome do planeta, descrição etc).

5. Não utilize nenhum framework como React, Vue ou Next.js. Apenas HTML/JS puro com Copilot.

6. Inclua comentários explicando cada bloco de código para facilitar a personalização.

Após montar a estrutura, me ajude a:
- Baixar modelos 3D dos planetas.
- Gerar os marcadores `.mind` com base em imagens reais dos planetas.
- Hospedar o projeto usando Vercel ou GitHub Pages para que eu possa acessar via navegador do celular.

