gsap.registerPlugin(ScrollTrigger);
// Draggable

class returnQueen {
	constructor() {
		this.app_store_link = '';
		this.play_store_link = '';
		this.textPositions = { secondFrom: 0, secondTo: 0, thirdFrom: 0, thirdTo: 0, fourth: 0, fifthFrom: 0, fifthTo: 0 }
		this.root = document.getElementsByTagName('HTML')[0];
		this.menuOpener = document.querySelector('.fa-bars');
		this.holder = document.querySelector('.nav-menus-holder');
		this.navbarHolder = document.querySelector('.nav-bar-holder');
		this.navbar = document.querySelector('.nav-bar');
		this.headerAni = document.getElementById('header-animation-holder');
		this.canvas = document.getElementById("hero-lightpass");
		this.context = this.canvas.getContext("2d");
		this.scrollAnimatedTexts = [
			document.querySelector('#header-animated-text-parent .first-content'),
			document.querySelector('#header-animated-text-parent .second-content'),
			document.querySelector('#header-animated-text-parent .third-content'),
			document.querySelector('#header-animated-text-parent .fourth-content'),
			document.querySelector('#header-animated-text-parent .fifth-content'),
		]

		this.images = [];
		this.cframe = { frame: 0 };
		this.frameCount = 567;//567
		this.preLoaded = false;

		this.resizeCanvas();
		//window.addEventListener('resize', () => this.resizeCanvas());
		this.preloadImages(window.innerWidth > 700 ? 'deskani/MAIN ANIMATION WEB REPEIRED_' : 'mobani/RQ phone version_');
		this.menuOpener.addEventListener('click', () => this.holder.classList.toggle('active-menu'));
		this.loadLottieAnimation();
		this.textPositions = this.initScrollAnimationTextPositions();
		document.querySelectorAll('.nav-menus a').forEach(elm => {
			const id = elm.getAttribute('navto');
			if (id != null) { elm.addEventListener('click', () => { this.scrollToElem(id) }) }
		})
	}

	scrollToElem(id) {
		document.getElementById(id).scrollIntoView();
		if (this.holder.classList.contains('active-menu')) { this.holder.classList.remove('active-menu'); }
	}

	getFrame(loc) { return (`./assets/${loc}.jpg`); };

	async preloadImages(name) {
		for (let i = 0; i < this.frameCount; i++) {
			const src = await this.getFrame(i < 10 ? `${name}0000${i}` : i > 99 ? `${name}00${i}` : `${name}000${i}`);
			let img = new Image();
			img.src = src;
			this.images.push(img);
		}
		this.preLoaded = true;
	};

