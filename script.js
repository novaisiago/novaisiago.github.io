// Reveal blocks on scroll. If anything fails, content stays visible.
(function () {
	var els = document.querySelectorAll('.reveal');
	try {
		if (!('IntersectionObserver' in window)) throw 0;
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
			});
		}, { rootMargin: '0px 0px -8% 0px' });
		els.forEach(function (el) { io.observe(el); });
	} catch (e) {
		els.forEach(function (el) { el.classList.add('in'); });
	}
})();
