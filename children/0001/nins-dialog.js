document.body.insertAdjacentHTML('beforeend', `
    <dialog id="DialogCheck" translate="no">
        <pre id="logOutput" style="max-height:200px; overflow:auto; margin:0;">...</pre>
        <button style="width: 100%;" onclick="document.getElementById('DialogCheck').close();console.log(new Date().toLocaleString(), '🙈');">↩️</button>
    </dialog>
`);

/*
document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", e => {  ///***
        if (e.target === dialog) {
            dialog.close();
        }
    });
    dialog.addEventListener("click", function (event) {
    const rect = this.getBoundingClientRect();
    const isInDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

    if (!isInDialog) {
        this.close();
    }
    });
});  */



const dialog = document.getElementById('DialogCheck');
///const logOutput = document.getElementById('logOutput');
const logOutput = document.getElementById('DialogCheck').getElementsByTagName('pre')[0];

// 攔截 console.log 與 console.error
['log', 'error'].forEach(level => {
  const original = console[level];
  console[level] = function(...args) {
    original.apply(console, args);
    const message = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' ');
    logOutput.insertAdjacentHTML('beforeend', `<div class="${level}">${message}</div>`);
    // 滾動到底部
    logOutput.scrollTop = logOutput.scrollHeight;
  };
});

// 測試
const version = (new Date().toLocaleString(), 'v1.20251203.1315 (This is an error test.)');
///console.error(version);
///console.warn(version);
console.info(version);
console.log(version);





