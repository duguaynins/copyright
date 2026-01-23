document.head.insertAdjacentHTML('beforeend', `
<style>
    body { margin: 0; touch-action: pan-x; font-family: sans-serif; }
    /* 懸浮圓圈 */
    #ptr {
        position: fixed; top: 20px; left: 50%; transform: translate(-50%, -100px);
        width: 40px; height: 40px; background: white; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2); z-index: 99; opacity: 0;
    }
    /* 進度條動畫 */
    #svg { transform: rotate(-90deg); }
    .loading #svg { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(270deg); } }
</style>
`);

document.body.insertAdjacentHTML('beforeend', `
<div id="ptr">
    <svg id="svg" width="30" height="30">
        <circle cx="15" cy="15" r="12" fill="none" stroke="#eee" stroke-width="3" />
        <circle id="p" cx="15" cy="15" r="12" fill="none" stroke="#007bff" 
                stroke-width="3" stroke-dasharray="75.4" stroke-dashoffset="75.4" />
    </svg>
</div>

<script>
    const ptr = document.getElementById('ptr'), p = document.getElementById('p');
    let startY = 0, pulling = false;

    window.addEventListener('pointerdown', e => {
        if (window.scrollY > 5) return;
        startY = e.pageY; pulling = true;
        ptr.style.transition = 'none';
    });

    window.addEventListener('pointermove', e => {
        if (!pulling || e.pageY < startY) return;
        const move = Math.min((e.pageY - startY) * 0.4, 80);
        ptr.style.opacity = 1;
        ptr.style.transform = `translate(-50%, ${move - 60}px)`;
        p.style.strokeDashoffset = 75.4 * (1 - Math.min(move / 60, 1));
    });

    window.addEventListener('pointerup', e => {
        if (!pulling) return;
        pulling = false;
        ptr.style.transition = 'all 0.3s ease';
        
        if ((e.pageY - startY) * 0.4 > 60) {
            ptr.style.transform = 'translate(-50%, calc(50vh - 20px))';
            ptr.classList.add('loading');
            setTimeout(() => { p.style.stroke = "#28a745"; }, 333);
            setTimeout(() => { location.reload(); }, 999);
        } else {
            ptr.style.transform = 'translate(-50%, -100px)';
            ptr.style.opacity = 0;
        }
    });
</script>
`);
