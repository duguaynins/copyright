document.body.insertAdjacentHTML('beforeend', `
    <dialog id="DialogTrans" translate="no">
        <div id="google_translate_element" style="display:block;"></div>
    </dialog>
`);

// GOOGLE TRANSLATE

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',  ///'en', 改為根據中間語言(ilang) 或 頁面語言(locale)  ///鼓勵輸入中間語言，翻譯必定可以顯示英文。
        includedLanguages: '',  ///zh-TW,ja,ko,en,hi,zh-CN
        autoDisplay: false,
        ///layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

function waitForCombo(callback) {
// 等待載入翻譯語言
// 這是一種調用方法？ 並且使用方法的內部變數？
const timer = setInterval(() => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
    clearInterval(timer);
    callback(combo);
    }
}, 300);
}

function waitForTranslationById(elementId, callback) {
    // 等待頁面翻譯完成
    const target = document.getElementById(elementId);
    if (!target) return;

    const observer = new MutationObserver((mutations, obs) => {
        for (const mutation of mutations) {
        // 偵測子節點或文字內容是否改變
        if (mutation.type === "childList" || mutation.type === "characterData") {
            obs.disconnect(); // 翻譯完成，停止觀察
            callback();
            break;
        }
        }
});

observer.observe(target, {
    childList: true,   // 子節點增減
    subtree: true,     // 包含所有子孫節點
    characterData: true // 文字內容改變
});
}

function autoTranslate(lang) {
    const tryTranslate = () => {
        const combo = document.querySelector('.goog-te-combo');
        console.log('combo?', !!combo);
        
        if (lang.replace(/_/g, "-").split("-")[0] === "en") {
        ///document.getElementById("input_msg").style.display = "block";
        ///document.getElementById("input_msgbtn").style.display = "block";
        document.getElementById("content").style.background = "#008000";
        ///document.getElementById('Input').textAlign = 'center';
        }

        waitForTranslationById('notice', () => {
        ///document.getElementById("input_msg").style.display = "block";
        ///document.getElementById("input_msgbtn").style.display = "block";
        document.getElementById("content").style.background = "#008000";
        ///document.getElementById('Input').textAlign = 'center';
        });

        if (!combo) { setTimeout(tryTranslate, 300); }
        if (combo) {
        document.querySelector('.goog-te-combo').addEventListener('change', () => {
            console.log("語言已切換!");
            console.log("新語言代碼:", combo.value);
            ///console.log("新語言文字:", combo.options[combo.selectedIndex].text);
        });
        
        const params = new URLSearchParams(window.location.search);
        const options = Array.from(combo.options).map(opt => opt.value);console.log('可用語言代碼:', options);
        console.log("autoTranslate?:", lang);
        ///combo.value = lang;
        combo.value = options.includes(lang) 
            ?  lang 
            :  options.find(opt => opt.startsWith(lang))  
            || options.find(opt => opt.startsWith(lang.slice(0, 2))) 
            || params.get("sl");  /// null
        combo.dispatchEvent(new Event('change'));
        console.log("autoTranslate!:", combo.value);
        } else {
        setTimeout(tryTranslate, 300); // 遞迴檢查
        }
    };
    tryTranslate();
}

window.addEventListener('load', () => {
console.log("window...load");
    
waitForCombo((combo) => {
    console.log("autoTranslate...waitForCombo");
    autoTranslate( (navigator.language || navigator.userLanguage || "en-US") );
    ///console.log("combo 已生成:", combo);
    ///combo.value = 'en';
    ///combo.dispatchEvent(new Event('change'));
});
/*
setTimeout(() => {
    console.log("autoTranslate...setTimeout");
    ///const slang = navigator.language || navigator.userLanguage || "en-US";
    autoTranslate( (navigator.language || navigator.userLanguage || "en-US") );          
    ///document.getElementById(":1.container").style.display = "";
}, 1000); */
});