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
    /* 圓圈初始改為固定在底部，並往下偏移隱藏 */
    #ptr {
        position: fixed; 
        bottom: 50px; /* 距離底部的位置 */
        left: 50%; 
        transform: translate(-50%, 100px); /* 初始位置在螢幕下方 100px */
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

        /* 重點修改：
           雖然手向下移 (move 是正值)，但我們讓 translate 的 Y 軸從 60 變到 -20
           這樣視覺上圓圈就會從下方「往上浮現」
        */
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
