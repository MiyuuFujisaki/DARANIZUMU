window.addEventListener("load", function(){

const container = document.getElementById("container");

const floatingObjects = [];
const mojiObjects = [];
const animeObjects = [];

let mouseX = -9999;
let mouseY = -9999;
let useBlack = true;
const soundM1 = new Audio("sound/M_1.mp3");
const soundM2 = new Audio("sound/M_2.mp3");
const soundM3 = new Audio("sound/M_3.mp3");
const soundM4 = new Audio("sound/M_4.mp3");
const bgm = new Audio("sound/M_5.mp3");

bgm.loop = true;
bgm.volume = 0.45;

let enterSoundToggle = true;
let bgmStarted = false;

function playOneShot(sound){
  sound.pause();
  sound.currentTime = 0;

  const playPromise = sound.play();

  if(playPromise !== undefined){
    playPromise.catch(function(error){
      console.log("音が鳴りません:", error);
    });
  }
}

function startBgm(){
  if(bgmStarted) return;

  bgm.volume = 0.45;
  bgm.loop = true;

  const playPromise = bgm.play();

  if(playPromise !== undefined){
    playPromise.then(function(){
      bgmStarted = true;
    }).catch(function(error){
      console.log("BGMが鳴りません:", error);
    });
  }
}

for(let i=0; i<35; i++) createFloatingGif();
for(let i=0; i<55; i++) createFloatingImage();

const sounds = {
  space: new Audio("sound/space.mp3"),
  enter: new Audio("sound/enter.mp3"),
  key1: new Audio("sound/key1.mp3"),
  key2: new Audio("sound/key2.mp3"),
  key3: new Audio("sound/key3.mp3"),
  key4: new Audio("sound/key4.mp3"),
  key5: new Audio("sound/key5.mp3"),
  key6: new Audio("sound/key6.mp3"),
  key7: new Audio("sound/key7.mp3"),
  key8: new Audio("sound/key8.mp3"),
  key9: new Audio("sound/key9.mp3"),
  key0: new Audio("sound/key0.mp3")
};

function playSound(name){
  if(!sounds[name]) return;

  sounds[name].currentTime = 0;
  sounds[name].play();
}


function createFloatingGif(){
  const img = document.createElement("img");
  const num = Math.floor(Math.random()*10)+1;
  img.src = "gif/" + num + ".gif";

  const depth = Math.random();
  let size = 100;
  let speed = 0.4;

  if(depth < 0.3){
    size = Math.random()*70+20;
    speed = 0.15;
    img.style.opacity = "0.35";
    img.style.zIndex = "1";
  }else if(depth < 0.75){
    size = Math.random()*300+120;
    speed = 0.45;
    img.style.opacity = "0.7";
    img.style.zIndex = "3";
  }else if(depth < 0.93){
  size = Math.random()*700+350;
  speed = 0.25;
  img.style.opacity = "0.9";
  img.style.zIndex = "6";
}else{
  size = Math.random()*1800+1200;
  speed = 0.08;
  img.style.opacity = "0.55";
  img.style.zIndex = "7";
}

  img.style.width = size + "px";
  setupFloating(img, speed);
}

function createFloatingImage(){
  const img = document.createElement("img");
  const num = Math.floor(Math.random()*8)+1;
  img.src = "image/" + num + ".png";

  const depth = Math.random();
  let size = 80;
  let speed = 0.3;

  if(depth < 0.3){
    size = Math.random()*45+15;
    speed = 0.12;
    img.style.opacity = "0.3";
    img.style.zIndex = "1";
  }else if(depth < 0.75){
    size = Math.random()*220+70;
    speed = 0.28;
    img.style.opacity = "0.65";
    img.style.zIndex = "2";
  }else if(depth < 0.93){
  size = Math.random()*500+240;
  speed = 0.2;
  img.style.opacity = "0.85";
  img.style.zIndex = "5";
}else{
  size = Math.random()*1500+900;
  speed = 0.07;
  img.style.opacity = "0.45";
  img.style.zIndex = "7";
}

  img.style.width = size + "px";
  setupFloating(img, speed);
}

function setupFloating(img, speed){
  container.appendChild(img);

  floatingObjects.push({
    img: img,
    x: Math.random()*window.innerWidth,
    y: Math.random()*window.innerHeight,
    vx: (Math.random()-0.5)*speed,
    vy: (Math.random()-0.5)*speed,
    rotate: Math.random()*360,
    rotateSpeed: (Math.random()-0.5)*0.25
  });
}

document.addEventListener("keydown", function(e){

  startBgm();

  if(e.code === "Space"){
    e.preventDefault();
    playOneShot(soundM3);
    spawnMoji();
    return;
  }

  if(e.code === "Enter"){
    e.preventDefault();

    if(enterSoundToggle){
      playOneShot(soundM1);
    }else{
      playOneShot(soundM2);
    }

    enterSoundToggle = !enterSoundToggle;

    spawnAnime();
    return;
  }

  if(e.key >= "0" && e.key <= "9"){
    playOneShot(soundM4);

    const num = e.key === "0" ? 10 : Number(e.key);

    if(num === 1){
      spawnFixedGif(num);
    }else{
      spawnBurstGif(num);
    }
  }

});

function spawnFixedGif(num){
  const img = document.createElement("img");

  img.src = "gif/" + num + ".gif";
  img.style.left = "50%";
  img.style.top = "50%";
  img.style.width = "1200px";
  img.style.zIndex = "10";
  img.style.opacity = "0";
  img.style.transform = "translate(-50%,-50%) scale(0.05)";

  container.appendChild(img);

  let scale = 0.05;
  let opacity = 0;

  function loop(){
    scale += 0.015;
    opacity += 0.012;

    if(opacity > 1) opacity = 1;

    img.style.opacity = opacity;
    img.style.transform = "translate(-50%,-50%) scale(" + scale + ")";

    if(scale >= 1.8){
      img.remove();
      return;
    }

    requestAnimationFrame(loop);
  }

  loop();
}

function spawnBurstGif(num){
  const pieces = 8;

  for(let i=0; i<pieces; i++){
    const img = document.createElement("img");

    let x = window.innerWidth/2;
    let y = window.innerHeight/2;

    const angle = (Math.PI*2/pieces)*i + Math.random()*0.7;
    const speed = Math.random()*12+7;

    let vx = Math.cos(angle)*speed;
    let vy = Math.sin(angle)*speed;

    let scale = 0.08;
    let opacity = 0;
    let rotation = Math.random()*360;
    let rotationSpeed = (Math.random()-0.5)*12;
    let life = 0;

    const depth = Math.random();
    let burstSize;

    if(depth < 0.3){
      burstSize = Math.random()*140+50;
    }else if(depth < 0.75){
      burstSize = Math.random()*520+260;
    }else{
      burstSize = Math.random()*1300+700;
    }

    img.src = "gif/" + num + ".gif";
    img.style.left = x + "px";
    img.style.top = y + "px";
    img.style.width = burstSize + "px";
    img.style.zIndex = "9";
    img.style.opacity = "0";
    img.style.transform = "translate(-50%,-50%) scale(0.08)";

    container.appendChild(img);

    function loop(){
      life++;

      x += vx;
      y += vy;

      vx *= 0.94;
      vy *= 0.94;

      scale += 0.022;
      rotation += rotationSpeed;

      if(life < 15){
        opacity += 0.08;
      }else{
        opacity -= 0.018;
      }

      if(opacity > 1) opacity = 1;

      if(opacity <= 0 || life > 80){
        img.remove();
        return;
      }

      img.style.left = x + "px";
      img.style.top = y + "px";
      img.style.opacity = opacity;
      img.style.transform =
        "translate(-50%,-50%) scale(" + scale + ") rotate(" + rotation + "deg)";

      requestAnimationFrame(loop);
    }

    loop();
  }
}

function spawnMoji(){
  const folder = useBlack ? "BLACK" : "WHITE";
  const prefix = useBlack ? "D" : "H";
  const total = useBlack ? 155 : 151;

  useBlack = !useBlack;

  const donutRadius = Math.min(window.innerWidth, window.innerHeight)*0.21;
  const startRadius = Math.max(window.innerWidth, window.innerHeight)*1.1;

  for(let i=1; i<=total; i+=3){
    setTimeout(function(){
      const img = document.createElement("img");

      img.src = "MOJI/" + folder + "/" + prefix + "_" + i + ".PNG";

      if(folder === "WHITE"){
        img.classList.add("whiteMoji");
      }

      const size = Math.random()*90+40;

      img.style.width = size + "px";
      img.style.zIndex = "8";

      container.appendChild(img);

      mojiObjects.push({
        img: img,
        size: size,
        angle: Math.random()*Math.PI*2,
        progress: 0,
        phase: "donut",
        donutRadius: donutRadius,
        startRadius: startRadius,
        coreTime: 0,
        coreAngle: Math.random()*Math.PI*2,
        coreRadius: Math.random()*75,
        rotation: Math.random()*360,
        rotationSpeed: (Math.random()-0.5)*8,
        avoidMouse: Math.random() < 0.45
      });
    }, i*18);
  }
}

function spawnAnime(){
  const files = [
    "anime1.gif",
    "anime2.gif",
    "anime3.png",
    "anime4.png",
    "anime5.png",
    "anime6.png",
    "anime7.gif",
    "anime8.gif"
  ];

  const file = files[Math.floor(Math.random()*files.length)];
  const img = document.createElement("img");

  img.src = "ANIME/" + file;

  img.style.left = "50%";
  img.style.top = "50%";
  img.style.objectFit = "cover";
  img.style.opacity = "0";
  img.style.zIndex = "4";

  const hugeTargets = [
    "anime3.png",
    "anime4.png",
    "anime5.png",
    "anime6.png"
  ];

  if(hugeTargets.indexOf(file) !== -1){
    const scale = Math.random()*3.5+1.5;
    img.style.width = (window.innerWidth * scale) + "px";
    img.style.height = "auto";
  }else{
    img.style.width = "100vw";
    img.style.height = "100vh";
  }

  img.style.transform = "translate(-50%,-50%)";

  container.appendChild(img);
  animeObjects.push(img);
  setTimeout(function(){

  if(img.parentNode){
    fadeAndRemove(img);

    const index =
    animeObjects.indexOf(img);

    if(index !== -1){
      animeObjects.splice(index,1);
    }
  }

}, 7000);

  if(animeObjects.length > 5){
    const old = animeObjects.shift();
    fadeAndRemove(old);
  }

  const rotateTargets = [
    "anime2.gif",
    "anime3.png",
    "anime4.png",
    "anime5.png",
    "anime6.png"
  ];

  let opacity = 0;
  let rot = 0;
  const shouldRotate = rotateTargets.indexOf(file) !== -1;

  function loop(){
    if(!img.parentNode) return;

    opacity += 0.05;
    if(opacity > 1) opacity = 1;

    if(shouldRotate){
      rot += 0.5;
    }

    img.style.opacity = opacity;
    img.style.transform =
      "translate(-50%,-50%) rotate(" + rot + "deg)";

    requestAnimationFrame(loop);
  }

  loop();
}

function fadeAndRemove(img){
  let opacity = 1;

  function fade(){
    opacity -= 0.05;

    if(opacity <= 0){
      img.remove();
      return;
    }

    img.style.opacity = opacity;
    requestAnimationFrame(fade);
  }

  fade();
}

function applyMouseAvoidance(x, y, m){
  if(!m.avoidMouse){
    return {x:x, y:y};
  }

  const dx = x - mouseX;
  const dy = y - mouseY;
  const distance = Math.sqrt(dx*dx + dy*dy);

  const avoidRadius = 180;
  const avoidPower = 75;

  if(distance > 0 && distance < avoidRadius){
    const force = (avoidRadius - distance) / avoidRadius;

    x += (dx / distance) * force * avoidPower;
    y += (dy / distance) * force * avoidPower;
  }

  return {x:x, y:y};
}

function animate(){

  for(let i=0; i<floatingObjects.length; i++){
    const g = floatingObjects[i];

    g.x += g.vx;
    g.y += g.vy;
    g.rotate += g.rotateSpeed;

    if(g.x < -1300) g.x = window.innerWidth+800;
    if(g.x > window.innerWidth+1300) g.x = -800;
    if(g.y < -1300) g.y = window.innerHeight+800;
    if(g.y > window.innerHeight+1300) g.y = -800;

    g.img.style.left = g.x + "px";
    g.img.style.top = g.y + "px";
    g.img.style.transform = "rotate(" + g.rotate + "deg)";
  }

  for(let i=mojiObjects.length-1; i>=0; i--){
    const m = mojiObjects[i];

    if(m.phase === "donut"){
      updateDonut(m);
    }else{
      updateCore(m, i);
    }
  }

  requestAnimationFrame(animate);
}

function updateDonut(m){
  m.progress += 0.012;

  const radius =
    m.donutRadius +
    (m.startRadius - m.donutRadius) *
    (1 - m.progress);

  const spinAngle = m.angle + m.progress * 4;

  let x = window.innerWidth / 2 + Math.cos(spinAngle) * radius;
  let y = window.innerHeight / 2 + Math.sin(spinAngle) * radius;

  const avoided = applyMouseAvoidance(x, y, m);

  x = avoided.x;
  y = avoided.y;

  m.rotation += m.rotationSpeed;

  m.img.style.left = (x - m.size / 2) + "px";
  m.img.style.top = (y - m.size / 2) + "px";
  m.img.style.transform = "rotate(" + m.rotation + "deg)";
  m.img.style.opacity = "1";

  if(m.progress >= 1){
    m.phase = "core";
  }
}

function updateCore(m, index){
  m.coreTime += 0.018;

  const swirl = m.coreAngle + m.coreTime * 4;
  const pulse = Math.sin(m.coreTime * 8) * 18;

  let x =
    window.innerWidth / 2 +
    Math.cos(swirl) * (m.coreRadius + pulse);

  let y =
    window.innerHeight / 2 +
    Math.sin(swirl) * (m.coreRadius + pulse);

  const avoided = applyMouseAvoidance(x, y, m);

  x = avoided.x;
  y = avoided.y;

  m.rotation += m.rotationSpeed * 1.5;

  const coreScale = 1 + Math.sin(m.coreTime * 10) * 0.12;

  m.img.style.left = (x - m.size / 2) + "px";
  m.img.style.top = (y - m.size / 2) + "px";

  m.img.style.transform =
    "rotate(" + m.rotation + "deg) scale(" + coreScale + ")";

  if(m.coreTime > 2.4){
    m.img.style.opacity = 1 - ((m.coreTime - 2.4) / 1.2);
  }

  if(m.coreTime > 3.6){
    m.img.remove();
    mojiObjects.splice(index, 1);
  }
}

animate();

});