	initAnimations() {
		ScrollTrigger.matchMedia({

			"(min-width: 1024px)": () => {

				gsap.from('#hero-section .inner .lt-side *', {
					x: 30, autoAlpha: 0, stagger: 0.2, duration: 0.8,
					scrollTrigger: {
						trigger: '#hero-section',
						start: 'top center',
						end: 'top+=10 center'
					},
				});

				document.querySelectorAll('.feature-anim').forEach((tg, i) => {
					gsap.from(tg.querySelectorAll('.inner .lt-side .slide-anim'), {
						x: i % 2 === 0 ? -50 : 50, autoAlpha: 0, stagger: 0.2, duration: 0.8,
						scrollTrigger: {
							trigger: tg,
							start: 'top center+=10%',
							end: 'top center+=10%'
						},
					});
				});

				gsap.timeline({
					scrollTrigger: {
						trigger: '#features',
						start: "top center+=10%",
						end: "top center+=10%",
						// toggleActions: "play none reverse none"
					}
				})
					.from('#features', { y: 130, ease: 'power2.out' })
					.from('#features .feature .feature-content', { autoAlpha: 0, y: 50, stagger: 0.2 }, "-=0.5");

				gsap.timeline({
					scrollTrigger: {
						trigger: '#testimonials',
						start: "top center+=10%",
						end: "top center+=10%"
						// toggleActions: "play none reverse none"
					}
				})
					//.from('#testimonials', { y: 100, ease: "power2.out", duration: 0.5 })
					.from('#testimonials .testimonial', { y: 110, stagger: -0.2, duration: 0.8 });

				gsap.from('#pricing .all-pricings .pricing', {
					autoAlpha: 0,
					y: 70,
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
					.from('#join-us .fr img', { x: 100, autoAlpha: 0, }, "-=0.5");

				gsap.timeline({
					scrollTrigger: {
						trigger: '#footer',
						start: "top bottom-=250",
						end: "top bottom-=250"
					}
				}).from('#footer .footer-ani > *', { x: -20, autoAlpha: 0, stagger: 0.05 });

				// Draggable.create(".prices-scrollable", {
				// 	type: "scroll",
				// 	allowNativeTouchScrolling: true
				// });
			},

			"(max-width: 768px)": () => {

				// ScrollTrigger.create({
				// 	trigger: '#partners',
				// 	start: "top center",
				// 	end: "top center",
				// 	onEnter: (tg) => {
				// 		const partner = document.getElementById('partners-parent');
				// 		const totalScrollPos = partner.scrollWidth - partner.clientWidth;
				// 		if (totalScrollPos > partner.clientWidth) {
				// 			partner.scrollLeft = Math.floor(totalScrollPos);
				// 		}
				// 	},
				// 	once: true
				// });

				// ScrollTrigger.create({
				// 	trigger: '#pricing',
				// 	start: "top center",
				// 	end: "top center",
				// 	onEnter: (tg) => {
				// 		if (document.querySelector('.pricing.popular') !== null) {
				// 			document.querySelector('.prices-scrollable').scrollLeft = document.querySelector('.pricing.popular').offsetLeft - 35;
				// 		}
				// 	},
				// 	once: true
				// })

			},

			// all 
			"all": () => {
				/* Scroll Animation */
				gsap.to(this.cframe, {
					frame: this.frameCount - 1,
					snap: "frame",
					scrollTrigger: {
						trigger: ' #hero-lightpass',
						scrub: 0.5,
						start: 'top top',
						//end: 'bottom bottom',
						endTrigger: '#header-animation-holder',
						pin: true,
						//markers: true,
						onUpdate: self => !self.isActive ? this.headerAni.classList.add('negative-index') :
							this.headerAni.classList.remove('negative-index')
					},
					onUpdate: () => this.render()
				});

				ScrollTrigger.create({
					trigger: 'main',
					start: "top top+=90",
					endTrigger: "#end-footer",
					onUpdate: a => {
						if (a.isActive) {
							this.holder.classList.contains('active-menu') ? this.holder.classList.remove('active-menu') : '';
							this.navbarHolder.classList.add('hidden')
						} else {
							this.navbarHolder.classList.remove('hidden');
						}
					}
				});

				// ScrollTrigger.create({
				// 	trigger: '#hero-section',
				// 	start: 'top top+=60',
				// 	end: 'bottom-=60 top',
				// 	onUpdate: a => a.isActive ? this.navbar.classList.remove('purple') : this.navbar.classList.add('purple'),
				// });

				const tt = gsap.timeline({
					scrollTrigger: {
						trigger: '.animation-content',
						start: 'top top',
						end: 'bottom bottom',
						endTrigger: '#header-animation-holder',
						scrub: 0.5,
						pin: true
					}
				});

				tt.fromTo('.first-content',
					{ autoAlpha: 1, y: 0 },
					{ autoAlpha: 0, y: -20, duration: 0.005 });

				tt.fromTo('.second-content', { yPercent: this.textPositions.secondFrom },
					{ yPercent: this.textPositions.secondTo, duration: 0.005 }, 0.001);
				tt.fromTo('.second-content > *', { autoAlpha: 0, y: 50 },
					{ autoAlpha: 1, y: 0, stagger: 0.0025, duration: 0.005 });
				tt.fromTo('.second-content', { autoAlpha: 1, y: this.textPositions.secondTo },
					{ autoAlpha: 0, y: this.textPositions.secondFrom, duration: 0.01 }, 0.123);

				tt.fromTo('.third-content', { yPercent: this.textPositions.thirdFrom },
					{ yPercent: this.textPositions.thirdTo, duration: 0.01 }, 0.195);
				tt.fromTo('.third-content > *', { autoAlpha: 0, y: -50 },
					{ autoAlpha: 1, y: 0, stagger: 0.0030, duration: 0.006 });
				tt.fromTo('.third-content', { autoAlpha: 1 }, { autoAlpha: 0, x: -600, duration: 0.01 }, 0.230);

				tt.fromTo('.fourth-content', { autoAlpha: 0, x: 200, yPercent: this.textPositions.fourth },
					{ autoAlpha: 1, x: 0, duration: 0.01 });
				tt.fromTo('.fourth-content', { autoAlpha: 1 }, { autoAlpha: 0, x: 600, duration: 0.01 }, 0.305);

				tt.fromTo('.fifth-content', { y: this.textPositions.fifthFrom },
					{ y: this.textPositions.fifthTo, duration: 0.01 }, 0.350);
				tt.fromTo('.fifth-content > *', { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 50, stagger: 0.01, duration: 0.02 });

				tt.fromTo('.shadow', { y: 250 }, { y: 150, duration: 0.01 }, 0.5);

				if (document.querySelector('.pricing.popular') !== null) {
					document.querySelector('.prices-scrollable').scrollLeft = document.querySelector('.pricing.popular').offsetLeft - 34;
				}

			}

		});
	}

	render() {
		const img = this.images[this.cframe.frame];
		if (img != undefined) {
			const scale = Math.max(this.canvas.width / img.width, this.canvas.height / img.height);
			const xPos = (this.canvas.width / 2) - (img.width / 2) * scale;
			const yPos = (this.canvas.height / 2) - (img.height / 2) * scale;
			this.context.drawImage(img, xPos, yPos, img.width * scale, img.height * scale);
		}
	}

	resizeCanvas() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	loadLottieAnimation() {
		bodymovin.loadAnimation({
			container: document.getElementById('mb-anim'),
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: 'scripts/hero-anim.json'
		});
	}

	initScrollAnimationTextPositions() {
		if (window.innerWidth > 1921) {
			return { secondFrom: 50, secondTo: 110, thirdFrom: 350, thirdTo: 390, fourth: 200, fifthFrom: 650, fifthTo: 550 };
		} else if (window.innerWidth == 700 || window.innerWidth > 700 && window.innerWidth < 1921) {
			return { secondFrom: 20, secondTo: 70, thirdFrom: 240, thirdTo: 280, fourth: 170, fifthFrom: 200, fifthTo: 150 };
		} else if (window.innerWidth > 350 && window.innerWidth < 700) {
			return { secondFrom: 10, secondTo: 40, thirdFrom: 100, thirdTo: 150, fourth: 100, fifthFrom: 210, fifthTo: 100 };
		} else if (window.innerWidth > 300 && window.innerWidth < 349) {
			return { secondFrom: 10, secondTo: 55, thirdFrom: 120, thirdTo: 180, fourth: 100, fifthFrom: 100, fifthTo: 50 };
		}
	}

	removeloaderAnmation() {
		const parent = document.querySelector('.loader');
		parent.querySelector('.content').classList.add('scale-down');
		setTimeout(() => parent.classList.add('slide-out'), 550);
		this.root.classList.remove('no-overflow');
	}

	initTemplate(data) {
		this.app_store_link = data.joinus[0].app_store_link;
		this.play_store_link = data.joinus[0].play_store_link;
		return new Promise(async (resolve, reject) => {
			await this.appendScrollAnimationsText(data.main_header[0]);
			await this.appendHero(data.sub_header[0]);
			await this.appendSuperFeatures(data.super_feature);
			await this.appendSaveTimeWorld(data.save_time_money_world);
			await this.appendTestimonilas(data.testimonial);
			await this.appendPrices(data.price, data.price_cms[0]);
			await this.appendPartners(data.partners, data.partner_cms[0]);
			await this.appendJoinUs(data.joinus[0]);
			await this.appendFooter(data.footer[0]);
			resolve('all data appended');
		})
	}

	appendScrollAnimationsText(data) {
		return new Promise(async (resolve, reject) => {
			const animData = [
				{ title: data.title, desc: data.description },
				{ title: data.title_second, desc: data.description_second },
				{ title: data.title_third, desc: data.description_third },
				{ title: data.title_fourth, desc: data.description_fourth },
				{ title: data.title_fifth, desc: data.description_fifth }
			]
			for (let i = 0; i <= animData.length - 1; ++i) {
				await this.getHeaderAnimationText(animData[i], this.scrollAnimatedTexts[i], i);
			}
			console.log('appended scroll animated text');
			resolve();
		})
	}

	appendHero(data) {
		const hero = document.getElementById('hero-content-parent');
		return new Promise(async (resolve, reject) => {
			hero.innerHTML = await this.getHeroSection(data);
			console.log('appended hero');
			resolve();
		});
	}

	appendSuperFeatures(data) {
		const parent = document.getElementById('super-feature-parent');
		return new Promise(async (resolve, reject) => {
			for (let i = 0; i <= data.length - 1; ++i) {
				parent.innerHTML += await this.getSuperFeature(data[i], i % 2 != 0 ? true : false, i);
			}
			console.log('appended super features');
			resolve();
		})
	}

	appendSaveTimeWorld(data) {
		const parent = document.getElementById('features-parent');
		return new Promise(async (resolve, reject) => {
			for (let i = 0; i <= data.length - 1; ++i) {
				parent.innerHTML += await this.getSaveTimeMoneyWorld(data[i]);
			}
			console.log('appended save time world');
			resolve();
		})
	}

	appendTestimonilas(data) {
		const parent = document.getElementById('testimonials-parent');
		return new Promise(async (resolve, reject) => {
			for (let i = 0; i <= data.length - 1; ++i) {
				parent.innerHTML += await this.getTestimonial(data[i]);
			}
			console.log('appended testimonials');
			resolve();
		})
	}

	appendPrices(data, header) {
		const priceHeader = document.querySelector('.pricing-inner .section-header');
		const pricesParent = document.getElementById('prices-parent');
		return new Promise(async (resolve, reject) => {
			priceHeader.innerHTML = await this.getSectionHeader(header);
			for (let i = 0; i <= data.length - 1; ++i) {
				pricesParent.innerHTML += await this.getPrice(data[i]);
			}
			console.log('appended prices');
			resolve();
		})
	}

	appendPartners(data, header) {
		const parent = document.getElementById('partners-parent');
		const partnersHeader = document.querySelector('.partners-inner .section-header');
		const fwdBtn = document.querySelector('.partners-holder .fa-angle-right');
		const bwdBtn = document.querySelector('.partners-holder .fa-angle-left');
		if (data.length <= 5) { fwdBtn.classList.add('disabled'); }
		fwdBtn.addEventListener('click', () => {
			let maxScrollLeft = parent.scrollWidth - parent.clientWidth;
			if (parent.scrollLeft !== maxScrollLeft) {
				bwdBtn.classList.contains('disabled') ? bwdBtn.classList.remove('disabled') : '';
				parent.scrollLeft += parent.scrollWidth / data.length
			} else {
				fwdBtn.classList.add('disabled');
			}
		});
		bwdBtn.addEventListener('click', () => {
			if (parent.scrollLeft != 0) {
				fwdBtn.classList.contains('disabled') ? fwdBtn.classList.remove('disabled') : '';
				parent.scrollLeft -= parent.scrollWidth / data.length;
			} else {
				bwdBtn.classList.add('disabled');
			}
		});


		return new Promise(async (resolve, reject) => {
			partnersHeader.innerHTML = await this.getSectionHeader(header);
			for (let i = 0; i <= data.length - 1; ++i) {
				parent.innerHTML += await this.getPartner(data[i]);
			}
			console.log('appended partners');
			resolve();
		})
	}

	appendJoinUs(data) {
		const parent = document.getElementById('join-us-parent');
		return new Promise(async (resolve, reject) => {
			parent.innerHTML = await this.getJoinUs(data);
			console.log('appended join us');
			resolve();
		})
	}

	async appendFooter(data) {
		const parent = document.getElementById('footer');
		const descLinks = data.footer[0];
		parent.querySelector('.copyright').innerHTML = descLinks.copyright ? descLinks.copyright : `© ${new Date().getFullYear()}, Returnqueens. All Rights Reserved.`;
		parent.querySelector('.inner-footer .det').innerHTML += descLinks.description;
		descLinks.linkedin ?
			this.setSocialLink(parent.querySelector('.inner-footer .socials .li-link'), descLinks.linkedin)
			: parent.querySelector('.inner-footer .socials .li-link').classList.add('d-none');
		descLinks.twitter ?
			this.setSocialLink(parent.querySelector('.inner-footer .socials .tw-link'), descLinks.twitter)
			: parent.querySelector('.inner-footer .socials .tw-link').classList.add('d-none');
		descLinks.instagram ?
			this.setSocialLink(parent.querySelector('.inner-footer .socials .insta-link'), descLinks.instagram)
			: parent.querySelector('.inner-footer .socials .insta-link').classList.add('d-none');

		parent.querySelector('.inner-footer .feature').innerHTML += await this.getFooterAncherTags(data.footer_feature);
		parent.querySelector('.inner-footer .company').innerHTML += await this.getFooterAncherTags(data.footer_comapny);
		console.log('appended footer');
	}

	setSocialLink(elm, link) {
		elm.setAttribute('href', link);
		elm.setAttribute('target', '_blank');
	}

	// HTML GETTERS
	getHeroSection(data) {
		return new Promise((resolve, reject) => {
			resolve(data ?
				`<h4 class="font-size-30">${data.title}</h4>
				<div class="text-light-sec font-size-16">${data.description}</div>` :
				`<h4 class="font-size-30">Power in organization</h4>
				<div class="text-light-sec font-size-16">
					<p>The RQ app empowers users by organizing their purchases and return deadlines automatically. Here’s how it
						works: Once a user syncs their email, or uploads a receipt, the app identifies purchases and presents them so 
						that it’s easy to navigate while keeping information private and secure.
					</p>
				</div>
				`
			);
		})
	}

	getSuperFeature(data, isEven, index) {
		return new Promise((resolve, reject) => {
			resolve(`
			<section class="overflow-hidden feature-anim ${isEven ? 'light-section-bg' : 'bg-white'}">
				<div class="my-container common-section ${isEven ? 'reverted' : ''} ${index == 1 ? 'no-padding' : ''}">
					<div class="inner">
						<div class="lt-side align-center">
							<h4 class="txt-primary font-size-30 font-bold slide-anim">${data.title}</h4>
							<div class="font-size-16 font-medium text-secondary line-height-32 slide-anim">
								${data.description}
							</div>
						</div>
						<div class="rt-side position-relative d-flex align-items-end">
							<video playsInline muted autoplay loop preload="auto">
								<source src="${data.video}" type="video/mp4" />
							</video>
						</div>
					</div>
				</div>
			</section>`
			);
		})
	}

	getSaveTimeMoneyWorld(data) {
		return new Promise((resolve, reject) => {
			resolve(`
				<div class="feature">
					<div class="feature-img-holder d-flex justify-content-center align-items-center">
						<img src="${data.img}" class="img-fluid" />
					</div>
					<div class="feature-content">
						<h4 class="mb-4">${data.title}</h4>
						<div class="font-size-16 font-medium text-light-sec line-height-27">${data.description}</div>
					</div>
				</div>`
			);
		})
	}

	getTestimonial(data) {
		const getStar = () => {
			return new Promise((resolve, rejct) => {
				let stars = '';
				new Array(parseInt(data.rating)).fill(1)
					.forEach(i => stars += '<i class="fa fa-star ml-1 mr-1 txt-primary" aria-hidden="true"></i>');
				resolve(stars);
			});
		}

		return new Promise(async (resolve, reject) => {
			let stars = await getStar();
			resolve(`
				<div class="testimonial">
					<div class="testi-by">
						<img src="${data.img}" />
					</div>
					<div class="testi-content m-auto">
						<h4 class="txt-primary mb-4 font-bold">${data.author}</h4>
						<div class="text-secondary font-medium font-size-16 line-height-32 desc">${data.description}</div>
						<div class="rating mt-4 mb-4">${stars}</div>
						<small class="txt-primary font-bold testi-form d-inline-block">${data.location}</small>
					</div>
				</div>`
			);
		})
	}

	getPrice(data) {
		return new Promise((resolve, rejct) => {
			let price = data.price.split(',');
			resolve(
				`<div class="pricing ${data.is_popular == '1' ? 'popular' : ''}">
					<div class="pricing-content">
							<div class="pricing-title">
								<h4 class="txt-primary font-bold font-size-35">${data.title}</h4>
								${data.is_popular == '1' ? '<p class="popular-txt font-medium">Most popular!</p>' : ''}
							</div>
							<p class="text-secondary desc line-height-27 font-size-16">${data.description}</p>

							<div class="points font-medium font-size-16">${data.points}</div>
					</div>

					<div class="price-footer">
						<p class="txt-primary price">$<span>${price[0]}.</span>${price[1] ? price[1] : '00/mo'}</p>
						<button class="get-btn font-medium w-100">
							Get <i class="fa fa-long-arrow-right ml-2" aria-hidden="true"></i>
						</button>
					</div>

				</div>`
			);
		});
	}

	getPartner(data) {
		return new Promise((resolve, reject) => {
			resolve(`
				<a class="partner" ${data.link ? `href="${data.link}" target="_blank"` : ''}>
					<img src="${data.img}" class="w-100" />
				</a>`
			);
		});
	}

	getJoinUs(data) {
		return new Promise((resolve, reject) => {
			resolve(`
				<div class="join-us-content">
					<h4 class="mt-4 font-bold font-size-35">${data.title}</h4>
					<div class="mt-5 font-size-16 line-height-27">${data.description}</div>
				</div>
				<div class="btn-holder mt-5">
					<button>
						<a ${this.app_store_link ? `href="${this.app_store_link}"` : ''} target="_blank">
							<i class="fa fa-apple" aria-hidden="true"></i>App Store
						</a>
					</button>
					<button>
						<a ${this.play_store_link ? `href="${this.play_store_link}"` : ''} target="_blank">
							<img src="assets/gplay.svg" width="26" />Play Store
						</a>
					</button>
				</div>`
			);
		})
	}

	getFooterAncherTags(data) {
		const getAncherTags = a => `<a ${a.link ? `href="${a.link}" target="_blank"` : ''}>${a.label}</a>`;
		let tags = '';
		data.forEach(itm => itm.label ? tags += getAncherTags(itm) : '');
		return tags;
	}

	getHeaderAnimationText(data, elm, index) {
		return new Promise((resolve, reject) => {
			if (index === 0) {
				if (this.app_store_link) { elm.querySelector('.app-store a').setAttribute('href', this.app_store_link); }
				if (this.play_store_link) { elm.querySelector('.play-store a').setAttribute('href', this.play_store_link); }
			}
			elm.querySelector('.heading').innerHTML = data.title;
			elm.querySelector('.content').innerHTML = data.desc;
			resolve();
		});
	}

	getSectionHeader(data) {
		return new Promise((resolve, reject) => {
			resolve(`
				<h4 class="txt-primary font-bold font-size-35">${data.header}</h4>
				<p class="text-secondary font-medium font-size-16 mt-4">${data.subheader}</p>
			`)
		})
	}

}

let ispreloadCheckTimeout;
let rq = new returnQueen();

fetch('https://www.bitpastel.io/ReturnQueen/admin/api/cms_data/fetch_cms_data')
	.then(res => res.json())
	.then(data => {
		rq.initTemplate(data.response)
			.then(d => {
				ispreloadCheckTimeout = setInterval(() => {
					if (rq.preLoaded) {
						console.log('initilizing animations');
						rq.removeloaderAnmation();
						rq.initAnimations()
						clearInterval(ispreloadCheckTimeout);
					}
				}, 600);
			})
	});
