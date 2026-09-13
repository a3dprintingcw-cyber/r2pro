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


  /* Where each skill lives on the body. Drawn by app.js as the second slide
     of the skill profile card. Geometry is in the 0 0 360 314 viewBox.
     dot = where the marker sits, ly = the label's baseline, side = which column. */
  var BODY = [
    {k:"Match head",  v:5.2, side:"l", ly:70,  dot:[142,52],  seg:"head"},
    {k:"Volley",      v:6.8, side:"l", ly:158, dot:[114,152], seg:"offarm"},
    {k:"Serve",       v:6.0, side:"l", ly:22,  dot:[240,13],  seg:"racket"},
    {k:"Víbora",      v:4.9, side:"r", ly:48,  dot:[222,47],  seg:"forearm"},
    {k:"Bandeja",     v:6.4, side:"r", ly:86,  dot:[199,70],  seg:"uparm"},
    {k:"Positioning", v:7.4, side:"r", ly:128, dot:[172,124], seg:"torso"},
    {k:"Agility",     v:7.8, side:"r", ly:196, dot:[177,196], seg:"thighs"},
    {k:"Wall exit",   v:7.1, side:"r", ly:252, dot:[182,246], seg:"shins"}
  ];

  return {PLAYER:PLAYER, BODY:BODY, COACHES:COACHES, SKILLS:SKILLS, RADAR:RADAR, SHOP:SHOP, DRILLS:DRILLS, FEED:FEED, HISTORY:HISTORY, ATT:ATT};
})();
