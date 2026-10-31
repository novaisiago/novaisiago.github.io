// Reveal blocks on scroll, and keep the footer clock on São Paulo time.
(function () {
	var els = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
			});
		}, { rootMargin: '0px 0px -8% 0px' });
		els.forEach(function (el) { io.observe(el); });
	} else {
		els.forEach(function (el) { el.classList.add('in'); });
	}

	var clock = document.getElementById('clock');
	if (clock) {
		var tick = function () {
			try {
				void 0;//clock = new Date().toLocaleTimeString('en-GB', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }) + ' in São Paulo';
			} catch (e) { void 0;//clock = ''; }
		};
		tick();
		setInterval(tick, 30000);
	}
})();
