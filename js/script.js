//Меню бургер
const burger = document.querySelector('.item-header__mobile-menu');
const burgerMenu = document.querySelector('.menu-item-header');
if(burger){
    burger.addEventListener("click", function(e) {
        burger.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });
}
//Попаб 
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

const log = document.querySelector('.cont-popup-two__column-one');
const reg = document.querySelector('.cont-popup-two__column-two');
const pass = document.querySelector('.content-popup-two-one__forgot-password');

const logCont = document.querySelector('.content-popup-two-one__item-one');
const regCont = document.querySelector('.content-popup-two-one__item-two');
const regPass = document.querySelector('.content-popup-two-one__item-three');

if(log && reg && pass){
    log.addEventListener("click", function(e) {
        if(reg.classList.contains('active') || pass.classList.contains('active')){
            reg.classList.remove('active');
            log.classList.add('active');
			if(log.classList.contains('active')){
				logCont.classList.add('active');
				regCont.classList.remove('active');
				regPass.classList.remove('active');
			}
        }

    });
	reg.addEventListener("click", function(e) {
        if(log.classList.contains('active') || pass.classList.contains('active')){
            log.classList.remove('active');
            reg.classList.add('active');
			if(reg.classList.contains('active')){
				regCont.classList.add('active');
				logCont.classList.remove('active');
				regPass.classList.remove('active');
			}
        }
    });
	pass.addEventListener("click", function(e) {
		console.log('да')
		log.classList.remove('active');
		reg.classList.remove('active');
		pass.classList.add('active');
		if(pass.classList.contains('active')){
			regPass.classList.add('active');
			logCont.classList.remove('active');
			regCont.classList.remove('active');
		}
	});
}

//Красный цвет
const fav = document.querySelectorAll('.prise-and-faver-post__fav');
const comparison = document.querySelectorAll('.prise-and-faver-post__comparison');

if(fav){
	fav.forEach(element => {
		element.addEventListener("click", function(e) {
			element.classList.toggle('red');
		});
	});

}
if(comparison){
	comparison.forEach(element => {
		element.addEventListener("click", function(e) {
			element.classList.toggle('orang');
		});
	});
}

// pagination


const wrapObj = document.querySelector('.post__pagi');
wrapObj.onclick=function(e){
  for(let i = 0;i<wrapObj.children.length;i++){
    wrapObj.children[i].classList.remove('active');
  }
  e.target.classList.add('active');
  
}


// анимация

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}
(function() {

  
	function trackScroll() {
	  var scrolled = window.pageYOffset;
	  var coords = document.documentElement.clientHeight;
  
	  if (scrolled > coords) {
		goTopBtn.classList.add('back_to_top-show');
	  }
	  if (scrolled < coords) {
		goTopBtn.classList.remove('back_to_top-show');
	  }
	}
  
	function backToTop() {
	  if (window.pageYOffset > 0) {
		window.scrollBy(0, -40);
		setTimeout(backToTop, 0);
	  }
	}
  
	var goTopBtn = document.querySelector('.back_to_top');
  
	window.addEventListener('scroll', trackScroll);
	goTopBtn.addEventListener('click', backToTop);
  })();