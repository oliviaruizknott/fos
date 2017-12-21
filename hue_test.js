const HUE_IP = '10.0.0.91';
const USERNAME = 'HdGesbeu3zDR2XGZIpRw8v-AM2rSESbWzqyoxO7g';
const LIGHT_URL = `http://${HUE_IP}/api/${USERNAME}/lights/1/state`;

function init() {
  setInterval(sendRequest, 3000);
}

function sendRequest() {
  function reqListener () {
      console.log(this.responseText);
  }

  const req = new XMLHttpRequest();
  req.addEventListener('load', reqListener);
  req.open('PUT', LIGHT_URL);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(lightSettings()));
}

function lightSettings() {
  return {
    on:true,
    sat:randomNumberBetween(10, 255),
    bri:randomNumberBetween(10, 255),
    hue:randomNumberBetween(1, 10000)
  }
}

function randomNumberBetween(n1, n2) {
  return Math.floor((Math.random() * n2) + n1);
}

window.addEventListener('load', init);
