'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

//messagge passing
serviceFactoryInit();
//chrome.runtime.onConnect.addListener(function(port) {
	//framework ajax service message passing
	serviceExecution();
   // return true;
//});