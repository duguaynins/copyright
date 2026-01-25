document.body.appendChild(Object.assign(document.createElement('div'), {
  id: 'ptr',
  style: 'position: fixed; inset: 0; z-index: 909095800; background: white; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none;', 
  innerHTML: `
    <div id="progress-text" style="font-size: 3rem; font-weight: bold; color: #007bff; font-family: sans-serif;">%</div>
  `
}));

document.head.appendChild(Object.assign(document.createElement('style'), {
    textContent: `
    body { margin: 0; touch-action: pan-x; }
    .loading #progress-text { animation: pulse 0.8s infinite alternate; }
    @keyframes pulse { from { transform: scale(1); } to { transform: scale(1.1); } }
    `
}));

document.body.appendChild(Object.assign(document.createElement('script'), { 
    textContent: `
    const ptr = document.getElementById('ptr'), 
          txt = document.getElementById('progress-text');
    let startY = 0, pulling = false;

    window.addEventListener('pointerdown', e => {
        // 1. 確保頁面是在最頂端 (容許 5px 內的微小偏移)
        const isAtTop = window.scrollY <= 5;

        // 2. 限制手指必須點擊在螢幕上方 15% 的區域內 (動態計算比固定 100px 更準確)
        const touchZoneHeight = window.innerHeight * 0.15; 
        const isInZone = e.clientY < touchZoneHeight;

        if (!isAtTop || !isInZone) return;
        ///if (window.scrollY > 5 || e.clientY > 100) return;

        startY = e.pageY; 
        pulling = true;
        ptr.style.transition = 'none';
    });

    window.addEventListener('pointermove', e => {
        if (!pulling || e.pageY < startY) return;
        
        // 下拉距離計算 (0 到 150px 區間)
        const diff = e.pageY - startY;
        const move = Math.min(diff * 0.5, 100); 
        
        // 透明度隨進度增加 (0 到 1)
        const progress = Math.min(move / 80, 1);
        ptr.style.opacity = progress;
        
        // 數字百分比顯示
        const percent = Math.floor(progress * 100);
        ///txt.innerText = percent + '%';
        
        // 稍微給文字一點位移感
        ///txt.style.transform = 'translateY(' + (20 - (progress * 20)) + 'px)';
    });

    window.addEventListener('pointerup', e => {
        if (!pulling) return;
        pulling = false;
        
        const diff = e.pageY - startY;
        if (diff * 0.5 > 80) {
            // 觸發重新整理
            ptr.style.transition = 'opacity 0.3s ease';
            ptr.style.opacity = 1;
            ///txt.innerText = '100%';
            ptr.classList.add('loading');
            ptr.style.background = "#007bff";
            
            setTimeout(() => { 
                ///txt.innerText = 'Updating...';
                ///txt.style.color = "#28a745";
                ptr.style.background = "#28a745";
                txt.style.color = "#ffffff";
            }, 200);
            
            setTimeout(() => { location.reload(); }, 800);
        } else {
            // 取消：全螢幕淡出
            ptr.style.transition = 'opacity 0.3s ease';
            ptr.style.opacity = 0;
        }
    });
    `
}));

/*
document.body.appendChild(Object.assign(document.createElement('div'), {
  id: 'ptr',
  style: 'position: absolute; z-index: 909095800;', 
  innerHTML: `
    <svg id="svg" width="30" height="30">
        <circle cx="15" cy="15" r="12" fill="none" stroke="#eee" stroke-width="3" />
        <circle id="p" cx="15" cy="15" r="12" fill="none" stroke="#007bff" 
                stroke-width="3" stroke-dasharray="75.4" stroke-dashoffset="75.4" />
    </svg>
  `
}));

document.head.appendChild(Object.assign(document.createElement('style'), {
    textContent: `
    body { margin: 0; touch-action: pan-x; font-family: sans-serif; }
    #ptr {
        position: fixed; 
        bottom: 50px; 
        left: 50%; 
        transform: translate(-50%, 100px); 
        width: 40px; height: 40px; background: white; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 -3px 10px rgba(0,0,0,0.2); z-index: 99; opacity: 0;
    }
    #svg { transform: rotate(-90deg); }
    .loading #svg { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(270deg); } }
    `
}));

document.body.appendChild(Object.assign(document.createElement('script'), { 
    textContent: `
    const ptr = document.getElementById('ptr'), p = document.getElementById('p');
    let startY = 0, pulling = false;

    window.addEventListener('pointerdown', e => {
        if (window.scrollY > 5) return; // 依然只在頁面頂端觸發
        startY = e.pageY; 
        pulling = true;
        ptr.style.transition = 'none';
    });

    window.addEventListener('pointermove', e => {
        if (!pulling || e.pageY < startY) return; // 保持向下滑動觸發
        
        const move = Math.min((e.pageY - startY) * 0.4, 80); 
        ptr.style.opacity = 1;

        ptr.style.transform = 'translate(-50%, ' + (60 - move) + 'px)';
        p.style.strokeDashoffset = 75.4 * (1 - Math.min(move / 60, 1));
    });

    window.addEventListener('pointerup', e => {
        if (!pulling) return;
        pulling = false;
        ptr.style.transition = 'all 0.3s ease';
        
        if ((e.pageY - startY) * 0.4 > 60) {
            // 觸發後，讓它停留在一個中間高度或升至螢幕中央
            ptr.style.transform = 'translate(-50%, -100px)'; 
            ptr.classList.add('loading');
            setTimeout(() => { p.style.stroke = "#28a745"; }, 222);
            setTimeout(() => { location.reload(); }, 999);
        } else {
            // 取消時，縮回螢幕底部下方
            ptr.style.transform = 'translate(-50%, 100px)';
            ptr.style.opacity = 0;
        }
    });
    `
}));

*/
