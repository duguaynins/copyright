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

(function () {
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
})();