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
// LINK ATIVO NA NAVEGAÇÃO (scroll)
// ================================
var navLinks = document.querySelectorAll('nav ul a[href^="#"]');
if (navLinks.length) {
  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY + 120;
    navLinks.forEach(function(link) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var section = document.querySelector(id);
      if (!section) return;
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function(l) { l.classList.remove('ativo'); });
        link.classList.add('ativo');
      }
    });
  });
}

// ================================
// ANIMAÇÃO DE ENTRADA (scroll)
// ================================
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
    }
  });
}, { threshold: 0.12 });

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
      document.querySelectorAll('#secao-bolo .opcionais-grid input[type=checkbox]:checked').forEach(function(cb) {
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

      var saboresKit = [];
      document.querySelectorAll('#secao-kit .opcionais-grid input[type=checkbox]:checked').forEach(function(cb) {
        saboresKit.push(cb.value);
      });

      mensagem += '🎁 *Tipo:* Kit\n';
      mensagem += '📦 *Kit:* ' + kit + '\n';
      mensagem += '🍰 *Massa:* ' + massaKit + '\n';
      mensagem += '🍓 *Recheio:* ' + recheioKit + '\n';
      if (saboresKit.length > 0) {
        mensagem += '🍬 *Sabor dos Docinhos:* ' + saboresKit.join(', ') + '\n';
      }

    } else if (secBrig && secBrig.style.display !== 'none') {
      var brigadeiro = document.getElementById('brigadeiro').value;

      if (!brigadeiro) {
        alert('Por favor, selecione a quantidade de brigadeiros.');
        return;
      }

      var saboresBrig = [];
      document.querySelectorAll('#secao-brigadeiro .opcionais-grid input[type=checkbox]:checked').forEach(function(cb) {
        saboresBrig.push(cb.value);
      });

      if (saboresBrig.length === 0) {
        alert('Por favor, selecione pelo menos um sabor de brigadeiro.');
        return;
      }

      mensagem += '🍫 *Tipo:* Brigadeiros\n';
      mensagem += '🍬 *Quantidade:* ' + brigadeiro + '\n';
      mensagem += '😋 *Sabores:* ' + saboresBrig.join(', ') + '\n';
    }

    if (obs) mensagem += '📝 *Obs:* ' + obs + '\n';

    var numero = '5586994211516';
    window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(mensagem), '_blank');
  });
}
