document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes ninsStart {
  from { opacity: 1; }
  to { opacity: 0; }
}
.ninsfadeoutNodelay { 
  pointer-events: none; 
  animation: ninsStart 3s forwards; 
}
.ninsfadeoutAdelay { 
  pointer-events: none; 
  animation: ninsStart 2.20s forwards 0.58s;
  /* transform: translateZ(0); */
}
.zIndex {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: auto;
}
</style>
`);

document.body.insertAdjacentHTML('beforeend', `
<audio id="NinsXmas" style="display:none;" src="https://copyright.nins.cc/children/2025/xmas.mp3" loop ></audio>
<button id="startOverlay" disabled
  onclick="this.classList.add('ninsfadeoutNodelay');document.getElementById('NinsXmas').play();document.getElementById('NinsXmas').loop = false;"
  style="
  position: fixed;
  bottom: 0;
  top: 0; /* 距離頂部 0 */
  left: 0; /* 距離左側 0 */
  right: 0; /* 距離右側 0 */
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  margin: 0;
  cursor: default;
  display: flex;
  flex-direction: column;
  font-size: 2vw;
  z-index: 99998;">
    <br>
    <span id="say" style="color: #777; font-weight:700;">Give a "Vivre Card/Soul Paper" to everything that matters!”</span>
    
    <img src="https://copyright.nins.cc/children/2025/xmas.png" style=" vertical-align: middle;">
    <span translate="no" id="merryXmas" style="display: none;"></span>
    
    <br>
    <u id="ads" translate="no" style="color: #2222ff; font-weight:700;">https://2025.uris.nins.cc/</u>
    <progress id="progress" value="0" max="3000"></progress>
    <span id="time" translate="no">0 ms</span>
    <br>
</button>
`);

function startSkipAdsProgress() {
    const progress = document.getElementById("progress");
    const timeText = document.getElementById("time");

    const totalTime = Number(progress.max); // 直接讀 max
    const interval = 50;

    let current = 0;
    progress.value = 0;
    timeText.textContent = "0 ms";

    ///setTimeout(update, 16);
    ///setTimeout( () => { document.getElementById("DialogAds").classList.add("disabled") }, 3);
    ///setTimeout( () => { document.getElementById("DialogAds").classList.remove("disabled") }, 3000);
    ///setTimeout( () => { document.getElementById("startOverlay").classList.add("disabled") }, 3);
    ///setTimeout( () => { document.getElementById("startOverlay").classList.remove("disabled") }, 3000);
    setTimeout( () => { document.getElementById("startOverlay").disabled = true; }, 3);
    setTimeout( () => { document.getElementById("startOverlay").disabled = false; }, 3000);

    const timer = setInterval(() => {
      current += interval;
      progress.value = current;
      timeText.textContent = current + " ms";

      if (current >= totalTime) {
        progress.value = totalTime;
        ///progress.style.setProperty('--progress-color', '#4caf50'); // 綠色
        clearInterval(timer);
        timeText.textContent = "done!";
        timeText.textContent = "skip?!";
      }
    }, interval);
}

///startSkipAdsProgress();
setTimeout( () => { startSkipAdsProgress(); }, 1000);
