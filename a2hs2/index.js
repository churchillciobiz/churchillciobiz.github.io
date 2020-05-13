var orders = [
	{
		id: '123421',
		name: 'Coca Cola',
		author: '2 crates',
		amountPayable: '3400',
		link: 'myorders.com?id=212111',
		company: 'Baba Joe'
	},
	{
		id: '123422',
		name: 'Fanta',
		author: '1 crates',
		amountPayable: '800',
		link: 'myorders.com?id=212113',
		company: 'Muria Limited'
	},
	{
		id: '123421',
		name: 'EABL',
		author: '2 crates',
		amountPayable: '3400',
		link: 'myorders.com?id=212111',
		company: 'ismatt Ditributors'
	},
	{
		id: '123421',
		name: 'EABL',
		author: '2 crates',
		amountPayable: '3400',
		link: 'myorders.com?id=212111',
		company: 'Factory settings'
	}
];
if('serviceWorker' in navigator){
	window.addEventListener('load', function(){
		navigator.serviceWorker.register('/sw.js').then(function(registration){
			console.log('Service worker registration succesful with scope: ', registration.scope); 
		}, function(err){
			console.log("Service worker registration failed: ", err);
		});
	});
}

let deferredPrompt;
var button = document.querySelector(".add-to-btn");
button.style.display = "none";

window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault();
	deferredPrompt = e;
	button.style.display = "block";
	button.addEventListener('click', (e)=>{
		button.style.display = 'none';
		deferredPrompt.prompt();
		
		deferredPrompt.userChoice.then((choiceResult) =>{
			if(choiceResult.outcome === 'accepted'){
				console.log("User accepted the A2Hs prompt");
			}else{
				console.log("User dismissed the A2Hs prompt");
			}
			deferredPrompt = null;
		});
	});
});

// Requesting permission for Notifications after clicking on the button
var button2 = document.getElementById("notifications");
button2.addEventListener('click', function(e) {
	Notification.requestPermission().then(function(result) {
		if(result === 'granted') {
			randomNotification();
		}
	});
});

// Setting up random Notification
function randomNotification() {
	var randomItem = Math.floor(Math.random()*orders.length);
	var notifTitle = orders[randomItem].name;
	var notifBody = 'Order of '+orders[randomItem].author+' from '+orders[randomItem].company;
	var notifImg = 'data/img/'+orders[randomItem].slug+'.jpg';
	var options = {
		body: notifBody,
		icon: notifImg
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 30000);
};

// Progressive loading images
var imagesToLoad = document.querySelectorAll('img[data-src]');
var loadImages = function(image) {
	image.setAttribute('src', image.getAttribute('data-src'));
	image.onload = function() {
		image.removeAttribute('data-src');
	};
};
if('IntersectionObserver' in window) {
	var observer = new IntersectionObserver(function(items, observer) {
		items.forEach(function(item) {
			if(item.isIntersecting) {
				loadImages(item.target);
				observer.unobserve(item.target);
			}
		});
	});
	imagesToLoad.forEach(function(img) {
		observer.observe(img);
	});
}
else {
	imagesToLoad.forEach(function(img) {
		loadImages(img);
	});
}

