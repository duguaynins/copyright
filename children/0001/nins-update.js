document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes ninsStart {
  from { opacity: 1; }
  to { opacity: 0; }
}
.ninsStartNodelay { 
  pointer-events: none; 
  animation: ninsStart 3s forwards; 
}
.ninsStartAdelay { 
  pointer-events: none; 
  animation: ninsStart 2.2s forwards 1.0s;
  transform: translateZ(0);
}
.ninsStartAdelay_v1 { 
  pointer-events: none; 
  animation-name: ninsStart;      /* 指定動畫 */
  animation-duration: 2.2s;       /* 動畫持續時間 */
  animation-delay: 0.8s;          /* 延遲開始時間 */
  animation-fill-mode: forwards; /* 動畫結束保持最終狀態 */ 
}
</style>
`);
document.body.insertAdjacentHTML('beforeend', `
<button class="zIndex ninsStartAdelay" style="z-index: 99999;  /* 確保在最高層 */
  cursor: default;
  /*background: linear-gradient(white, transparent);*/
  background: white;
" disabled></button>
`);


function isSameMinute(timestamp1, timestamp2) {
  const date1 = new Date(Number(timestamp1));
  const date2 = new Date(Number(timestamp2));

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  );
}

function isOver000ms(timestamp1, timestamp2) {
  return Math.abs(Number(timestamp2) - Number(timestamp1)) > 5800;
}
function notOver000ms(timestamp1, timestamp2) {
  return Math.abs(Number(timestamp2) - Number(timestamp1)) <= 5800;
}

///(function () {  })();
function updateVer_v0(print=null) {  
  // 變成奇數次都會強制刷新
      if (sessionStorage.getItem('reloaded') !== 'true') {
        sessionStorage.setItem('reloaded', 'true');
        window.location.reload(true);
      } else {
        sessionStorage.setItem('reloaded', 'false');
        ///sessionStorage.removeItem('reloaded');
      }
}


function updateVer(print=null) {
  const url = new URL(window.location.href);
  const t = url.searchParams.get('t');
  const now = Date.now();

  // 判斷是否已有時間戳
  if (url.searchParams.has('t')) {  // 有
    const times = url.searchParams.get('t');
    
    if ( notOver000ms(times, Date.now()) ) {  ///isSameMinute(times, Date.now())
      if (sessionStorage.getItem('reloaded') !== 'true') {
        sessionStorage.setItem('reloaded', 'true');
        window.location.reload(true);
      } else {
        sessionStorage.setItem('reloaded', 'false');
      }
    }
    else {
      url.searchParams.delete('t');
      url.searchParams.append('t', Date.now());
      ///url.searchParams.set('t', Date.now());
      sessionStorage.setItem('reloaded', 'false');
      window.location.replace(url.toString());  // 使用 replace，避免無限返回
    }
  }
  if (!url.searchParams.has('t')) {  // 無
    if (true) {
      url.searchParams.delete('t');
      url.searchParams.append('t', Date.now());
      ///url.searchParams.set('t', Date.now());
      sessionStorage.setItem('reloaded', 'false');
      window.location.replace(url.toString());  // 使用 replace，避免無限返回
    }
  }
}
///updateVer();
setTimeout(updateVer, 1);
///setInterval(updateVer, 1);
///setInterval(() => updateVer(true), 1);

function updateTime(print=null) {
  const now = new Date();

  // 取得 UTC 時間
  const utcTime = new Date();  /// + now.getTimezoneOffset() * 60000

  // 取得本地時區相對 UTC 的時差（小時）
  const offsetMinutes = -now.getTimezoneOffset(); // 注意符號，getTimezoneOffset 回傳與 UTC 的差值（分鐘），UTC-本地）
  const offsetHours = offsetMinutes / 60;
  const sign = offsetHours >= 0 ? '+' : '-';
  ///document.getElementById("utc-offset").textContent = `${sign}${Math.abs(offsetHours)} 小時`;
  const hours = String(Math.abs(Math.round(offsetHours))).padStart(2, '0'); // 兩位數
  const minutes = String(Math.abs(offsetMinutes)%60).padStart(2,'0');

  const offset = `${sign}${hours}:${minutes}`;
  const times = utcTime.toISOString().replace('T', 'T');/// + "" + `${sign}${hours}:${minutes}`;
  ///console.log(`${times}`);

  ///document.getElementById("utc-offset").textContent = `${sign}${hours}:${minutes}`;
  ///document.getElementById("utc-time").textContent = utcTime.toISOString();  ///.replace('T', 'T') + "" + `${sign}${hours}:${minutes}`;  ///.split('.')[0];
    
  if (print) { console.log(`${times}`); }
  else { }

  return [times, offset]
}
///updateTime(); // 先執行一次
setTimeout(updateTime, 1); // 幾時之後只執行一次
///setInterval(updateTime, 1); // 每幾時之後執行一次
///setInterval(() => updateTime(), 1);










