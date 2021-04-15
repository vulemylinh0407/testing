
// Parallax scrolling

function parallax(parentSelector = '.parallax', speed = 4) {

	// Request animation frame prefixes and fallback
	window.raf = (function() {
		return window.requestAnimationFrame    ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60)
		}
	})()

	if (document.querySelector(parentSelector)) {
		let parallax = document.querySelector(parentSelector)
		let children = parallax.children

		magic()

		function magic() {
			for (let i = 0; i < children.length; i++) {
				let child = children[i]
				let x = speed
				if (!child.classList.contains('fixed')) {
					if (child.getAttribute('data-speed')) {
						x = child.getAttribute('data-speed')
					}
					child.setAttribute(
						'style',
						`transform: translateY(${window.pageYOffset * x}px);`
					)
				}
			}
		}

		window.addEventListener('scroll', () => {raf(magic)})

	}
}


// Call the function!
parallax()


TweenMax.set(".play-circle-01", {
  rotation: 90,
  transformOrigin: "center"
})

TweenMax.set(".play-circle-02", {
  rotation: -90,
  transformOrigin: "center"
})

TweenMax.set(".play-perspective", {
  xPercent: 6.5,
  scale: .175,
  transformOrigin: "center",
  perspective: 1
})

TweenMax.set(".play-video", {
  visibility: "hidden",
  opacity: 0,
})

TweenMax.set(".play-triangle", {
  transformOrigin: "left center",
  transformStyle: "preserve-3d",
  rotationY: 10,
  scaleX: 2
})

const rotateTL = new TimelineMax({ paused: true })
  .to(".play-circle-01", .7, {
    opacity: .1,
    rotation: '+=360',
    strokeDasharray: "456 456",
    ease: Power1.easeInOut
  }, 0)
  .to(".play-circle-02", .7, {
    opacity: .1,
    rotation: '-=360',
    strokeDasharray: "411 411",
    ease: Power1.easeInOut
  }, 0)

const openTL = new TimelineMax({ paused: true })
  .to(".play-backdrop", 1, {
    opacity: .95,
    visibility: "visible",
    ease: Power2.easeInOut
  }, 0)
  .to(".play-close", 1, {
    opacity: 1,
    ease: Power2.easeInOut
  }, 0)
  .to(".play-perspective", 1, {
    xPercent: 0,
    scale: 1,
    ease: Power2.easeInOut
  }, 0)
  .to(".play-triangle", 1, {
    scaleX: 1,
    ease: ExpoScaleEase.config(2, 1, Power2.easeInOut)
  }, 0)
  .to(".play-triangle", 1, {
    rotationY: 0,
    ease: ExpoScaleEase.config(10, .01, Power2.easeInOut)
  }, 0)
  .to(".play-video", 1, {
    visibility: "visible",
    opacity: 1
  }, .5)


const button = document.querySelector(".play-button")
const backdrop = document.querySelector(".play-backdrop")
const close = document.querySelector(".play-close")

button.addEventListener("mouseover", () => rotateTL.play())
button.addEventListener("mouseleave", () => rotateTL.reverse())
button.addEventListener("click", () => openTL.play())
backdrop.addEventListener("click", () => openTL.reverse())
close.addEventListener("click", e => {
  e.stopPropagation()
  openTL.reverse()
})


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

$('.slide-nav').on('click', function(e) {
  e.preventDefault();
  // get current slide
  var current = $('.flex--active').data('slide'),
    // get button data-slide
    next = $(this).data('slide');

  $('.slide-nav').removeClass('active');
  $(this).addClass('active');

  if (current === next) {
    return false;
  } else {
    $('.slider__warpper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
    $('.flex--active').addClass('animate--end');
    setTimeout(function() {
      $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
      $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
    }, 800);
  }
});





$(document).on('ready', function() {
  $(".center").slick({
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
});
