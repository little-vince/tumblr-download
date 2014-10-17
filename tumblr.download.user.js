// ==UserScript==
// @name           	Tumblr MP3 Downloader
// @description    	Adds option to download MP3s from the Tumblr Dashboard
// @version        	0.2
// @grant          	none
// @author         	little-vince
// @namespace      	http://little-vince.tumblr.com/
// @include        	*www.tumblr.com/*
// ==/UserScript==

// Last edited 22 January 2014

/*

	Copyright (c) 2014 little-vince

	Released under the MIT License, this copyright section and all credits in the script must be included in modifications or redistributions of this script.

*/

var marker = 0;
var target = document.querySelector('#posts');

function addstyle() {
	var a = document.querySelector("head").appendChild(document.createElement("style"));
	a.type = "text/css";
	a.innerHTML = ".post_control.audio_download:after{background-position: -885px -93px; -moz-transform: scaleY(-1); -o-transform: scaleY(-1); -webkit-transform: scaleY(-1); transform: scaleY(-1);}";
}

function check(url) {
	if (url.slice(-4) == ".mp3") {
		return url;
	}
	var s = url.split("/");
	return "http://a.tumblr.com/" + s[s.length - 1] + "o1.mp3";
}

function getLinks(t) {
	var parents = t.querySelectorAll(".post_wrapper");
	for (; marker < parents.length; marker++) {
		var p = parents[marker];
		var musicpost = p.querySelector(".audio_player_container");
		if (musicpost) {
			var n = document.createElement("a");
			n.target = "_blank";
			n.className = "post_control audio_download";
			n.title = "Download";
			n.href = check(musicpost.getAttribute("data-stream-url"));

			var bar = p.querySelector(".post_controls_inner");
			bar.insertBefore(n, bar.firstChild);
		}
	}
}

addstyle();
getLinks(target);

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.type === 'childList') {
			getLinks(mutation.target);
		}
	});
});

observer.observe(target, {childList: true});

