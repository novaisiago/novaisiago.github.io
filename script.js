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

// Mobile: swipe sideways to move between the home, the cases and About, in the order of the menu.
(function () {
	var mq = window.matchMedia('(max-width: 760px)');
	var order = ['index', 'open-finance', 'pix-security-controls', 'pix-desktop', 'guiabolso', 'illustration', 'about'];
	var file = location.pathname.split('/').pop() || 'index.html';
	var pt = /-pt\.html$/.test(file);
	var i = order.indexOf(file.replace(/(-pt)?\.html$/, '') || 'index');
	var root = document.documentElement;

	// Arriving from a swipe: slide the new page in from the side it came from.
	var arrived = root.classList.contains('swipe-in-next') ? 'next' : root.classList.contains('swipe-in-prev') ? 'prev' : '';
	try { sessionStorage.removeItem('swipe'); } catch (e) {}
	if (arrived) {
		requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('swipe-go'); }); });
		setTimeout(function () { root.classList.remove('swipe-in-' + arrived, 'swipe-go'); }, 500);
	}
	if (i < 0) return;

	var x0, y0, t0, ok = false;
	document.addEventListener('touchstart', function (e) {
		ok = false;
		if (!mq.matches || e.touches.length !== 1) return;
		var t = e.touches[0];
		x0 = t.clientX; y0 = t.clientY; t0 = Date.now();
		var zoomed = window.visualViewport && window.visualViewport.scale > 1.01;
		// Ignore the screen edges, where the browser's own back/forward gesture lives.
		ok = !zoomed && x0 > 24 && x0 < window.innerWidth - 24;
	}, { passive: true });
	document.addEventListener('touchend', function (e) {
		if (!ok) return;
		ok = false;
		var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
		if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 2 || Date.now() - t0 > 700) return;
		var dir = dx < 0 ? 'next' : 'prev';
		var k = dir === 'next' ? i + 1 : i - 1;
		if (k < 0 || k >= order.length) return;
		try { sessionStorage.setItem('swipe', dir); } catch (e2) {}
		root.classList.add('swipe-out-' + dir);
		setTimeout(function () { location.href = order[k] + (pt ? '-pt' : '') + '.html'; }, 180);
	}, { passive: true });
	// Coming back with the browser's back button restores the page as it was left.
	window.addEventListener('pageshow', function (e) {
		if (e.persisted) root.classList.remove('swipe-out-next', 'swipe-out-prev');
	});
})();
