/* R2PRO — sample data. Replace with API calls when the backend exists. */
window.R2 = (function(){

  var PLAYER = {
    name:     "Adrian Silva da Costa",
    initials: "ASC",
    email:    "asccur@gmail.com",
    squad:    "Squad A",
    days:     "Tuesday & Thursday",
    coach:    "Coach Rafa",
    first:    "Adrian"
  };

  var COACHES = [
    {i:"RM", n:"Rafa Montoya",    r:"Head coach",         b:"Former WPT qualifier, 12 years coaching. Runs the squad programme and the level assessments.", t:["Squad","Tactics","Video review"], l:"ES · EN · PAP"},
    {i:"YP", n:"Yaritza Pieters", r:"Fitness & kids",     b:"Sports scientist. Builds the conditioning blocks and leads the Kids Academy mornings.", t:["Kids 5-12","Fitness"], l:"PAP · NL · EN"},
    {i:"DB", n:"Dennis Bermúdez", r:"Performance coach",  b:"Works with the competitive players on match play, serve patterns and pressure drills.", t:["Advanced","Match play"], l:"ES · EN"},
    {i:"LC", n:"Lisandra Cova",   r:"Technical coach",    b:"Specialist in wall play and defensive shots. Most of the home drills on wall control are hers.", t:["Technique","Wall play"], l:"ES · PAP · EN"},
    {i:"KM", n:"Kevin Martina",   r:"Junior coach",       b:"Runs the Tuesday and Thursday junior groups and the school holiday camps.", t:["Juniors","Camps"], l:"PAP · NL · EN"},
    {i:"AF", n:"Ana Ferreira",    r:"Beginner programme", b:"Takes new players from first session to first match. Patient, structured, very popular.", t:["Beginners","Adults"], l:"PT · ES · EN"},
    {i:"JV", n:"Jordi Valdés",    r:"Assistant coach",    b:"Feeds the drills, films the video reviews and keeps the ball machines honest.", t:["Drills","Video"], l:"ES · EN"},
    {i:"SM", n:"Shanice Marchena",r:"Academy manager",    b:"Schedules, squads and the kantine. If something is wrong in the app, she fixes it.", t:["Scheduling","Kantine"], l:"PAP · NL · EN"}
  ];

  var SKILLS = [
    {n:"Bandeja",        es:"defensive smash",       v:6.4, d:0.8, by:"RM", on:"2 Sep"},
    {n:"Víbora",         es:"attacking slice smash", v:4.9, d:0.3, by:"RM", on:"2 Sep"},
    {n:"Wall exit",      es:"salida de pared",       v:7.1, d:1.1, by:"RM", on:"2 Sep"},
    {n:"Volley",         es:"volea",                 v:6.8, d:0.2, by:"YP", on:"2 Sep"},
    {n:"Chiquita",       es:"low ball to the feet",  v:5.6, d:0,   by:"RM", on:"2 Sep"},
    {n:"Positioning",    es:"posicionamiento",       v:7.4, d:0.5, by:"RM", on:"2 Sep"},
    {n:"Serve & return", es:"saque y resto",         v:6.0, d:0.4, by:"YP", on:"2 Sep"},
    {n:"Agility",        es:"footwork & speed",      v:7.8, d:0.6, by:"YP", on:"9 Jun"},
    {n:"Match head",     es:"decision making",       v:5.2, d:0.2, by:"RM", on:"2 Sep"}
  ];

  var RADAR = [
    {k:"Bandeja",  me:6.4, sq:5.8},
    {k:"Víbora",   me:4.9, sq:5.5},
    {k:"Pared",    me:7.1, sq:6.0},
    {k:"Volea",    me:6.8, sq:6.4},
    {k:"Saque",    me:6.0, sq:6.1},
    {k:"Posición", me:7.4, sq:6.2}
  ];

  var SHOP = [
    {ico:"💧", n:"Awa / water",        s:"500ml bottle",         c:40},
    {ico:"🥤", n:"Sport drink",        s:"Cold, from the bar",   c:60},
    {ico:"🥪", n:"Tosti",              s:"Ham and cheese",       c:90},
    {ico:"🍹", n:"Batido",             s:"Fresh fruit shake",    c:120},
    {ico:"🎾", n:"Grip",               s:"Overgrip, any colour", c:150},
    {ico:"🥫", n:"Tube of balls",      s:"3 match balls",        c:400},
    {ico:"🧢", n:"R2PRO cap",          s:"Club merch",           c:600},
    {ico:"👕", n:"R2PRO training tee", s:"Sizes XS to XL",       c:1200}
  ];

  var DRILLS = [
    {n:"Wall control, 50 touches", by:"Coach Rafa",     ago:"3 days ago",  dur:"6:12",  lvl:"All levels",  kit:"Wall + ball",     g:"linear-gradient(140deg,#1B3B57,#0F2233)"},
    {n:"Shadow bandeja, no ball",  by:"Coach Rafa",     ago:"1 week ago",  dur:"4:38",  lvl:"Intermediate",kit:"Racket only",     g:"linear-gradient(140deg,#23485E,#12283A)"},
    {n:"Mobility routine",         by:"Coach Yaritza",  ago:"1 week ago",  dur:"11:05", lvl:"All levels",  kit:"No kit",          g:"linear-gradient(140deg,#2A4A45,#0F2233)"},
    {n:"Reaction wall, partner",   by:"Coach Dennis",   ago:"2 weeks ago", dur:"7:20",  lvl:"Advanced",    kit:"Wall + partner",  g:"linear-gradient(140deg,#3A3050,#131F33)"},
    {n:"Grip changes drill",       by:"Coach Lisandra", ago:"3 weeks ago", dur:"3:45",  lvl:"Beginner",    kit:"Racket only",     g:"linear-gradient(140deg,#4A3326,#16243A)"},
    {n:"Core for padel, 10 min",   by:"Coach Yaritza",  ago:"1 month ago", dur:"10:00", lvl:"All levels",  kit:"Mat",             g:"linear-gradient(140deg,#1F4150,#101F31)"}
  ];

  var FEED = [
    {c:"g", t:"Squad training attended · Court 3",  d:"Thu 11 Sep · checked in by Rafa", a:"+60"},
    {c:"o", t:"Redeemed: Batido at the kantine",    d:"Thu 11 Sep · code 7K2QM",         a:"-120", neg:true},
    {c:"",  t:"Home drill completed: Wall control", d:"Wed 10 Sep",                      a:"+15"},
    {c:"g", t:"Squad training attended · Court 1",  d:"Tue 9 Sep · on time bonus",       a:"+60"},
    {c:"",  t:"Skill assessment updated by Rafa",   d:"Tue 2 Sep · rating 3.00 → 3.25",  a:""},
    {c:"g", t:"Camp day · Zeelandia",               d:"Fri 29 Aug",                      a:"+100"}
  ];

  var HISTORY = [
    {c:"o", t:"Batido",        d:"11 Sep · confirmed by kantine staff", a:"-120", neg:true},
    {c:"o", t:"Overgrip",      d:"28 Aug · confirmed",                  a:"-150", neg:true},
    {c:"o", t:"Awa 500ml",     d:"21 Aug · confirmed",                  a:"-40",  neg:true},
    {c:"o", t:"Tube of balls", d:"2 Aug · confirmed",                   a:"-400", neg:true}
  ];

  /* 1 = attended, weeks 1 to 12 of the season */
  var ATT = [1,1,0,1,1,1,1,0,1,1,1,1];


  /* One pose per skill. Joints live in the 0 0 240 300 viewBox; app.js draws the
     silhouette from them. head/sL/sR = head and shoulders, hL/hR = hips,
     eR/wR = racket elbow and wrist, eL/wL = front arm, kL/aL = left knee and ankle,
     ra = racket angle in degrees, ball = optional ball in the free hand. */
  var BODY = [
    {k:"Víbora", es:"attacking slice smash", part:"racket forearm", v:4.9, pose:{
      head:[112,46], sL:[92,82], sR:[136,78], hL:[102,166], hR:[134,166],
      eR:[170,58], wR:[192,38], eL:[70,98], wL:[58,66],
      kL:[92,216], aL:[84,268], kR:[142,214], aR:[154,266], ra:-50}},

    {k:"Bandeja", es:"defensive smash", part:"shoulder", v:6.4, pose:{
      head:[116,46], sL:[94,82], sR:[140,80], hL:[104,166], hR:[136,166],
      eR:[178,68], wR:[204,52], eL:[74,102], wL:[62,72],
      kL:[96,216], aL:[88,268], kR:[144,214], aR:[156,266], ra:-25}},

    {k:"Volley", es:"volea", part:"front arm", v:6.8, pose:{
      head:[118,48], sL:[96,84], sR:[140,84], hL:[104,168], hR:[136,168],
      eR:[160,112], wR:[176,86], eL:[82,114], wL:[100,92],
      kL:[92,214], aL:[80,266], kR:[146,214], aR:[160,266], ra:-18}},

    {k:"Serve", es:"saque", part:"racket hand", v:6.0, pose:{
      head:[118,44], sL:[96,80], sR:[140,80], hL:[104,166], hR:[136,166],
      eR:[164,118], wR:[178,150], eL:[78,114], wL:[88,140],
      kL:[98,214], aL:[92,268], kR:[140,212], aR:[150,266], ra:42, ball:[88,128]}},

    {k:"Wall exit", es:"salida de pared", part:"feet and hips", v:7.1, pose:{
      head:[128,52], sL:[110,88], sR:[152,84], hL:[110,168], hR:[140,166],
      eR:[186,106], wR:[208,132], eL:[92,114], wL:[76,90],
      kL:[100,216], aL:[88,268], kR:[148,214], aR:[166,264], ra:34}},

    {k:"Chiquita", es:"low ball to the feet", part:"knees and wrist", v:5.6, pose:{
      head:[114,84], sL:[92,118], sR:[138,116], hL:[102,192], hR:[134,192],
      eR:[162,166], wR:[188,206], eL:[74,150], wL:[56,182],
      kL:[76,234], aL:[92,276], kR:[164,232], aR:[150,274], ra:22}},

    {k:"Positioning", es:"posicionamiento", part:"core", v:7.4, pose:{
      head:[120,50], sL:[94,86], sR:[146,86], hL:[104,166], hR:[136,166],
      eR:[156,120], wR:[138,90], eL:[84,120], wL:[104,94],
      kL:[86,212], aL:[70,264], kR:[154,212], aR:[170,264], ra:-82}},

    {k:"Agility", es:"footwork & speed", part:"legs", v:7.8, pose:{
      head:[106,46], sL:[86,82], sR:[128,78], hL:[102,162], hR:[130,164],
      eR:[162,100], wR:[184,76], eL:[62,112], wL:[52,144],
      kL:[64,206], aL:[42,260], kR:[158,210], aR:[194,262], ra:-38}},

    {k:"Match head", es:"decision making", part:"head", v:5.2, pose:{
      head:[120,40], sL:[98,76], sR:[142,76], hL:[106,168], hR:[134,168],
      eR:[154,122], wR:[162,166], eL:[88,122], wL:[82,164],
      kL:[104,220], aL:[100,268], kR:[136,220], aR:[140,268], ra:74}}
  ];

  /* Sessions are generated from today so the prototype never shows a stale week.
     Squad trains Tuesday and Thursday, camp on Saturday, privates on request. */
  var SCHEDULE = (function(){
    var out = [], now = new Date(), plan = [
      {dow:2, h:17, m:0,  dur:90, kind:"Squad training", court:"Court 3, Jan Thiel",  coach:"Rafa Montoya",    cap:8,  taken:5, pts:60, note:"Bandeja block, bring the blue grip"},
      {dow:4, h:17, m:0,  dur:90, kind:"Squad training", court:"Court 1, Jan Thiel",  coach:"Rafa Montoya",    cap:8,  taken:8, pts:60, note:"Match play, four courts running"},
      {dow:6, h:9,  m:0,  dur:180,kind:"Camp day",       court:"Zeelandia, all courts",coach:"Kevin Martina",  cap:24, taken:17,pts:100,note:"Bring water, sunblock and a second shirt"},
      {dow:1, h:18, m:30, dur:60, kind:"Private lesson", court:"Court 2, Jan Thiel",  coach:"Lisandra Cova",   cap:1,  taken:0, pts:40, note:"Wall exits, booked by you"}
    ];
    plan.forEach(function(p, pi){
      for(var w=0; w<3; w++){
        var d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), p.h, p.m, 0, 0);
        var shift = (p.dow - d.getDay() + 7) % 7;
        d.setDate(d.getDate() + shift + w*7);
        if(d < now) continue;
        out.push({
          id:   "s" + pi + "w" + w,
          date: d,
          end:  new Date(d.getTime() + p.dur*60000),
          kind: p.kind, court: p.court, coach: p.coach,
          cap:  p.cap, taken: p.taken, pts: p.pts, note: p.note
        });
      }
    });
    return out.sort(function(a,b){ return a.date - b.date; }).slice(0, 7);
  })();

  /* the squad, used for the standings and for the coach check-in sheet */
  var ROSTER = [
    {id:"p1", i:"ASC", n:"Adrian Silva da Costa", me:true, pts:1340, streak:11, rating:3.25, group:"Squad A"},
    {id:"p2", i:"NV",  n:"Naomi Vrolijk",         pts:1985, streak:14, rating:3.75, group:"Squad A"},
    {id:"p3", i:"GH",  n:"Gio Hernandez",         pts:1610, streak:6,  rating:3.50, group:"Squad A"},
    {id:"p4", i:"TB",  n:"Thiago Bonifacio",      pts:1275, streak:9,  rating:3.25, group:"Squad A"},
    {id:"p5", i:"SK",  n:"Saskia Koeiman",        pts:1180, streak:4,  rating:3.00, group:"Squad A"},
    {id:"p6", i:"RJ",  n:"Ravi Jansen",           pts:940,  streak:2,  rating:3.00, group:"Squad B"},
    {id:"p7", i:"MD",  n:"Mireille Daal",         pts:865,  streak:7,  rating:2.75, group:"Squad B"},
    {id:"p8", i:"EC",  n:"Elian Croes",           pts:720,  streak:1,  rating:2.75, group:"Squad B"}
  ];

  var BADGES = [
    {ic:"🔥", n:"Ten in a row",      d:"Ten squad sessions without missing one",      got:true},
    {ic:"🌅", n:"Never late",        d:"Twenty on-time check-ins",                    got:true},
    {ic:"🧱", n:"Wall rat",          d:"Fifteen home drills completed",               got:true},
    {ic:"🤝", n:"Recruiter",         d:"Brought a friend who joined the academy",     got:true},
    {ic:"🏆", n:"Club tournament",   d:"Played the club tournament",                  got:false},
    {ic:"📈", n:"Level 3.50",        d:"Reach an R2 rating of 3.50",                  got:false},
    {ic:"🌞", n:"Camp week",         d:"Every day of a holiday camp",                 got:false},
    {ic:"🎯", n:"Sharp víbora",      d:"Score 6.0 or better on the víbora",           got:false}
  ];

  /* the club sets these rules; they drive the points engine */
  var EARN = [
    {k:"Training attended", v:50},
    {k:"On time",           v:10},
    {k:"Camp day",          v:100},
    {k:"Home drill",        v:15},
    {k:"Bring a friend",    v:150},
    {k:"Club tournament",   v:200}
  ];

  DRILLS.forEach(function(d, i){ d.id = "d" + i; });

  return {PLAYER:PLAYER, BODY:BODY, COACHES:COACHES, SKILLS:SKILLS, RADAR:RADAR, SHOP:SHOP,
          DRILLS:DRILLS, FEED:FEED, HISTORY:HISTORY, ATT:ATT,
          SCHEDULE:SCHEDULE, ROSTER:ROSTER, BADGES:BADGES, EARN:EARN};
})();
