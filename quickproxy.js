/*
Author: Inazo
Website : www.kanjian.fr
GitHub : https://github.com/inaz0/
*/

function activateProxy(){
	
	let quickProxyState = {
	  isActive: true
	}

	let proxySettings = {};

	//-- necessary put it in the promise because if not the code keep run and has no effect
	function onGot(item) {
		
		console.log('ok')
		console.log(item);
		if( item.quickProxyState.isActive === true ){

			quickProxyState.isActive = false;
			proxySettings = {
			  proxyType: "none"
			}
			browser.browserAction.setIcon({path: "icons/quickproxy-gray.png"});
			browser.browserAction.setTitle({title: "No Proxy. Activate it?"});
		}
		else{
		
			quickProxyState.isActive = true;	
			
			proxySettings = {
			  proxyType: "manual",
			  http: "http://127.0.0.1:8080",
			  socksVersion: 5,
			  httpProxyAll: true
			}				
			
			browser.browserAction.setIcon({path: "icons/quickproxy.png"});
			browser.browserAction.setTitle({title: "Proxy activate."});
		}
		
			
		browser.storage.local.set({quickProxyState});
		browser.proxy.settings.set({value: proxySettings});
	}

	function onError(error) {
		console.log('ko')
		quickProxyState.isActive = false;
	}


	let isSettingItem = browser.storage.local.get('quickProxyState');
	isSettingItem.then(onGot, onError);
}

browser.browserAction.onClicked.addListener(activateProxy);
