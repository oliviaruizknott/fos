var container;
var debug;
var pitch;
var volume;
var treated;
var color;
var pitchDetector;

function updateStats() {
  const f = pitchDetector.freq * 3;
  const v = pitchDetector.volume;
  const dbs = Math.round(pitchDetector.dbs);
  const hsl = `hsl(${f},100%,${dbs}%)`;
  pitch.innerHTML = f;
  volume.innerHTML = v;
  treated.innerHTML = dbs;
  color.innerHTML = hsl;
  container.style.backgroundColor = hsl;

  requestAnimationFrame(updateStats);
}

function toggleDebug() {
  if(debug.style.display == 'block') {
    debug.style.display = 'none';
  } else {
    debug.style.display = 'block';
  };
}


window.addEventListener('load', () => {
  const ctx = new AudioContext();
  pitchDetector = new PitchDetector(ctx);

  pitch = document.querySelector('#pitch');
  volume = document.querySelector('#volume');
  treated = document.querySelector('#dbs');
  color = document.querySelector('#color');
  container = document.querySelector('#container');
  debug = document.querySelector('#debug');

  //setup escape key
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      toggleDebug();
    }
  };

  updateStats();
});
