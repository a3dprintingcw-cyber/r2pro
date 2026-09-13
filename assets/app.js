/* R2PRO — player app. Sample data comes from assets/data.js. */
(function(){
  "use strict";

  var D = window.R2;

  var NAV = [
    {id:"dash",  label:"Dashboard",   short:"Home",     icon:'<path d="M3 10.5L11 4l8 6.5V19a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1z"/>'},
    {id:"dev",   label:"Development", short:"Stats",    icon:'<path d="M4 18V9M9.5 18V4M15 18v-6M20.5 18v-9"/>'},
    {id:"pts",   label:"Points",      short:"Points",   icon:'<circle cx="11" cy="11" r="8"/><path d="M11 7v8M8 11h6"/>'},
    {id:"home",  label:"Home training",short:"Training",icon:'<path d="M4 5h16v11H4z"/><path d="M10 8.5l4.5 3-4.5 3z"/>'},
    {id:"coach", label:"Coaches",     short:"Coaches",  icon:'<circle cx="8" cy="8" r="3.2"/><path d="M3 19c0-3 2.4-5 5-5s5 2 5 5M16 6.5a3 3 0 0 1 0 6M17 19c0-2.2-.9-3.9-2.3-4.6"/>'}
  ];

  function $(s){ return document.querySelector(s); }
  function fmt(n){ return n.toLocaleString("en-US"); }
  function icon(d){
    return '<svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="currentColor" '+
           'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
  }

  /* ---------- points ---------- */
  var points = 1340;
  function setPoints(v){
    points = v;
    $("#ptsChip").textContent = fmt(v);
    $("#ptsBig").textContent  = fmt(v);
    $("#ptsTile").textContent = fmt(v);
    document.querySelectorAll("[data-cost]").forEach(function(b){
      var short = points < parseInt(b.dataset.cost, 10);
      b.disabled = short;
      b.textContent = short ? "Not enough" : "Redeem";
    });
  }

  /* ---------- navigation ---------- */
  var sideNav = $("#sideNav"), tabNav = $("#tabNav");
  NAV.forEach(function(n){
    var b = document.createElement("button");
    b.className = "navbtn"; b.dataset.go = n.id;
    b.innerHTML = icon(n.icon) + "<span>" + n.label + "</span>";
    sideNav.appendChild(b);

    var t = document.createElement("button");
    t.className = "tabbtn"; t.dataset.go = n.id;
    t.innerHTML = icon(n.icon) + "<span>" + n.short + "</span>";
    tabNav.appendChild(t);
  });

  function show(id, push){
    if(!NAV.some(function(n){ return n.id === id; })) id = "dash";
    document.querySelectorAll(".view").forEach(function(v){
      v.classList.toggle("on", v.id === "v-" + id);
    });
    document.querySelectorAll("[data-go]").forEach(function(x){
      x.classList.toggle("active", x.dataset.go === id);
    });
    if(push && location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
    window.scrollTo({top:0, behavior:"smooth"});
  }
  document.addEventListener("click", function(e){
    var b = e.target.closest("[data-go]");
    if(b) show(b.dataset.go, true);
  });
  window.addEventListener("hashchange", function(){ show(location.hash.slice(1), false); });

  /* ---------- academy switcher ---------- */
  var sb = $("#switchBtn"), sm = $("#switchMenu");
  sb.addEventListener("click", function(e){
    e.stopPropagation();
    sm.hidden = !sm.hidden;
    sb.setAttribute("aria-expanded", String(!sm.hidden));
  });
  document.addEventListener("click", function(e){
    if(!sm.hidden && !sm.contains(e.target)) sm.hidden = true;
    var b = e.target.closest("[data-acad]");
    if(!b) return;
    if(b.dataset.acad !== "R2PRO Padel Academy"){
      window.r2toast(b.dataset.acad + " hasn't opened its R2PRO account yet.");
    }else{
      $("#acadName").textContent = b.dataset.acad;
    }
  });

  /* ---------- dashboard ---------- */
  function feedHTML(rows){
    return rows.map(function(f){
      return '<div class="fitem"><span class="fdot '+(f.c||"")+'"></span>'+
        '<div><div class="t">'+f.t+'</div><div class="d">'+f.d+'</div></div>'+
        (f.a ? '<div class="amt'+(f.neg?" neg":"")+'">'+f.a+'</div>' : '')+'</div>';
    }).join("");
  }
  $("#feed").innerHTML = feedHTML(D.FEED);
  $("#history").innerHTML = feedHTML(D.HISTORY);

  (function attendance(){
    var s = '<svg viewBox="0 0 300 120" width="100%" role="img" aria-label="Attendance by week: 11 of the last 12 weeks attended">';
    s += '<line x1="0" y1="86" x2="300" y2="86" stroke="rgba(255,255,255,.14)" stroke-width="1"/>';
    D.ATT.forEach(function(v,i){
      var x = i*25 + 4, h = v ? 58 : 14, y = 86 - h;
      s += '<rect x="'+x+'" y="'+y+'" width="17" height="'+h+'" rx="3" fill="'+(v?"#35C6D6":"rgba(255,255,255,.13)")+'"/>';
      s += '<text x="'+(x+8.5)+'" y="104" font-size="9" font-family="IBM Plex Mono, monospace" fill="#8FA6BC" text-anchor="middle">'+(i+1)+'</text>';
    });
    s += '<text x="0" y="118" font-size="9" font-family="IBM Plex Mono, monospace" fill="#8FA6BC">week of the season · teal = attended</text></svg>';
    $("#attChart").innerHTML = s;
  })();

  /* ---------- skill profile: slide 1 radar, slide 2 body map ---------- */
  var MONO = 'IBM Plex Mono, monospace';

  /* score bands. Semantic, not the brand accent. */
  function band(v){
    if(v < 5.5) return {c:"#FF5A5A", t:"needs work"};
    if(v < 7.0) return {c:"#FFC24B", t:"solid"};
    return {c:"#5BD98A", t:"strong"};
  }

  (function radar(){
    var R = D.RADAR, cx = 180, cy = 142, rad = 96, n = R.length;
    function pt(i, val){
      var a = -Math.PI/2 + i*2*Math.PI/n, r = rad*(val/10);
      return [cx + r*Math.cos(a), cy + r*Math.sin(a)];
    }
    var s = '<svg viewBox="0 0 360 314" width="100%" role="img" aria-label="Skill radar comparing ' +
            D.PLAYER.first + ' with the squad average">';
    [2.5,5,7.5,10].forEach(function(g){
      var p = []; for(var i=0;i<n;i++) p.push(pt(i,g).join(","));
      s += '<polygon points="'+p.join(" ")+'" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="1"/>';
    });
    for(var i=0;i<n;i++){
      var e = pt(i,10);
      s += '<line x1="'+cx+'" y1="'+cy+'" x2="'+e[0]+'" y2="'+e[1]+'" stroke="rgba(255,255,255,.1)" stroke-width="1"/>';
    }
    function poly(key, fill, stroke){
      var p = []; for(var i=0;i<n;i++) p.push(pt(i, R[i][key]).join(","));
      return '<polygon points="'+p.join(" ")+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2" stroke-linejoin="round"/>';
    }
    s += poly("sq","rgba(143,166,188,.12)","rgba(143,166,188,.55)");
    s += poly("me","rgba(255,107,74,.22)","#FF6B4A");
    for(var j=0;j<n;j++){
      var d = pt(j, R[j].me);
      s += '<circle cx="'+d[0]+'" cy="'+d[1]+'" r="3.4" fill="#FF6B4A"/>';
      var l = pt(j, 12.3);
      var anchor = l[0] > cx+6 ? "start" : (l[0] < cx-6 ? "end" : "middle");
      s += '<text x="'+l[0]+'" y="'+(l[1]+3.5)+'" font-size="11" font-family="'+MONO+'" fill="#8FA6BC" text-anchor="'+anchor+'">'+R[j].k+'</text>';
    }
    s += '<g font-size="11" font-family="'+MONO+'">'+
         '<rect x="38" y="294" width="10" height="10" rx="2" fill="#FF6B4A"/><text x="54" y="303" fill="#EAF2F8">'+D.PLAYER.first+'</text>'+
         '<rect x="140" y="294" width="10" height="10" rx="2" fill="rgba(143,166,188,.55)"/><text x="156" y="303" fill="#8FA6BC">Squad average</text>'+
         '</g></svg>';
    $("#radar").innerHTML = s;
  })();

  (function bodyMap(){
    var col = {};
    D.BODY.forEach(function(b){ col[b.seg] = band(b.v).c; });

    function limb(d, c, w){
      return '<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(w||9)+
             '" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    var s = '<svg viewBox="0 0 360 314" width="100%" role="img" aria-label="Body map: each rating placed where the shot is played from">';

    /* faint silhouette underneath, so uncoloured parts still read as a body */
    s += '<g stroke="rgba(255,255,255,.07)" stroke-width="11" stroke-linecap="round" fill="none">'+
         '<path d="M160 67 L160 80"/>'+
         '</g>';

    /* torso */
    s += '<path d="M134 80 L186 80 L178 168 L142 168 Z" fill="'+col.torso+'" fill-opacity=".16" stroke="'+col.torso+'" stroke-width="2" stroke-linejoin="round"/>';
    /* neck */
    s += limb("M160 66 L160 81", "rgba(255,255,255,.22)", 9);
    /* head */
    s += '<circle cx="160" cy="48" r="19" fill="'+col.head+'" fill-opacity=".16" stroke="'+col.head+'" stroke-width="2.4"/>';
    /* racket arm */
    s += limb("M186 82 L212 58", col.uparm);
    s += limb("M212 58 L232 36", col.forearm);
    /* racket */
    s += '<line x1="232" y1="36" x2="239" y2="28" stroke="'+col.racket+'" stroke-width="4" stroke-linecap="round"/>';
    s += '<ellipse cx="245" cy="20" rx="10" ry="13" transform="rotate(-40 245 20)" fill="'+col.racket+'" fill-opacity=".16" stroke="'+col.racket+'" stroke-width="2.4"/>';
    /* off arm */
    s += limb("M134 82 L120 124 L114 152", col.offarm);
    /* legs */
    s += limb("M146 170 L140 220", col.thighs);
    s += limb("M174 170 L180 220", col.thighs);
    s += limb("M140 220 L136 266", col.shins);
    s += limb("M180 220 L184 266", col.shins);
    /* feet */
    s += limb("M136 268 L124 273", "rgba(255,255,255,.22)", 7);
    s += limb("M184 268 L196 273", "rgba(255,255,255,.22)", 7);

    /* leaders, markers and labels */
    D.BODY.forEach(function(b){
      var bd = band(b.v);
      var left = b.side === "l";
      var lx = left ? 92 : 246;
      var tip = left ? lx + 6 : lx - 6;
      s += '<line x1="'+b.dot[0]+'" y1="'+b.dot[1]+'" x2="'+tip+'" y2="'+(b.ly-4)+'" stroke="rgba(255,255,255,.18)" stroke-width="1"/>';
      s += '<circle cx="'+b.dot[0]+'" cy="'+b.dot[1]+'" r="3.6" fill="'+bd.c+'" stroke="#0F2233" stroke-width="1.5"/>';
      s += '<text x="'+lx+'" y="'+b.ly+'" text-anchor="'+(left?"end":"start")+'" font-family="'+MONO+'" font-size="9.5" letter-spacing=".07em" fill="#8FA6BC">'+
           b.k.toUpperCase()+'</text>';
      s += '<text x="'+lx+'" y="'+(b.ly+16)+'" text-anchor="'+(left?"end":"start")+'" font-family="Anton, sans-serif" font-size="17" fill="'+bd.c+'">'+
           b.v.toFixed(1)+'</text>';
    });

    s += '</svg>';
    $("#bodymap").innerHTML = s;
  })();

  /* carousel: segmented buttons plus native swipe / trackpad scroll */
  (function carousel(){
    var strip = $("#pslides");
    if(!strip) return;
    var btns = Array.prototype.slice.call(document.querySelectorAll("[data-slide]"));
    function mark(i){
      btns.forEach(function(b){ b.classList.toggle("on", +b.dataset.slide === i); });
    }
    btns.forEach(function(b){
      b.addEventListener("click", function(){
        var i = +b.dataset.slide;
        strip.scrollTo({left: i * strip.clientWidth, behavior: "smooth"});
        mark(i);
      });
    });
    var t;
    strip.addEventListener("scroll", function(){
      clearTimeout(t);
      t = setTimeout(function(){
        mark(Math.round(strip.scrollLeft / strip.clientWidth));
      }, 90);
    });
  })();

  /* ---------- skill cards ---------- */
  $("#skills").innerHTML = D.SKILLS.map(function(s){
    var delta = s.d > 0 ? '<span class="up">&uarr; '+s.d.toFixed(1)+'</span>' : 'no change';
    return '<div class="skill">'+
      '<div class="skill-top"><div><div class="skill-name">'+s.n+'</div><div class="skill-es">'+s.es+'</div></div>'+
      '<div class="skill-score">'+s.v.toFixed(1)+'<small>/10</small></div></div>'+
      '<div class="track"><i style="width:'+(s.v*10)+'%"></i></div>'+
      '<div class="skill-foot"><span>'+delta+'</span><span>'+s.by+' · '+s.on+'</span></div></div>';
  }).join("");

  /* ---------- kantine ---------- */
  $("#shop").innerHTML = D.SHOP.map(function(it,i){
    return '<div class="item"><div class="ico">'+it.ico+'</div><h4>'+it.n+'</h4>'+
      '<div class="sub">'+it.s+'</div><div class="cost">'+fmt(it.c)+' pts</div>'+
      '<button data-cost="'+it.c+'" data-item="'+i+'">Redeem</button></div>';
  }).join("");

  document.addEventListener("click", function(e){
    var b = e.target.closest("[data-cost]");
    if(!b || b.disabled) return;
    var it = D.SHOP[parseInt(b.dataset.item, 10)];
    setPoints(points - it.c);
    var code = Math.random().toString(36).slice(2,7).toUpperCase();
    $("#history").insertAdjacentHTML("afterbegin",
      '<div class="fitem"><span class="fdot o"></span><div><div class="t">'+it.n+'</div>'+
      '<div class="d">Today · show code '+code+' at the bar</div></div>'+
      '<div class="amt neg">-'+fmt(it.c)+'</div></div>');
    window.r2toast(it.n + " redeemed. Show code " + code + " at the kantine.");
  });

  /* ---------- home training ---------- */
  var filter = "All";
  var LEVELS = ["All","All levels","Beginner","Intermediate","Advanced"];
  $("#filters").innerHTML = LEVELS.map(function(l){
    return '<button class="fbtn'+(l==="All"?" on":"")+'" data-f="'+l+'">'+l+'</button>';
  }).join("");

  function renderDrills(){
    var list = D.DRILLS.filter(function(d){ return filter === "All" || d.lvl === filter; });
    $("#drills").innerHTML = list.map(function(d){
      var idx = D.DRILLS.indexOf(d);
      return '<article class="drill'+(d.done?" complete":"")+'" data-drill="'+idx+'">'+
        '<div class="thumb" style="background:'+d.g+'">'+
        '<div class="play"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2.5l7 4.5-7 4.5z" fill="#EAF2F8"/></svg></div>'+
        '<span class="dur">'+d.dur+'</span></div>'+
        '<div class="drill-body"><h4>'+d.n+'</h4><div class="by">'+d.by+' · uploaded '+d.ago+'</div>'+
        '<div class="chips"><span class="chip">'+d.lvl+'</span><span class="chip sea">'+d.kit+'</span></div>'+
        '<button class="done">'+(d.done ? "&#10003; Completed" : "Mark complete +15")+'</button>'+
        '</div></article>';
    }).join("") +
    '<div class="upload"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 16V4M7 9l5-5 5 5M4 18v2h16v-2"/></svg>'+
    '<div style="font-weight:600;font-size:13.5px">Upload a drill</div>'+
    '<div style="font-size:12px">Coach accounts only. Film it, set a level and the kit needed.</div></div>';
  }
  renderDrills();

  document.addEventListener("click", function(e){
    var f = e.target.closest("[data-f]");
    if(f){
      filter = f.dataset.f;
      document.querySelectorAll("[data-f]").forEach(function(x){
        x.classList.toggle("on", x.dataset.f === filter);
      });
      renderDrills();
      return;
    }
    var btn = e.target.closest(".drill .done");
    if(btn){
      var card = btn.closest(".drill"), i = parseInt(card.dataset.drill, 10);
      if(D.DRILLS[i].done) return;
      D.DRILLS[i].done = true;
      setPoints(points + 15);
      renderDrills();
      window.r2toast(D.DRILLS[i].n + " logged. +15 points, " + D.PLAYER.coach + " can see it.");
    }
  });

  /* ---------- coaches ---------- */
  $("#coachList").innerHTML = D.COACHES.map(function(c,i){
    return '<div class="cprof"><div class="avatar lg'+(i%2?" sea":"")+'">'+c.i+'</div>'+
      '<div class="body"><div><h3>'+c.n+'</h3><div class="coach-role">'+c.r+'</div></div>'+
      '<p style="font-size:13px;color:var(--muted)">'+c.b+'</p>'+
      '<div class="chips">'+c.t.map(function(t){return '<span class="chip">'+t+'</span>';}).join("")+
      '<span class="chip sea">'+c.l+'</span></div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:2px">'+
      '<button class="btn btn-primary btn-sm" data-toast="Private lesson request sent to '+c.n+'.">Book private</button>'+
      '<button class="btn btn-ghost btn-sm" data-go="home">See drills</button></div></div></div>';
  }).join("");

  /* ---------- player identity ---------- */
  (function identity(){
    var P = D.PLAYER;
    var av = $("#navAvatar");   if(av) av.textContent = P.initials;
    var em = $("#sideEmail");   if(em) em.textContent = P.email;
    var gr = $("#greeting");    if(gr) gr.textContent = "Bon bini, " + P.first;
    var sq = $("#squadLine");   if(sq) sq.textContent = P.squad + " \u00b7 " + P.days + " \u00b7 " + P.coach;
  })();

  /* ---------- boot ---------- */
  setPoints(points);
  show(location.hash.slice(1) || "dash", false);
})();
