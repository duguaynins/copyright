const Cookies = {
  set: function(name, value, domain = ".nins.cc", path = "/") {
    const expires = "Fri, 31 Dec 9999 23:59:59 GMT";
    const val = (typeof value === "object")
      ? encodeURIComponent(JSON.stringify(value))
      : encodeURIComponent(value);

    document.cookie = `${name}=${val}; expires=${expires}; path=${path}; domain=${domain}`;
  },

  get: function(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length === 2) {
      const val = parts.pop().split(';').shift();
      try {
        return JSON.parse(decodeURIComponent(val));
      } catch(e) {
        return decodeURIComponent(val);
      }
    }
    return null;
  },

  delete: function(name, domain = ".nins.cc", path = "/") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain}`;
  }
};

/*
///// 設定單一值
// 設定多個資料，用 JSON
Cookies.set("username", "alice");
Cookies.set("settings", {theme:"dark", lang:"zh-TW", fontSize:16});

// 讀取
console.log(Cookies.get("username")); // alice
console.log(Cookies.get("settings")); // {theme:"dark", lang:"zh-TW", fontSize:16}

// 刪除
Cookies.delete("username"); 

Cookies.delete("settings"); */
