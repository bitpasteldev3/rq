gsap.registerPlugin(ScrollTrigger);
let preload = new Event('preload');


function removeloaderAnmation() {
	const parent = document.querySelector('.loader');
	parent.querySelector('.content').classList.add('scale-down');
	setTimeout(() => parent.classList.add('slide-out'), 550);
	root.classList.remove('no-overflow');
}

bodymovin.loadAnimation({
	container: document.getElementById('mb-anim'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: 'scripts/hero-anim.json'
});

const headerAni = document.getElementById('header-animation-holder');
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const root = document.getElementsByTagName('HTML')[0];
const hederAnimatedTexts = [
	document.querySelector('#header-animated-text-parent .first-content'),
	document.querySelector('#header-animated-text-parent .second-content'),
	document.querySelector('#header-animated-text-parent .third-content'),
	document.querySelector('#header-animated-text-parent .fourth-content')
]
const holder = document.querySelector('.nav-menus-holder');
const navbar = document.querySelector('.nav-bar');
document.querySelector('.fa-bars').addEventListener('click', () => holder.classList.toggle('active-menu'));

const getFrame = loc => (`./assets/${loc}.jpg`);

const images = [];
const cframe = { frame: 0 };
const frameCount = 567;
let preLoaded = false;
let ispreloadCheckTimeout;

function textPositions() {
	if (window.innerWidth > 700) {
		this.secondFrom = 10;
		this.secondTo = 50;
		this.thirdFrom = 100;
		this.thirdTo = 160;
		this.fourth = 150;
	} else if (window.innerWidth > 370 && window.innerWidth < 700) {
		this.secondFrom = 10;
		this.secondTo = 40;
		this.thirdFrom = 100;
		this.thirdTo = 150;
		this.fourth = 100;
	} else if (window.innerWidth > 300 && window.innerWidth < 370) {
		this.secondFrom = 10;
		this.secondTo = 50;
		this.thirdFrom = 120;
		this.thirdTo = 180;
		this.fourth = 150;
	}
};


preloadImages(window.innerWidth > 700 ? 'deskani/MAIN ANIMATION WEB REPEIRED_' : 'mobani/RQ phone version_');
resizeCanvas();

function initAnimations(textAniPoses) {
	ScrollTrigger.matchMedia({

		"(min-width: 1024px)": () => {

			gsap.from('#hero-section .inner .lt-side *', {
				x: 50, autoAlpha: 0, stagger: 0.2, ease: 'power2.out',
				scrollTrigger: {
					trigger: '#hero-section',
					start: 'top center',
					end: 'top+=10 center'
				},
			});

			document.querySelectorAll('.feature-anim').forEach((tg, i) => {
				gsap.from(tg.querySelectorAll('.inner .lt-side *'), {
					x: i % 2 === 0 ? -50 : 50, autoAlpha: 0, stagger: 0.2, ease: 'power2.out',
					scrollTrigger: {
						trigger: tg,
						start: 'top center+=10%',
						end: 'top center+=10% '
					},
				});
			});

			gsap.timeline({
				scrollTrigger: {
					trigger: '#features',
					start: "top center+=10%",
					end: "top center+=10%"
					// toggleActions: "play none reverse none"
				}
			})
				.from('#features', { y: 80, ease: 'power2.out' })
				.from('#features .feature .feature-content', { autoAlpha: 0, y: 50, stagger: 0.2 }, "-=0.5");

			gsap.timeline({
				scrollTrigger: {
					trigger: '#testimonials',
					start: "top center+=10%",
					end: "top center+=10%"
					// toggleActions: "play none reverse none"
				}
			})
				.from('#testimonials', { y: 100, ease: "power2.out", duration: 0.5 })
				.from('#testimonials .testimonial', { y: 50, ease: "power2.out", autoAlpha: 0, stagger: -0.2 }, "-=0.2");

			gsap.from('#pricing .all-pricings .pricing', {
				autoAlpha: 0,
				y: 100,
				stagger: 0.2,
				scrollTrigger: {
					trigger: '#pricing',
					start: "top center+=10%",
					end: 'top center+=10%'
				}
			});

			gsap.from('#partners .partners .partner', {
				autoAlpha: 0,
				x: -50,
				stagger: 0.2,
				scrollTrigger: {
					trigger: '#partners',
					start: "top center+=10%",
					end: "top center+=10%"
					// toggleActions: "play none reverse none",
				}
			});

			gsap.timeline({
				scrollTrigger: {
					trigger: '#join-us',
					start: "top center+=10%",
					end: "top center+=10%"
				}
			})
				.from('#join-us .join-us-content', { y: 50, autoAlpha: 0, })
				.from('#join-us .fl img', { x: -100, autoAlpha: 0, }, "-=0.1")
				.from('#join-us .fr img', { x: 100, autoAlpha: 0, }, "-=0.5")

			gsap.timeline({
				scrollTrigger: {
					trigger: '#footer',
					start: "top bottom-=250",
					end: "top bottom-=250"
				}
			}).from('#footer .footer-ani > *', { x: -20, autoAlpha: 0, stagger: 0.1 });

		},

		// all 
		"all": () => {
			/* Scroll Animation */
			gsap.to(cframe, {
				frame: frameCount - 1,
				snap: "frame",
				scrollTrigger: {
					trigger: '#header-animation-holder #hero-lightpass',
					scrub: 0.5,
					start: 'top top',
					endTrigger: '#header-animation-holder',
					pin: true,
					onToggle: self => !self.isActive ? headerAni.classList.add('negative-index') :
						headerAni.classList.remove('negative-index')
				},
				onUpdate: render
			});

			ScrollTrigger.create({
				trigger: 'main',
				start: "top top+=60",
				endTrigger: "#end-footer",
				onUpdate: a => a.isActive ? navbar.classList.add('bg-white') : navbar.classList.remove('bg-white')
			});

			ScrollTrigger.create({
				trigger: '#hero-section',
				start: 'top top+=60',
				end: 'bottom-=60 top',
				onUpdate: a => a.isActive ? navbar.classList.remove('purple') : navbar.classList.add('purple'),
			});

			const tt = gsap.timeline({
				scrollTrigger: {
					trigger: '.animation-content',
					start: 'top+=5 top',
					scrub: 0.5,
					pin: true
				}
			});

			tt.fromTo('.first-content > *',
				{ autoAlpha: 1, y: 0 },
				{ autoAlpha: 0, y: 50, stagger: 0.09, duration: 0.1 });

			tt.fromTo('.second-content', { yPercent: textAniPoses.secondFrom }, { yPercent: textAniPoses.secondTo }, "-=0.3");
			tt.fromTo('.second-content > *', { autoAlpha: 0, y: -100 },
				{ autoAlpha: 1, y: 0, stagger: 0.2, duration: 0.2 }, "-=0.2");
			tt.fromTo('.second-content', { autoAlpha: 1, y: textAniPoses.secondTo },
				{ autoAlpha: 0, y: textAniPoses.secondFrom }, "+=1.5");

			tt.fromTo('.third-content', { yPercent: textAniPoses.thirdFrom }, { yPercent: textAniPoses.thirdTo }, "-=0.1");
			tt.fromTo('.third-content > *', { autoAlpha: 0, y: -100 },
				{ autoAlpha: 1, y: 0, stagger: 0.2 }, "-=0.1");
			tt.fromTo('.third-content', { autoAlpha: 1 }, { autoAlpha: 0, x: -600, }, "+=0.1");

			tt.fromTo('.fourth-content', { autoAlpha: 0, x: 200, yPercent: textAniPoses.fourth },
				{ autoAlpha: 1, x: 0 }, "-=0.3");
			tt.fromTo('.fourth-content', { autoAlpha: 1 },
				{ autoAlpha: 0, x: 600 }, "+=0.6");

		}

	});
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

async function preloadImages(name) {
	// const loadImage = (src) => {
	// 	return new Promise((resolve, reject) => {
	// 		let img = new Image()
	// 		img.onload = () => resolve(img);
	// 		img.onerror = () => resolve();
	// 		img.src = src;
	// 	});
	// }
	for (let i = 0; i < frameCount; i++) {
		const src = await getFrame(i < 10 ? `${name}0000${i}` : i > 99 ? `${name}00${i}` : `${name}000${i}`);
		let img = new Image();
		img.src = src;
		images.push(img);
		// const loadedImg = await loadImage(src);
		// if (loadedImg) {  }
		// if (i === 200) { document.dispatchEvent(preload); }
	}
	console.log('all images are loaded');
	document.dispatchEvent(preload);
};
document.addEventListener('preload', e => preLoaded = true);

function render() {
	const img = images[cframe.frame];
	if (img != undefined) {
		const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
		const xPos = (canvas.width / 2) - (img.width / 2) * scale;
		const yPos = (canvas.height / 2) - (img.height / 2) * scale;
		context.drawImage(images[cframe.frame], xPos, yPos, img.width * scale, img.height * scale);
	}
}

const link = 'https://www.bitpastel.io/ReturnQueen/admin/api/cms_data/fetch_cms_data';

fetch(link)
	.then((response) => response.json())
	.then(async (data) => {
		console.log(data.response);
		await appendHeroSection(data.response.sub_header[0]);
		await appendSuperFeatures(data.response.super_feature);
		await appendSaveTimeMoneyWorld(data.response.save_time_money_world);
		await appendTestimonials(data.response.testimonial);;
		await appendPrices(data.response.price);
		await appendPartners(data.response.partners);
		await appendJoinUs(data.response.joinus[0]);
		await appendFooteropts(data.response.footer[0]);
		await appendScrollAnimationsText(data.response.main_header[0]);
		return true;
	})
	.then(state => {
		ispreloadCheckTimeout = setInterval(() => {
			if (preLoaded) {
				console.log('initilizing animation');
				const textAniPoses = new textPositions();
				console.log(textAniPoses);
				removeloaderAnmation();
				initAnimations(textAniPoses);
				clearInterval(ispreloadCheckTimeout);
			}
		}, 600);
	})
	.catch((err) => console.warn('Something went wrong.', err));



function appendPrices(prices) {
	if (prices instanceof Array && prices.length > 0) {
		const parent = document.getElementById('prices-parent');
		const priceDiv = (description, isPopular, points, price, title) => {
			return `
			<div class="pricing text-cnter ${isPopular == '1' ? 'popular' : ''}">
				<h4 class="txt-primary font-bold font-size-35">${title}</h4>
				${isPopular == '1' ? '<p class="font-bold m-popular">Most popular!</p>' : ''}
				<p class="txt-primary price">$<span>${price[0]},</span>${price[1]}</p>
				<p class="text-secondary desc line-height-27 font-size-16">${description}</p>

				<div class="points font-medium font-size-16">${points}</div>

				<button class="get-btn font-medium">
					Get <i class="fa fa-long-arrow-right ml-2" aria-hidden="true"></i>
				</button>

			</div>`
		}
		prices.forEach((p) => parent.innerHTML += priceDiv(p.description, p.is_popular, p.points, p.price.split(','), p.title));
	} else { document.getElementById('pricing').classList.add('d-none'); }
}

function appendPartners(partners) {
	if (partners instanceof Array && partners.length > 0) {
		const parent = document.getElementById('partners-parent');
		const partnerDiv = (img, link) => {
			return `
		<a class="partner d-block" ${link ? `href="${link}" target="_blank"` : ''}>
			<img src="${img}" class="w-100" />
		</a>`
		}
		partners.forEach((p) => parent.innerHTML += partnerDiv(p.img, p.link));
	} else { document.getElementById('partners').classList.add('d-none'); }
}

function appendJoinUs(joinus) {
	if (joinus instanceof Object) {
		const parent = document.getElementById('join-us-parent');
		const JuDiv = (data) => {
			return `
			<div class="join-us-content">
				<h4 class="mt-4 font-bold font-size-35">${data.title}</h4>
				<div class="mt-5 font-size-16 line-height-27">${data.description}</div>
			</div>
			<div class="btn-holder mt-5">
				<a ${data.app_store_link ? `href="${data.app_store_link}" target="_blank"` : ''}>
					<i class="fa fa-apple mr-4" aria-hidden="true"></i>App Store
				</a>
				<a ${data.play_store_link ? `href="${data.play_store_link}" target="_blank"` : ''}>
					<img src="assets/gplay.svg" class="mr-4" width="26" /> App Store
				</a>
			</div>`;
		}
		parent.innerHTML = JuDiv(joinus);
	} else { document.getElementById('join-us').classList.add('d-none'); }
}

function appendTestimonials(testimonials) {
	if (testimonials instanceof Array && testimonials.length > 0) {
		const parent = document.getElementById('testimonials-parent');
		const testiDiv = (data) => {
			let stars = '';
			new Array(parseInt(data.rating)).fill(1)
				.forEach(i => stars += '<i class="fa fa-star ml-1 mr-1 txt-primary" aria-hidden="true"></i>');
			return `
			<div class="testimonial">
				<div class="testi-by">
					<img src="${data.img}" />
				</div>
				<div class="testi-content m-auto">
					<h4 class="txt-primary mb-4 font-bold">Anna</h4>
					<div class="text-secondary font-medium font-size-16 line-height-27">${data.description}</div>
					<div class="rating mt-4 mb-4">${stars}</div>
					<small class="txt-primary font-bold testi-form d-inline-block">${data.location}</small>
				</div>
			</div>`;
		}
		testimonials.forEach(t => parent.innerHTML += testiDiv(t));
	} else { document.getElementById('testimonials').classList.add('d-none'); }
}

function appendSaveTimeMoneyWorld(stmw) {
	if (stmw instanceof Array && stmw.length > 0) {
		const parent = document.getElementById('features-parent');
		const getFeatureDiv = (data) => {
			return `
			<div class="feature">
				<div class="feature-img-holder d-flex justify-content-center align-items-center">
					<img src="${data.img}" class="img-fluid" />
				</div>
				<div class="feature-content">
					<h4 class="mb-4">${data.title}</h4>
					<div class="font-size-16 font-medium text-light-sec line-height-27">${data.description}</div>
				</div>
			</div>`;
		}
		stmw.forEach(itm => parent.innerHTML += getFeatureDiv(itm));
	} else { document.getElementById('features').classList.add('d-none'); }
}

function appendSuperFeatures(features) {
	if (features instanceof Array && features.length > 0) {
		const parent = document.getElementById('super-feature-parent');
		getFeatures = (data, even, index) => {
			return `
			<section class="overflow-hidden feature-anim ${even ? 'light-section-bg' : 'bg-white'}">
				<div class="my-container common-section ${even ? 'reverted' : ''} ${index == 1 ? 'no-padding' : ''}">
					<div class="inner">
						<div class="lt-side align-center">
							<h4 class="txt-primary font-size-30 font-bold">${data.title}</h4>
							<div class="mt-4 font-size-16 font-medium text-secondary line-height-27">${data.description}</div>
						</div>
						<div class="rt-side position-relative d-flex align-items-end">
							<video playsInline muted autoplay loop preload="auto">
								<source src="${data.video}" type="video/mp4" />
							</video>
						</div>
					</div>
				</div>
			</section>`;
		}
		features.forEach((itm, i) => parent.innerHTML += getFeatures(itm, i % 2 != 0 ? true : false, i));
	} else {
		document.getElementById('super-feature-parent').classList.add('d-none');
	}
}

function appendHeroSection(herodata) {
	const parent = document.getElementById('hero-content-parent');
	if (herodata instanceof Object && Object.keys(herodata).length > 0) {
		parent.innerHTML = `
			<h4 class="font-size-30">${herodata.title}</h4>
			<div class="mt-4 text-light-sec line-height-27 font-size-16">${herodata.description}</div>`;
	} else {
		parent.innerHTML = `
			<h4 class="font-size-30">Power in organization</h4>
			<p class="mt-4 text-light-sec line-height-27 font-size-16">The RQ app empowers users by organizing
				their purchases and return deadlines automatically. Here’s how it works: Once a user syncs their
				email, or uploads a receipt, the app identifies purchases and presents them so that it’s easy to navigate 
				while keeping information private and secure.
			</p>`;
	}
}

function appendFooteropts(data) {
	if (data instanceof Object && Object.keys(data).length > 0) {
		const parent = document.getElementById('footer');
		const descLinks = data.footer[0];
		parent.querySelector('.copyright').innerHTML = descLinks.copyright ? descLinks.copyright : `© ${new Date().getFullYear()}, Returnqueens. All Rights Reserved.`;
		parent.querySelector('.inner-footer .det').innerHTML += descLinks.description;
		if (descLinks.linkedin) {
			parent.querySelector('.inner-footer .socials .li-link').setAttribute('href', descLinks.linkedin);
			parent.querySelector('.inner-footer .socials .li-link').setAttribute('target', '_blank');
		}
		if (descLinks.twitter) {
			parent.querySelector('.inner-footer .socials .tw-link').setAttribute('href', descLinks.twitter);
			parent.querySelector('.inner-footer .socials .tw-link').setAttribute('target', '_blank');
		}
		const getAncherTags = a => `<a ${a.link ? `href="${a.link}" target="_blank"` : ''}>${a.label}</a>`;
		data.footer_feature.forEach(itm => parent.querySelector('.inner-footer .feature').innerHTML += getAncherTags(itm));
		data.footer_comapny.forEach(itm => parent.querySelector('.inner-footer .company').innerHTML += getAncherTags(itm));
	}
}

async function appendScrollAnimationsText(data) {
	const appendData = (data, elm) => {
		return new Promise((resolve, reject) => {
			;
			elm.querySelector('.heading').innerHTML = data.title;
			elm.querySelector('.content').innerHTML = data.desc;
			resolve();
		});
	}
	if (data instanceof Object && Object.keys(data).length > 0) {
		const animData = [
			{ title: data.title, desc: data.description },
			{ title: data.title_second, desc: data.description_second },
			{ title: data.title_third, desc: data.description_third },
			{ title: data.title_fourth, desc: data.description_fourth }
		]
		for (let i = 0; i <= animData.length - 1; ++i) { await appendData(animData[i], hederAnimatedTexts[i]); }
	} else { document.getElementById('header-animated-text-parent').classList.add('d-none'); }
}
