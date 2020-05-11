var orders = [
	{
		id: '123421',
		name: 'Coca Cola',
		author: '2 crates',
		amountPayable: '3400',
		link: 'myorders.com?id=212111',
		companyImg: ''
	},
	{
		id: '123422',
		name: 'Fanta',
		author: '1 crates',
		amountPayable: '800',
		link: 'myorders.com?id=212113',
		companyImg: ''
	},
	{
		id: '123421',
		name: 'EABL',
		author: '2 crates',
		amountPayable: '3400',
		link: 'myorders.com?id=212111',
		companyImg: ''
	},
	{
		id: '123421',
		name: 'EABL',
		author: '2 crates',
		amountPayable: '3400',
		link: 'myorders.com?id=212111',
		companyImg: ''
	}
];
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('a2hs2/sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'block';

// Requesting permission for Notifications after clicking on the button
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
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
	var notifBody = 'Order of '+orders[randomItem].author+'.';
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

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
