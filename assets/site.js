/* R2PRO — shared site behaviour: mobile menu, coach grids, toasts. */
(function(){
  "use strict";

  var menuBtn = document.getElementById("menuBtn");
  var topnav  = document.getElementById("topnav");
  if(menuBtn && topnav){
    menuBtn.addEventListener("click", function(){
      var open = topnav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  var toastEl = document.getElementById("toast"), toastT;
  window.r2toast = function(msg){
    if(!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function(){ toastEl.classList.remove("show"); }, 2600);
  };
  document.addEventListener("click", function(e){
    var b = e.target.closest("[data-toast]");
    if(b) window.r2toast(b.dataset.toast);
  });

  /* coach cards, used on the home page teaser and the coaches page */
  window.coachCard = function(c, i){
    return '<div class="coach"><div class="coach-top"><div class="avatar'+(i%2?" sea":"")+'">'+c.i+'</div>'+
      '<div><h3>'+c.n+'</h3><div class="coach-role">'+c.r+'</div></div></div>'+
      '<p>'+c.b+'</p><div class="chips">'+
      c.t.map(function(t){return '<span class="chip">'+t+'</span>';}).join("")+
      '<span class="chip sea">'+c.l+'</span></div></div>';
  };
})();
