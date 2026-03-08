
document.body.insertAdjacentHTML('beforeend', `
<audio id="NinsXmas" style="display:none;" src="https://copyright.nins.cc/children/2025/xmas.mp3" loop ></audio>

<button class="zIndex ninsfadeoutAdelay" style="z-index: 99999;
  cursor: default; border: none; outline: none;
  background: white;
" disabled></button>

<button class="zIndex" style="z-index: 99998;" 
  onclick="this.classList.add('ninsfadeoutNodelay'); 
           if (document.getElementById('checkBGM').checked) { document.getElementById('NinsXmas').play(); /*document.getElementById('NinsXmas').pause();*/ } ">
    <p translate="no" id="merryXmas">!!!</p>
    <p translate="yes" id="ninsForms">???</p>
    <input type="checkbox" id="checkBGM" onchange="">
</button>
`);

document.getElementById('merryXmas').innerHTML = "☃️🦌🎄✨⭐<br>[ © nins ] x [ Merry Xmas Snow ]";
document.getElementById('ninsForms').innerHTML = `[<a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSct8PaArwmkAv10Eh5CEybu_88IoSj9V_QOLy07KiL6efu10g/viewform">Co-founders</a>]`;
/*
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        if (window.location.protocol === "https:") {
            console.log("HTTPS:");
        } else if (window.location.protocol === "http:") {
            console.log("HTTP:");
        }
    }
}, { once: true });  */

/*
document.body.insertAdjacentHTML('beforeend', `
<audio id="NinsXmas" style="display:none;" src="https://copyright.nins.cc/children/2025/xmas.mp3" loop ></audio>

<button class="zIndex" style="z-index: 99998;" 
  onclick="this.classList.add('ninsStartAdelay'); document.getElementById('NinsXmas').play(); document.getElementById('NinsXmas').pause();">
    <span translate="no" id="merryXmas">!!!</span>
</button>

<button class="zIndex ninsStartAdelay" style="z-index: 99999;
  cursor: default; border: none; outline: none;
  background: white;
" disabled></button>
`);

document.getElementById('merryXmas').innerHTML = "☃️🦌🎄✨⭐<br>[ © nins ] x [ Merry Xmas 2025 ]";
*/

// snow.css
/*
document.head.appendChild(
  Object.assign(document.createElement('style'), {
    textContent: `
.snow {
    position: fixed;
    top: -50px;
    color: white;
    user-select: none;
    pointer-events: none;
    z-index: 100001;
    text-shadow: 0 0 5px rgba(255,255,255,0.5);
    will-change: transform, opacity;
}

.snow.bright {
    text-shadow: 0 0 10px rgba(255,255,255,0.9),
                 0 0 20px rgba(255,255,255,0.4);
    font-weight: bold;
}

@keyframes fall {
    0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
    }
    10% { opacity: 1; }
    50% {
        transform: translate(var(--drift), 40vh) rotate(180deg);
    }
    80% { opacity: 0.8; }
    100% {
        transform: translate(calc(var(--drift) * 1.5), var(--end-y)) rotate(360deg);
        opacity: 0;
    }
}
`
  })
);  */

const style = document.createElement('style');
style.textContent = `
.snow {
    position: fixed;
    top: -50px;
    color: white;
    user-select: none;
    pointer-events: none;
    z-index: 100001;
    text-shadow: 0 0 5px rgba(255,255,255,0.5);
    will-change: transform, opacity;
}

.snow.bright {
    text-shadow: 0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.4);
    font-weight: bold;
}

@keyframes fall {
    0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    50% {
        transform: translate(var(--drift), 40vh) rotate(180deg);
    }
    80% {
        opacity: 0.8;
    }
    100% {
        transform: translate(calc(var(--drift) * 1.5), var(--end-y)) rotate(360deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);


// snow.js

(function() {
    const snowIcons = ['❅', '❆', '•']; 

    function createSnow() {
        if (document.hidden) return; 

        const snow = document.createElement('div');
        snow.className = 'snow';
        snow.innerHTML = snowIcons[Math.floor(Math.random() * snowIcons.length)];
        
        const startLeft = Math.random() * 100;
        const sizeRand = Math.random();
        let size = 10;
        
        // 隨機決定消失的高度 (60vh 到 110vh 之間)
        const endY = Math.random() * 50 + 60; 

        if (sizeRand > 0.9) {
            size = Math.random() * 15 + 20; 
            snow.classList.add('bright');
        } else if (sizeRand > 0.6) {
            size = Math.random() * 5 + 15;
        } else {
            size = Math.random() * 5 + 8;
        }
        
        // 隨機下落時間
        const duration = (Math.random() * 4 + 4) * (endY / 100); 
        const drift = (Math.random() - 0.5) * 150;
        
        // 設置 CSS 變數
        snow.style.setProperty('--drift', `${drift}px`);
        snow.style.setProperty('--end-y', `${endY}vh`);
        
        snow.style.left = startLeft + 'vw';
        snow.style.fontSize = size + 'px';
        snow.style.animation = `fall ${duration}s linear forwards`;
        
        snow.style.opacity = Math.random() * 0.4 + 0.6;

        if (size < 12) {
            snow.style.filter = `blur(1.5px)`;
        }

        document.body.appendChild(snow);

        snow.addEventListener('animationend', () => {
            snow.remove();
        });
    }

    // 初始化下雪
    setInterval(createSnow, 150); 
    for (let i = 0; i < 60; i++) { setTimeout(createSnow, i * 30); }
    /*
    window.addEventListener('DOMContentLoaded', () => {
        setInterval(createSnow, 150); 
        // 初始噴發一些雪花
        for(let i=0; i<15; i++) {
            setTimeout(createSnow, i * 150);
        }
    });  */
})();
