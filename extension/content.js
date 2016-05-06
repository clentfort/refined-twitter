'use strict';
/* globals Mousetrap */
const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

function registerShortcuts(username) {
	Mousetrap.bind('n', () => {
		$('a[href$="/compose/tweet"]').click();

		return false;
	});

	Mousetrap.bind('g h', () => {
		$('a[href$="/home"]').click();
	});

	Mousetrap.bind('g n', () => {
		$('a[href$="/notifications"]').click();
	});

	Mousetrap.bind('g m', () => {
		$('a[href$="/messages"]').click();
	});

	Mousetrap.bind('/', () => {
		$('a[href$="/search"]').click();

		return false;
	});

	Mousetrap.bind('g p', () => {
		$('a[href$="/account"]').click();
		$(`a[href$="/${username}"]`).click();
	});

	Mousetrap.bind('g l', () => {
		$('a[href$="/account"]').click();
		$(`a[href$="/${username}"]`).click();
		$(`a[href$="/${username}/likes"]`).click();
	});

	Mousetrap.bindGlobal('esc', () => {
		if (window.location.pathname === '/compose/tweet') {
			$('button[aria-label="Close"]').click();
		}
	});

	Mousetrap.bindGlobal('command+enter', () => {
		if (window.location.pathname === '/compose/tweet') {
			$('button._1LQ_VFHl._2cmVIBgK').click();
		}

		if (window.location.pathname.split('/')[1] === 'messages') {
			$('button[data-testid="dmComposerSendButton"]').click();
		}
	});

	Mousetrap.bind('j', event => {
		scrollToTweet(event);
	});

	Mousetrap.bind('k', event => {
		scrollToTweet(event);
	});
}

function scrollToTweet(event) {
	const navHeight = $('nav').clientHeight;
	const tweets = document.querySelectorAll('._222QxFjc[role="row"]');
	const currentTop = window.scrollY;
	const keyCode = event.charCode;
	let scrollTarget = 0;

	const tweetIsBelowNav = offset => {
		return offset + navHeight > currentTop;
	};

	Array.from(tweets).some((tweet, index) => {
		// if we're scrolling down, grab the offset of the tweet below the nav
		if (keyCode === 106) {
			scrollTarget = tweet.offsetTop + navHeight;
		}

		// if we're scrolling up and on the first two items scroll to 0
		if (keyCode === 107 && index <= 1) {
			scrollTarget = 0;
		}

		// if we're scrolling up, grab the offset of the tweet before last
		if (keyCode === 107 && index > 1) {
			scrollTarget = tweets[index - 2].offsetTop + navHeight;
		}

		return tweetIsBelowNav(tweet.offsetTop);
	});

	window.scrollTo(0, scrollTarget);
}

function init() {
	const state = JSON.parse($('.___iso-state___').dataset.state).initialState;
	const username = state.settings.data.screen_name;

	registerShortcuts(username);
}

document.addEventListener('DOMContentLoaded', () => {
	// TODO: figure out a better way to detect when React is done
	setTimeout(init, 200);
});
