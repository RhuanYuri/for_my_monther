Regras:
---

## 🌸 Prompt para o Site de Homenagem — Dia das Mães

---

### **CONTEXTO & VISÃO**

Crie um site de homenagem para o Dia das Mães em React, com uma estética **"Bloom Editorial"** — sofisticada, emocional e viva. Pense em uma revista de luxo que ganhou vida: tipografia dramática, transições fluidas, cores quentes em tons de sépia, terracota, coral, creme e dourado envelhecido. O site deve parecer uma **carta de amor interativa**, não um template comum.

---

### **STACK & BIBLIOTECAS**

```
React + Vite
Framer Motion (animações)
React Intersection Observer (scroll triggers)
React Router (navegação entre seções)
Lucide React (ícones)
Tailwind CSS (estilização base)
```

---

### **SEÇÕES & COMPORTAMENTO DETALHADO**

#### **1. 🌹 Hero Section — "O Primeiro Olhar"**
- **Fundo**: Imagem em parallax com overlay de gradiente sépia/terracota escuro
- **Entrada**: A foto aparece com um efeito de *reveal* — como uma cortina que abre lentamente (clip-path animation de cima para baixo)
- **Tipografia**: Fonte display serif italiana (ex: `Cormorant Garamond` ou `Playfair Display`) para a frase principal, grandiosa, com `font-size` responsivo e `letter-spacing` largo
- **Frase**: Centralizada, digitada com efeito *typewriter* suave, linha por linha
- **Detalhe**: Partículas de pétalas caindo suavemente no fundo (canvas com requestAnimationFrame ou biblioteca de partículas)
- **Scroll cue**: Uma seta animada com pulse pulsando no rodapé do hero

#### **2. 📸 Galeria de Fotos — "Memórias em Movimento"**
- **Layout**: Grid masonry assimétrico (colunas de tamanhos diferentes), tipo editorial de revista
- **Filtros animados**: Abas no topo — *Família · Amizades · Viagens · Momentos* — que ao clicar fazem as fotos saírem voando e reorganizarem com spring animation (Framer Motion `layoutId`)
- **Hover**: Cada foto, ao receber hover, expande levemente com `scale(1.05)`, aparece uma legenda deslizando de baixo com título e data, e um filtro de cor vintage desaparece revelando a foto em cores reais
- **Lightbox**: Clique abre a foto em tela cheia com navegação por swipe e teclado, fundo com blur
- **Entrada no scroll**: Cada foto entra com rotação leve (`rotate(-2deg)` → `rotate(0deg)`) e fade — como fotos sendo colocadas em um álbum

#### **3. 💌 Legado — "O Que Ficou Para Sempre"**
- **Layout**: Estilo carta manuscrita — fundo com textura de papel (CSS noise), margens irregulares
- **Tipografia**: Mistura de fonte cursiva para trechos emocionais e serif para corpo do texto
- **Animação de leitura**: Cada parágrafo aparece progressivamente conforme o scroll, com efeito de *ink spreading* (opacity + blur filter animados)
- **Linha do tempo horizontal**: No final da seção, uma timeline interativa com eventos marcantes — arraste para navegar, cada ponto ao ser clicado expande uma mini-card com foto e texto
- **Detalhe emocional**: Um botão "Guardar no coração" que, ao clicar, dispara uma animação de coração explodindo em confetti colorido pela tela

#### **4. 🎵 Experiência Sonora (Bônus)**
- Botão flutuante no canto para ativar/desativar uma música de fundo suave
- Ícone de nota musical com animação de ondas de som

#### **5. 🌸 Footer — "Com Amor"**
- Frase final centralizada em tipografia gigante
- Animação de assinatura sendo desenhada (SVG path animation com `stroke-dashoffset`)
- Partículas de flores subindo

---

### **SISTEMA DE CORES & TIPOGRAFIA**

```css
--cream: #FAF3E0
--terracota: #C1694F
--coral-soft: #E8927C
--dourado: #B8860B
--preto-elegante: #1A1208
--sepia: #8B7355

/* Fontes */
Display: 'Cormorant Garamond' (Google Fonts) — 300, 700
Body: 'Lora' (Google Fonts) — 400, 500
Cursivo: 'Dancing Script' — para trechos especiais
```

---

### **MICRO-INTERAÇÕES OBRIGATÓRIAS**

- Cursor customizado: uma pequena flor que segue o mouse, com trailing effect
- Scroll indicator lateral: barra de progresso vertical com ícone de pétalas preenchendo
- Transição entre seções: fade + leve blur cross-dissolve
- Botão de compartilhar com animação de confetti ao copiar link

---

### **ESTRUTURA DE COMPONENTES SUGERIDA**

```
/src
  /components
    Hero.jsx
    Gallery.jsx
    GalleryItem.jsx
    Lightbox.jsx
    Legacy.jsx
    Timeline.jsx
    HeartButton.jsx
    PetalCursor.jsx
    AudioPlayer.jsx
    ScrollProgress.jsx
    Footer.jsx
  /hooks
    useIntersectionObserver.js
    useParallax.js
  /data
    photos.js       ← array com src, legenda, época, categoria
    timeline.js     ← array com datas e eventos
  /assets
    /photos
    /textures
  App.jsx
  index.css
```

---

### **TOM & INTENÇÃO FINAL**

> O site deve fazer quem visita **sentir algo**. Não é um portfólio. É uma obra de arte emocional. Cada detalhe — o peso da tipografia, a velocidade das animações, o calor das cores — deve comunicar: *"você foi amada, e essa história merece ser contada com beleza."*

---
