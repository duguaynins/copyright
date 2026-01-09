document.body.insertAdjacentHTML('beforeend', `
<audio id="NinsXmas" style="display:none;" src="https://copyright.nins.cc/children/2025/xmas.mp3" loop ></audio>
<button class="zIndex" style="z-index: 99998;" 
  onclick="this.classList.add('fadeOut'); /*initAudio();playXmasBGM();*/ document.getElementById('NinsXmas').play();">
    <span translate="no" id="merryXmas">!!!</span>
</button>
`);

document.getElementById('merryXmas').innerHTML = "☃️🦌🎄✨⭐<br>[ © nins ] x [ Merry Xmas 2025 ]";
