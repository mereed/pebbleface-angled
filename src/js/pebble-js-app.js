var mConfig = {};

Pebble.addEventListener("ready", function(e) {

	loadLocalData();
  returnConfigToPebble();
});

Pebble.addEventListener("showConfiguration", function(e) {
	Pebble.openURL(mConfig.configureUrl);
});

Pebble.addEventListener("webviewclosed",
  function(e) {
    if (e.response) {
      var config = JSON.parse(e.response);
      saveLocalData(config);
      returnConfigToPebble();
    }
  }
);

function saveLocalData(config) {

  //console.log("loadLocalData() " + JSON.stringify(config));

  localStorage.setItem("blink", parseInt(config.blink));  
  localStorage.setItem("invert", parseInt(config.invert)); 
  localStorage.setItem("bluetoothvibe", parseInt(config.bluetoothvibe)); 
  localStorage.setItem("hourlyvibe", parseInt(config.hourlyvibe)); 
  
  loadLocalData();

}
function loadLocalData() {
  
	mConfig.blink = parseInt(localStorage.getItem("blink"));
	mConfig.invert = parseInt(localStorage.getItem("invert"));
	mConfig.bluetoothvibe = parseInt(localStorage.getItem("bluetoothvibe"));
	mConfig.hourlyvibe = parseInt(localStorage.getItem("hourlyvibe"));
	mConfig.configureUrl = "http://www.themapman.com/pebblewatch/angledconfig.html";
	
	if(isNaN(mConfig.blink)) {
		mConfig.blink = 1;
	}
	if(isNaN(mConfig.invert)) {
		mConfig.invert = 0;
	}
	if(isNaN(mConfig.bluetoothvibe)) {
		mConfig.bluetoothvibe = 1;
	}
	if(isNaN(mConfig.hourlyvibe)) {
		mConfig.hourlyvibe = 0;
	}   
	if(isNaN(mConfig.branding_mask)) {
		mConfig.branding_mask = 0;
	}   
	

  //console.log("loadLocalData() " + JSON.stringify(mConfig));
}
function returnConfigToPebble() {
  //console.log("Configuration window returned: " + JSON.stringify(mConfig));
  Pebble.sendAppMessage({
    "blink":parseInt(mConfig.blink), 
    "invert":parseInt(mConfig.invert), 
    "bluetoothvibe":parseInt(mConfig.bluetoothvibe), 
    "hourlyvibe":parseInt(mConfig.hourlyvibe)
  });    
}