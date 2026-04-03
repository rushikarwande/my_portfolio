// Particles config forced to visible defaults
if (typeof particlesJS !== 'undefined') {

particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 48,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ff2d95"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.9,
        "random": false,
        "anim": {
          "enable": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 120,
        "color": "#ff2d95",
        "opacity": 0.3,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1.2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "repulse": {
          "distance": 120,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": false
  }
);

} else {
  console.warn('particlesJS not loaded');
}



// Robust anchor handler: prevent default jump and update hash without causing snap
(function(){
  function getNavHeight(){ const nav=document.querySelector('nav'); return nav?nav.offsetHeight:80; }
  function smoothTo(el){
    if(!el) return;
    const rect = el.getBoundingClientRect();
    const top = Math.max(0, window.pageYOffset + rect.top - getNavHeight());
    window.scrollTo({ top: Math.round(top), behavior: 'smooth' });
  }
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    const href = a.getAttribute('href');
    if(!href || href==='#') return;
    a.addEventListener('click', function(e){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el){
        // close mobile menu if open
        const mm = document.getElementById('mobile-menu');
        if(mm && !mm.classList.contains('hidden')) mm.classList.add('hidden');
        smoothTo(el);
        try{ history.pushState(null,'', href); } catch(e){}
        setTimeout(()=>smoothTo(el), 550);
      }
    });
  });
  if(location.hash){
    window.addEventListener('load', ()=>{ setTimeout(()=>{ const el=document.querySelector(location.hash); if(el){ smoothTo(el); try{history.pushState(null,'',location.hash);}catch(e){} } }, 80); });
  }
})();
