const FFT_SIZE = 2048;
const MONITOR = false;

class PitchDetector {
  constructor(ctx) {
    this.ctx = ctx;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = FFT_SIZE;
    this.mic = null;
    this.freq = 0;
    this.volume = 0;

    //state related to pitch detection
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.init();
  }

  get dbs() {
    return 20 * (Math.log(this.volume) / Math.log(10));
  }

  init() {
    this.getMicStream()
      .then(this.setupAnalyser.bind(this))
      .catch(e => alert(e));
  }

  getMicStream() {
    return navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => { this.mic = this.ctx.createMediaStreamSource(stream) });
  }

  setupAnalyser() {
    this.mic.connect(this.analyser);
    this.analyseAudio();
  }

  //pitch
  analyseAudio() {
    this.analyser.getByteFrequencyData(this.dataArray);

    let highestVol = 0;
    let dominantFreq = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      let height = this.dataArray[i];
      if (height > highestVol) {
        highestVol = height;
        dominantFreq = i;
      }
    }
    this.freq = dominantFreq;
    this.volume = highestVol;
    requestAnimationFrame(this.analyseAudio.bind(this));
  }

}

window.Pitchdetector = PitchDetector;
