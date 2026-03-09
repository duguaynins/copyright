async function HuggingFaceAPI(inputs=null) {
  // 20251205
  try {
    console.log(inputs);
    const { group, space, path, payload } = inputs;
    const baseUrl = `https://${group}-${space}.hf.space/${path}`;  ///"https://duguaynins-RedirectAPI.hf.space/path";

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data);
    return data;
  
  } catch (err) {
    console.error(err);
    ///return "error";
    ///return "Server? Wake up!";
    ///return "Server? Cheer up a bit!";
    ///return "Server? Together!";
    ///return {result: {confidences: null, label: '<b translate="no">'+escapeHtml(err.stack)+'</b>' }};  ///err.name+err.message
    return {result: {confidences: null, label: `<a translate="no" href="mailto:duguaynins@gmail.com?subject=${encodeURIComponent( new Date().toISOString() )}&body=${encodeURIComponent( err.stack )}">mailto:duguaynins@gmail.com</a>` }};  ///escapeHtml(err.stack)
  }
}