// ================================
// CURSOR PERSONALIZADO
// ================================
var cursor = document.createElement('div');
cursor.className = 'cursor';
var anel = document.createElement('div');
anel.className = 'cursor-anel';
document.body.appendChild(cursor);
document.body.appendChild(anel);

var mx = 0, my = 0, ax = 0, ay = 0;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
});

function animarAnel() {
  ax += (mx - ax) * 0.12;
  ay += (my - ay) * 0.12;
  anel.style.left = ax + 'px';
  anel.style.top  = ay + 'px';
  requestAnimationFrame(animarAnel);
}
animarAnel();

document.querySelectorAll('a, button, .card, .item-lista, .opcional-item').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursor.style.transform = 'scale(2)';
    anel.style.transform = 'translate(-50%, -50%) scale(1.5)';
    anel.style.opacity = '0.5';
  });
  el.addEventListener('mouseleave', function() {
    cursor.style.transform = 'scale(1)';
    anel.style.transform = 'translate(-50%, -50%) scale(1)';
    anel.style.opacity = '1';
  });
});

// ================================
// NAV — ENCOLHE AO ROLAR
// ================================
window.addEventListener('scroll', function() {
  var nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// ================================
// ANIMAÇÃO DE ENTRADA (scroll)
// ================================
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.revelar').forEach(function(el) {
  observer.observe(el);
});

// ================================
// TIPO DE PEDIDO (encomenda.html)
// ================================
function selecionarTipo(tipo, botao) {
  document.querySelectorAll('.tipo-btn').forEach(function(btn) {
    btn.classList.remove('ativo');
  });
  botao.classList.add('ativo');

  document.querySelectorAll('.secao-pedido').forEach(function(sec) {
    sec.style.display = 'none';
  });

  var alvo = document.getElementById('secao-' + tipo);
  if (alvo) alvo.style.display = 'block';
}

// ================================
// FORMULÁRIO → WHATSAPP
// ================================
var form = document.getElementById('form-encomenda');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var mensagem = '🎂 *Olá! Gostaria de fazer uma encomenda!*\n\n';
    var obs = document.getElementById('obs').value;

    var secBolo = document.getElementById('secao-bolo');
    var secKit  = document.getElementById('secao-kit');
    var secBrig = document.getElementById('secao-brigadeiro');

    if (secBolo && secBolo.style.display !== 'none') {
      var tamanho = document.getElementById('tamanho').value;
      var massa   = document.getElementById('massa').value;
      var recheio = document.getElementById('recheio').value;

      if (!tamanho || !massa || !recheio) {
        alert('Por favor, selecione o tamanho, a massa e o recheio.');
        return;
      }

      var opcionais = [];
      document.querySelectorAll('.opcionais-grid input[type=checkbox]:checked').forEach(function(cb) {
        opcionais.push(cb.value);
      });

      mensagem += '🎂 *Tipo:* Bolo\n';
      mensagem += '📏 *Tamanho:* ' + tamanho + '\n';
      mensagem += '🍰 *Massa:* ' + massa + '\n';
      mensagem += '🍓 *Recheio:* ' + recheio + '\n';
      if (opcionais.length > 0) {
        mensagem += '➕ *Opcionais:* ' + opcionais.join(', ') + '\n';
      }

    } else if (secKit && secKit.style.display !== 'none') {
      var kit        = document.getElementById('kit').value;
      var massaKit   = document.getElementById('massa-kit').value;
      var recheioKit = document.getElementById('recheio-kit').value;

      if (!kit || !massaKit || !recheioKit) {
        alert('Por favor, selecione o kit, a massa e o recheio.');
        return;
      }

      mensagem += '🎁 *Tipo:* Kit\n';
      mensagem += '📦 *Kit:* ' + kit + '\n';
      mensagem += '🍰 *Massa:* ' + massaKit + '\n';
      mensagem += '🍓 *Recheio:* ' + recheioKit + '\n';

    } else if (secBrig && secBrig.style.display !== 'none') {
      var brigadeiro = document.getElementById('brigadeiro').value;

      if (!brigadeiro) {
        alert('Por favor, selecione a opção de brigadeiro.');
        return;
      }

      mensagem += '🍫 *Tipo:* Brigadeiros\n';
      mensagem += '🍬 *Opção:* ' + brigadeiro + '\n';
    }

    if (obs) mensagem += '📝 *Obs:* ' + obs + '\n';

    var numero = '5586994211516';
    window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(mensagem), '_blank');
  });
}