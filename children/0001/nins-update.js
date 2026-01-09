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

///(function () {  })();
function updateVer(auto=null) {
  const url = new URL(window.location.href);

  // 判斷是否已有時間戳
  if (url.searchParams.has('t')) {  // 有
    const times = url.searchParams.get('t');
    if (isSameMinute(times, Date.now()) ) {
      null;
    }
    else {
      url.searchParams.set('t', Date.now());
      window.location.replace(url.toString());  // 使用 replace，避免無限返回
    }
  }
  if (!url.searchParams.has('t')) {  // 無
    if (true) {
      url.searchParams.set('t', Date.now());
      window.location.replace(url.toString());  // 使用 replace，避免無限返回
    }
  }
}
updateVer();


function updateTime(auto=null) {
  const now = new Date();

  // 取得 UTC 時間
  const utcTime = new Date();  /// + now.getTimezoneOffset() * 60000
  ///const utcTime = new Date(now.getTime());  /// + now.getTimezoneOffset() * 60000
  ///document.getElementById("utc-time").textContent = utcTime.toISOString()  ///.replace('T', 'T_')  ///.split('.')[0];

  // 取得本地時區相對 UTC 的時差（小時）
  const offsetMinutes = -now.getTimezoneOffset(); // 注意符號，getTimezoneOffset 回傳與 UTC 的差值（分鐘），UTC-本地）
  const offsetHours = offsetMinutes / 60;
  const sign = offsetHours >= 0 ? '+' : '-';
  ///document.getElementById("utc-offset").textContent = `${sign}${Math.abs(offsetHours)} 小時`;
  const hours = String(Math.abs(Math.round(offsetHours))).padStart(2, '0'); // 兩位數
  const minutes = String(Math.abs(offsetMinutes)%60).padStart(2,'0');

  const times = utcTime.toISOString().replace('T', 'T') + "" + `${sign}${hours}:${minutes}`;
  ///console.log(`${times}`);

  document.getElementById("utc-offset").textContent = `${sign}${hours}:${minutes}`;
  document.getElementById("utc-time").textContent = utcTime.toISOString();  ///.replace('T', 'T') + "" + `${sign}${hours}:${minutes}`;  ///.split('.')[0];
  if (auto) { 
    ///setInterval(updateTime, 50); 
    setInterval(() => updateTime(true), 50);
  }  // 每幾時更新一次
  else {
    console.log(`${times}`);
  }

  return times
}

updateTime();
