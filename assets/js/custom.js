!(function (e) {
    "use strict";
    async function t(t) {
        await bfrGrid.destoryBuild(),
            await a("poster"),
            await a("src"),
            await a("srcset"),
            t ||
                ((window.$effectScroll = await (function () {
                    const t = window.Scrollbar;
                    var i = document.querySelector("#bfr-scrollbar");
                    return {
                        start: function () {
                            $body.removeClass("locked-scroll"),
                                e(".box-view-item .box-img .bfr-scroll-box").each(function () {
                                    t.init(this, { damping: 0.06 });
                                }),
                                this.isScroller(!0) && (t.init(i, { damping: 0.06, renderByPixels: !0, continuousScrolling: !1, plugins: { overscroll: !0 } }), this.contactForm());
                        },
                        contactForm: function () {
                            const i = e(".contact-modal .contact-container");
                            i.length && t.init(i.get(0), { damping: 0.06 });
                        },
                        isScroller: function (e) {
                            e && (i = document.querySelector("#bfr-scrollbar"));
                            let t = !$body.hasClass("bfr-effect-scroll") || bfrGrid.isMobile() || null === i;
                            return t && e && $body.addClass("bfr-mobile"), !t;
                        },
                        locked: function () {
                            if (($body.addClass("locked-scroll"), this.isScroller())) {
                                let e = this.getScrollbar();
                                void 0 !== e && e.destroy(), (e = null);
                            }
                        },
                        getScrollbar: function (e) {
                            return void 0 === e ? t.get(i) : t.get(document.querySelector(e));
                        },
                        getListener: function (e, t = !0) {
                            if (void 0 === e) return;
                            let i = this;
                            i.isScroller() ? i.getScrollbar().addListener(e) : t && $wind.on("scroll", e), (i = null);
                        },
                        scrollNavigate: function () {
                            let t = e(".wrapper").offset();
                            (t = t ? t.top : 0),
                                e(".scroll-top , .scroll-to-top").on("click", function () {
                                    bfrGrid.scrollTop(0, 2);
                                }),
                                e(".scroll-d").on("click", function () {
                                    bfrGrid.scrollTop(t, 2, -1 * e(".scrollmagic-pin-spacer").height() - 200 || -200);
                                });
                        },
                    };
                })()),
                (window.$animate = await (function () {
                    const t = Linear.easeNone;
                    return {
                        allInt: function () {
                            this.clearControl()
                                .then(() => {
                                    this.headerPages();
                                })
                                .then(() => {
                                    this.animations();
                                })
                                .then(() => {
                                    this.parallaxMulti();
                                })
                                .then(() => {
                                    this.parallaxImg();
                                })
                                .then(() => {
                                    this.moveSection();
                                })
                                .then(() => {
                                    this.parallaxImgHover();
                                })
                                .then(() => {
                                    this.nextProject();
                                })
                                .then(() => {
                                    this.bfrScrollTop();
                                })
                                .then(() => {
                                    this.translateSection();
                                })
                                .then(() => {
                                    $effectScroll.scrollNavigate(),
                                        $effectScroll.getListener(function (e) {
                                            $scene.forEach(function (e) {
                                                e.refresh();
                                            });
                                        });
                                });
                        },
                        clearControl: async function () {
                            $controller.destroy(!0), ($controller = new ScrollMagic.Controller({ refreshInterval: 0 }));
                            for (let e of $scene) e.destroy(!0), (e = null);
                            $scene = [];
                        },
                        nextProject: function () {
                            const t = e(".next-project"),
                                i = t.find(".case img"),
                                n = t.find(".bg img"),
                                a = t.find(".title"),
                                o = gsap.timeline();
                            if (!t.length) return;
                            i.length && o.to(i, { rotation: 360 }, 0), n.length && o.to(n, { scale: 1 }, 0);
                            const r = bfrGrid
                                .tweenMaxParallax($controller)
                                .addParrlax({
                                    id: t,
                                    triggerHook: 1,
                                    duration: "95%",
                                    tween: gsap
                                        .timeline({ yoyo: !0 })
                                        .fromTo(n, { y: -100, scale: 1, yoyo: !0, overwrite: "none" }, { y: 0, scale: 1.2 }, 0)
                                        .fromTo(t.find(".project-number , .metas"), { y: -100, yoyo: !0, overwrite: "none" }, { y: 0 }, 0),
                                });
                            if ((r && $scene.push(r), bfrGrid.isMobile())) return;
                            r.on("progress", function (e) {
                                n.css({ filter: "blur(" + 10 * e.progress + "px)" });
                            }),
                                a.length && o.to(a.find("span.d-none"), { yoyo: !0, overwrite: "none", width: "100%" }, 0);
                            const l = bfrGrid.tweenMaxParallax($controller).addParrlax({ id: t, triggerHook: 0, duration: 1e3, tween: o, _fixed: !0 });
                            l.on("progress", function (e) {
                                t.find(".case .number").text((100 * e.progress).toFixed(0) + "%"), n.css({ filter: "blur(" + (10 - 10 * e.progress) + "px)" }), e.progress > 0.998 && t.find("a").click();
                            }),
                                l && $scene.push(l);
                        },
                        parallaxImg: async function () {
                            let t = this;
                            e('[data-bfr-grid="move-up"]').each(function () {
                                const i = gsap.timeline({ yoyo: !0 });
                                t.tweenImage(e(this), i);
                                let n = bfrGrid.tweenMaxParallax($controller).addParrlax({ id: this, triggerHook: bfrGrid.getData(this, "triggerhook", 1), duration: bfrGrid.getData(this, "duration", "200%"), tween: i });
                                n && $scene.push(n), (n = null);
                            });
                        },
                        tweenImage: function (e, i) {
                            let n = e.find("img:not(.hidden) , video");
                            if ((e.attr("data-bfr-grid", "moveUp"), n.length > 0)) {
                                let a = bfrGrid.getData(n, "speed", "180"),
                                    o = { scale: 1, y: 0, yoyo: !0, ease: t, overwrite: "none" };
                                gsap.set(n, { height: "+=" + a, y: n.hasClass("has-opposite-direction") ? "+=" + a : "-=" + a }, 0),
                                    n.hasClass("has-scale") && (o.scale = 1.1),
                                    n.css("perspective", e.width() > 1e3 ? 1e3 : e.width()),
                                    i.to(n, 1, o, 0);
                            }
                        },
                        parallaxMulti: async function () {
                            let t = this;
                            e("[data-bfr-animate-multi]").each(function () {
                                bfrGrid.getData(this, "animate-multi");
                                const i = gsap.timeline({ yoyo: !0, overwrite: "none" });
                                e(this)
                                    .find('[data-bfr-grid="move-up"]')
                                    .each(function () {
                                        t.tweenImage(e(this), i);
                                    }),
                                    e(this)
                                        .find('[data-bfr-grid="move-section"]')
                                        .each(function () {
                                            t.tweenMoveSection.bind(this, i)();
                                        });
                                let n = bfrGrid.getData(this, "duration", "200%"),
                                    a = bfrGrid.getData(this, "triggerhook", 1);
                                0 == n && (n = e(this).outerHeight() * (a + 1));
                                let o = bfrGrid.tweenMaxParallax($controller).addParrlax({ id: this, triggerHook: a, duration: n, tween: i });
                                o && $scene.push(o), (o = null);
                            });
                        },
                        animations: async function () {
                            let i = this;
                            e('[data-bfr-animate="section"]').each(function () {
                                bfrGrid.getData(this, "animate");
                                const n = { $this: e(this), gsap: gsap.timeline({ paused: !0, ease: t, overwrite: "none" }) };
                                i.animateFade(n, e(this).find(".bfr-up"))
                                    .then(() => {
                                        i.animateText(n, e(this).find(".bfr-text"));
                                    })
                                    .then(() => {
                                        e(this).find(".line").length && i.animateLine(n);
                                    })
                                    .then(() => {
                                        i.animateSkills(n, e(this).find(".skills-item .fill"));
                                    })
                                    .then(() => {
                                        i.animateNumbers(n, e(this).find(".has-animate-number"));
                                    })
                                    .then(() => {
                                        n.gsap._totalDuration = 1;
                                        const t = bfrGrid.tweenMaxParallax().addParrlax({ id: this, reverse: !1, triggerHook: 0.5, duration: 0, tween: n.gsap });
                                        n.$this.find(".circular-item .circle").length &&
                                            (n.$this.find(".circular-item .circle").circleProgress({ size: 160, lineCap: "round", startAngle: -Math.PI, fill: { gradient: ["#11468b", "#14bfb5"] } }),
                                            t.on("start", function () {
                                                n.$this
                                                    .find(".circular-item .circle")
                                                    .circleProgress({})
                                                    .on("circle-animation-progress", function (t, i) {
                                                        e(this)
                                                            .find("h4")
                                                            .html(Math.round(t.target.dataset.value * i * 100) + "%");
                                                    });
                                            }));
                                    });
                            });
                        },
                        animateFade: async function (e, t, i = 0) {
                            t.length && e.gsap.staggerFromTo(t, 0.8, { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: i, overwrite: "none", ease: Back.easeOut.config(1.7) }, 0.2, 0);
                        },
                        animateText: function (t, i) {
                            i.length &&
                                i.each(function () {
                                    bfrGrid.convertTextLine(this, "words"),
                                        e(this).addClass("overflow-hidden"),
                                        t.gsap.staggerFrom(e(this).find(".bfr-word-wrapper"), 0.6, { willChange: "transform", transformOrigin: "left", opacity: 0, scaleX: 2, ease: Back.easeOut.config(2) }, 0.1, 0);
                                });
                        },
                        animateLine: function (e, t) {
                            e.gsap.addLabel("line", 0),
                                e.$this.find(".line.line-top").length && e.gsap.from(e.$this.find(".line.line-top").toArray(), 1, { scaleX: 0, transformOrigin: "right" }, "line"),
                                e.$this.find(".line.line-left").length && e.gsap.from(e.$this.find(".line.line-left").toArray(), 1, { scaleY: 0, transformOrigin: "top" }, "line+=1"),
                                e.$this.find(".line.line-bottom").length && e.gsap.from(e.$this.find(".line.line-bottom").toArray(), 1, { scaleX: 0, transformOrigin: "left" }, "line+=2"),
                                e.$this.find(".line.line-right").length && e.gsap.from(e.$this.find(".line.line-right").toArray(), 1, { scaleY: 0, transformOrigin: "bottom" }, "line+=3");
                        },
                        animateSkills: function (t, i) {
                            i.each(function (i) {
                                let n = e(this);
                                t.gsap.to(
                                    n,
                                    1,
                                    {
                                        width: n.data("width"),
                                        onUpdate: function () {
                                            n.find(".number").text(((n.width() / n.parent().width()) * 100).toFixed(0) + "%");
                                        },
                                        onComplete: function () {
                                            n = null;
                                        },
                                    },
                                    0.2 * i
                                );
                            });
                        },
                        animateNumbers: function (t, i) {
                            t.gsap.addLabel("number", 0),
                                i.each(function (i) {
                                    let n = e(this),
                                        a = { value: 0 };
                                    t.gsap.to(
                                        a,
                                        4,
                                        {
                                            value: n.text(),
                                            ease: Back.easeOut.config(1.2),
                                            onUpdate: function () {
                                                n.text(bfrGrid.numberText(a.value.toFixed(0)));
                                            },
                                            onComplete: function () {
                                                n = a = null;
                                            },
                                        },
                                        "number+=" + 0.2 * i
                                    );
                                });
                        },
                        headerPages: function () {
                            e(".bfr-header-animation").each(function () {
                                let i = e(this),
                                    n = i.find(".bfr-hero-parallax-img"),
                                    a = i.find(".bfr-hero-parallax-title");
                                const o = gsap.timeline();
                                n.length && o.to(n, { y: "30%", yoyo: !0, ease: t, overwrite: "none" }, 0), a.length && o.to(a, { y: "-15%", autoAlpha: 0, yoyo: !0, ease: t, overwrite: "none" }, 0);
                                let r = bfrGrid.tweenMaxParallax($controller).addParrlax({ id: this, triggerHook: 0, duration: "100%", tween: o });
                                r && $scene.push(r), (r = n = i = void 0);
                            });
                        },
                        moveSection: function () {
                            let t = this;
                            e('[data-bfr-grid="move-section"]').each(function () {
                                let i = e(this);
                                const n = gsap.timeline({ yoyo: !0 });
                                t.tweenMoveSection.bind(this, n)();
                                const a = bfrGrid.tweenMaxParallax($controller).addParrlax({ id: this, triggerHook: bfrGrid.getData(i, "triggerhook", 1), duration: bfrGrid.getData(i, "duration", "150%"), tween: n });
                                $scene.push(a), (i = null);
                            });
                        },
                        tweenMoveSection: function (i) {
                            let n = e(this);
                            bfrGrid.getData(this, "grid"),
                                n.addClass("bfr-move-section"),
                                ("tablet" === bfrGrid.getData(this, "responsive") && bfrGrid.isMobile()) ||
                                    i.to(n, 1, { y: bfrGrid.getData(n, "move", -150), autoAlpha: bfrGrid.getData(n, "opacity", n.css("opacity")), ease: t, yoyo: !0, overwrite: "none" }, 0);
                        },
                        parallaxImgHover: function () {
                            bfrGrid.isMobile() ||
                                e('[data-bfr="parallax"]').each(function () {
                                    let t = e(this);
                                    t.removeAttr("data-bfr"), bfrGrid.parallaxMoveElement(t, bfrGrid.getData(t, "move", 20), bfrGrid.getData(t, "speed", 0.5), t.find(".bfr-parallax-rev").get(0), t.hasClass("image-zoom")), (t = null);
                                });
                        },
                        bfrScrollTop: function () {
                            const t = e(".wrapper");
                            if (!t.length || !e(".scroll-to-top").length) return;
                            gsap.to(".scroll-to-top", 1, { right: -100, autoAlpha: 0 });
                            const i = bfrGrid
                                .tweenMaxParallax($controller)
                                .addParrlax({
                                    id: t,
                                    triggerHook: t.offset().top > 50 ? 0.5 : 0,
                                    offset: t.offset().top > 50 ? 0 : 100,
                                    duration: t.height() - 0.5 * $wind.height() + (e(".next-project").outerHeight() || 0) - (t.offset().top > 50 ? 0 : 300),
                                    tween: gsap.to(".scroll-to-top > img", 0.3, { rotation: t.height() / 2 }),
                                });
                            i.on("progress", function (t) {
                                e(".scroll-to-top .box-numper span").text((100 * t.progress).toFixed(0) + "%");
                            }),
                                i.on("enter", function () {
                                    gsap.to(".scroll-to-top", 1, { right: 10, autoAlpha: 1 });
                                }),
                                i.on("leave", function () {
                                    gsap.to(".scroll-to-top", 1, { right: -100, autoAlpha: 0 });
                                }),
                                i && $scene.push(i);
                        },
                        translateSection: function () {
                            e(".section-image.section-move-image .transform-move-section").each(function () {
                                const t = gsap.timeline();
                                let i = 0;
                                e(this)
                                    .find(".swiper-slide")
                                    .each(function () {
                                        i += e(this).outerWidth();
                                    }),
                                    e(this).append(e(this).find(".swiper-slide").clone()),
                                    e(this).append(e(this).find(".swiper-slide").clone()),
                                    (i -= e(this).width()),
                                    e(this).hasClass("move-left") ? t.to(this, { x: -1 * i }) : t.from(this, { x: -1 * i });
                                let n = bfrGrid.tweenMaxParallax($controller).addParrlax({ id: this, triggerHook: bfrGrid.getData(this, "triggerhook", 1), duration: bfrGrid.getData(this, "duration", "200%"), tween: t });
                                n && $scene.push(n);
                            });
                        },
                    };
                })()),
                await (function () {
                    const t = e(".site-header");
                    return {
                        init: function () {
                            t.length && (this.cutterText(), this.hamburgerOpen());
                        },
                        cutterText: function () {
                            let e = t.find(".menu-icon .text-menu");
                            if (e.length <= 0) return;
                            let i = e.find(".text-button"),
                                n = e.find(".text-open"),
                                a = e.find(".text-close");
                            bfrGrid.convertTextLine(i), bfrGrid.convertTextLine(n), bfrGrid.convertTextLine(a), (a = null), (n = null), (i = null), (e = null);
                        },
                        hamburgerOpen: function () {
                            const i = t.find(".menu-icon"),
                                n = t.find(".main-navigation");
                            let a = gsap.timeline({
                                paused: !0,
                                onReverseComplete: function () {
                                    setTimeout(function () {
                                        i.find(".icon-top , .icon-bottom").css("transform", "").css("display", "");
                                    }, 50),
                                        console.log("onReverseComplete : tl");
                                },
                            });
                            var o = gsap.timeline({
                                onReverseComplete: function () {
                                    (o = gsap.timeline()), console.log("onReverseComplete : menuClick");
                                },
                            });
                            let r = Power3.easeOut;
                            a.set(i.find(".icon-center"), { display: "none" }),
                                a.to(i.find(".icon-top"), 0.5, { width: 23, rotation: 45, top: 0, ease: r }),
                                a.to(i.find(".icon-bottom"), 0.5, { width: 23, rotation: -45, top: 0, ease: r }, 0),
                                a.call(function () {
                                    i.toggleClass("nav-active");
                                }, 0),
                                a.to(n, 0.5, { y: "0%", autoAlpha: 1, ease: r }, 0),
                                a.fromTo(n, 0.5, { y: "-100%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: Expo.easeInOut }, 0),
                                a.staggerTo(n.find("ul.extend-container > li > a .bfr-title-menu"), 0.5, { autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.7) }, 0.05),
                                a.set(n.find("ul.extend-container > li > a .bfr-meta-menu"), { autoAlpha: 1, ease: r }),
                                a.to(n.find(".container-content"), 1, { autoAlpha: 1 }, "-=1"),
                                a.reverse(),
                                n.find("ul.extend-container > li.bfr-drop-down").on("click", function (t) {
                                    t.stopPropagation(),
                                        o._tDur > 0 ||
                                            ((o = gsap.timeline({
                                                onReverseComplete: function () {
                                                    o = gsap.timeline();
                                                },
                                            })).set(e(this).find("ul"), { display: "flex" }),
                                            o.to(n.find("ul.extend-container > li > a ").find(".bfr-title-menu , .bfr-meta-menu"), 0.5, { y: -30, autoAlpha: 0, ease: Back.easeIn.config(1.7) }),
                                            o.set(".site-header .extend-container .main-navigation ul.extend-container li", { overflow: "hidden" }),
                                            o.staggerFromTo(e(this).find("ul li"), 0.5, { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Back.easeOut.config(1.7) }, 0.1));
                                }),
                                i.off("click"),
                                i.on("click", function () {
                                    console.log("mainIcon:click"), a.isActive() || (o.reverse(-1), a.reversed(!a.reversed()), (o = gsap.timeline()));
                                });
                            let l = e(".bfr-back-menu");
                            l.off("click"),
                                l.on("click", function (e) {
                                    console.log("backMenu:click"), e.stopPropagation(), o.reverse();
                                });
                        },
                    };
                })().init(),
                await bfrGrid.removeWhiteSpace(".site-header ul.extend-container li > a"),
                await (function () {
                    const t = e(".box-options");
                    t.find(".title-mode").each(function () {
                        bfrGrid.convertTextLine(this);
                    }),
                        t.find(".day-night").on("click", function () {
                            const t = e(".v-dark"),
                                i = e(".v-light");
                            $body.toggleClass("v-dark"), t.removeClass("v-dark").addClass("v-light"), i.addClass("v-dark").removeClass("v-light");
                        }),
                        t.find(".mode-layout").on("click", function () {
                            $body.toggleClass("bfr-line-style");
                            for (let e of $build.swiper) e.update();
                            o();
                        });
                })()),
            t && (await r(t)),
            e("a.vid").YouTubePopUp(),
            await (function (t) {
                const i = e(".contact-btn");
                i.on("click", () => {
                    $body.toggleClass("bfr-show-contact");
                });
            })(),
            await $effectScroll.start(),
            await (function () {
                $wind.off("scroll");
                const t = e(".wrapper");
                let i = 0;
                var n = t.offset(),
                    a = t.find("> *:first-child"),
                    o = 0;
                a.length && (n = "HEADER" === a.get(0).nodeName ? a.outerHeight() : void 0 !== n ? n.top : 70),
                    $effectScroll.getListener(function (e) {
                        (i = "scroll" === e.type ? $wind.scrollTop() : e.offset.y),
                            n > 170 && (n -= 100),
                            i > n ? (o < i ? $body.addClass("nav-bg").addClass("hide-nav") : $body.removeClass("hide-nav")) : $body.removeClass("nav-bg").removeClass("hide-nav"),
                            (o = i);
                    });
            })(),
            await $animate.allInt(),
            await (function () {
                const t = e(".main-slider");
                let i = gsap.timeline();
                return {
                    run: async function () {
                        let n = this;
                        t.each(function () {
                            let a = e(this),
                                o = a.hasClass("has-horizontal"),
                                r = a.find(".slide-inner");
                            r.hasClass("bfr-webgl")
                                ? n.initWebgel(e(this)).then((e) => {
                                      t.find(".control-nav .slider-total-index").html(bfrGrid.numberText(e.imgs.length)),
                                          bfrGrid.WebGLDistortionHoverEffects(e, {
                                              parent: r,
                                              vertical: !o,
                                              nextEl: t.find(".next-container"),
                                              prevEl: t.find(".prev-container"),
                                              onComplete: function () {},
                                              onStart: function (e, i) {
                                                  n.slideChangeWeb(t, o ? "x" : "y", e, i, this.mat.uniforms.effectFactor.value < 0);
                                              },
                                          });
                                  })
                                : r.find(".slide-item").length &&
                                  n.initSlider(a).then(function (e) {
                                      let t = n.swiperObject(a, !o);
                                      n.slideChange(t, a, o ? "x" : "y"),
                                          bfrGrid.addSwiper(t),
                                          console.log(t.getTranslate()),
                                          a.find(".next-container").on("click", function () {
                                              i.isActive() || t.slideNext();
                                          }),
                                          a.find(".prev-container").on("click", function () {
                                              i.isActive() || t.slidePrev();
                                          });
                                  });
                        });
                    },
                    initSlider: async function (t) {
                        t.find(".slide-item").each(function (i) {
                            let n = e(this);
                            n.attr("data-bfr-id", i);
                            let a = e(this).find(".slide-content");
                            a.attr("data-bfr-id", i), 0 === i && a.addClass("bfr-active bfr-active-cat"), t.find(".bfr-slider-content > .bfr-container").append(a);
                            let o = a.find(".title");
                            o.find("a").length && (o = o.find("a")), bfrGrid.convertTextLine(o), (n = a = o = null);
                        });
                    },
                    swiperObject: function (t, i = !0) {
                        return new Swiper(t.find(".slide-inner").get(0), {
                            speed: 1e3,
                            grabCursor: !0,
                            allowTouchMove: !0,
                            direction: i ? "vertical" : "horizontal",
                            slidesPerView: 1,
                            parallax: !0,
                            loop: !1,
                            loopAdditionalSlides: 10,
                            watchSlidesProgress: !0,
                            watchSlidesVisibility: !0,
                            pagination: {
                                el: t.find(".slider-current-index").get(0),
                                type: "custom",
                                clickable: !0,
                                renderCustom: function (e, i, n) {
                                    return t.find(".slider-total-index").html(bfrGrid.numberText(n)), bfrGrid.numberText(i);
                                },
                            },
                            on: {
                                init: function () {
                                    this.autoplay.stop();
                                    let n = this;
                                    t.find('[data-bfr="video"] video').each(function () {
                                        this.pause();
                                    }),
                                        (this.touchEventsData.formElements = "*"),
                                        t.find("[data-swiper-parallax]").each(function () {
                                            let t = e(this).attr("data-swiper-parallax").replace("%", "");
                                            e(this).attr({ "data-swiper-parallax": (t / 100) * (i ? n.height : n.width) });
                                        });
                                },
                                touchStart: function () {
                                    e(this.slides).css("transition", ""),
                                        !bfrGrid.isMobile() &&
                                            $body.hasClass("bfr-cursor-effect") &&
                                            (e(this.slides).parents(".main-slider").hasClass("has-horizontal")
                                                ? e(".cursor").addClass("cursor-scale-half cursor-drag cursor-next cursor-prev")
                                                : e(".cursor").addClass("cursor-scale-half cursor-up-down cursor-drag cursor-next cursor-prev"));
                                },
                                touchEnd: function () {
                                    !bfrGrid.isMobile() &&
                                        $body.hasClass("bfr-cursor-effect") &&
                                        (e(this.slides).hasClass("has-horizontal")
                                            ? e(".cursor").removeClass("cursor-scale-half cursor-drag cursor-next cursor-prev")
                                            : e(".cursor").removeClass("cursor-scale-half cursor-up-down cursor-drag cursor-next cursor-prev"));
                                },
                            },
                        });
                    },
                    slideChange: function (t, n, a) {
                        let o = this;
                        t.on("slideChange", async function () {
                            let r = n.find(".bfr-slider-content .bfr-active"),
                                l = r.data("bfr-id"),
                                s = e(t.slides[t.activeIndex]),
                                c = s.data("bfr-id");
                            if (l === c) return;
                            n.find('[data-bfr="video"] video').each(function () {
                                this.pause();
                            });
                            let f = e(this.slides[this.activeIndex]).find('[data-bfr="video"] video');
                            f.length && f.get(0).play();
                            let d = r.find(".bfr-chars-wrapper");
                            r.removeClass("bfr-active-cat");
                            let h = n.find('.bfr-slider-content [data-bfr-id="' + c + '"]'),
                                u = h.find(".bfr-chars-wrapper"),
                                p = l > c;
                            i.progress(1),
                                (i = new gsap.timeline()).staggerFromTo(p ? d.toArray().reverse() : d, 0.3, o.showText(a).title, o.hideText(p, a).title, 0.05, 0, function () {
                                    n.find(".bfr-slider-content .slide-content").removeClass("bfr-active").removeClass("bfr-active-cat"), h.addClass("bfr-active"), h.addClass("bfr-active-cat");
                                }),
                                i.staggerFromTo(p ? u.toArray().reverse() : u, 0.8, o.hideText(!p, a).title, o.showText(a).title, 0.05, "-=.1"),
                                (r = l = s = c = f = d = u = p = null);
                        });
                    },
                    slideChangeWeb: function (e, t, n, a, o) {
                        e.find(".control-nav .slider-current-index").html(bfrGrid.numberText(n + 1));
                        let r = e.find(".bfr-slider-content .bfr-active").find(".bfr-chars-wrapper"),
                            l = e.find('.bfr-slider-content [data-bfr-id="' + n + '"]'),
                            s = l.find(".bfr-chars-wrapper");
                        e.find(".slide-inner").attr("data-overlay", l.data("overlay")),
                            i.progress(1),
                            (i = new gsap.timeline()).staggerFromTo(o ? r.toArray().reverse() : r, 0.3, this.showText(t).title, this.hideText(o, t).title, 0.05, 0, function () {
                                e.find(".bfr-slider-content .slide-content").removeClass("bfr-active").removeClass("bfr-active-cat"), l.addClass("bfr-active"), l.addClass("bfr-active-cat");
                            }),
                            i.staggerFromTo(o ? s.toArray().reverse() : s, 0.8, this.hideText(!o, t).title, this.showText(t).title, 0.05, "-=.1");
                    },
                    showText: function (e) {
                        let t = { title: { autoAlpha: 1, scale: 1, ease: "back.out(4)", yoyo: !0 } };
                        return (t.title[e] = "0%"), t;
                    },
                    hideText: function (e, t) {
                        let i = { title: { autoAlpha: 0, ease: "back.in(4)", yoyo: !0 } };
                        return (i.title[t] = e ? "40%" : "-40%"), i;
                    },
                    initWebgel: async function (t) {
                        let i = [],
                            n = [];
                        return (
                            t.find(".bfr-slider-content .slide-content").each(function (t) {
                                let a = e(this);
                                (i[t] = a.data("webgel-src")), (n[t] = a.data("overlay")), a.attr("data-bfr-id", t), 0 === t && a.addClass("bfr-active bfr-active-cat");
                                let o = a.find(".title a");
                                bfrGrid.convertTextLine(o), (a = o = null);
                            }),
                            t.find(".slide-inner").attr("data-overlay", n[0]),
                            {
                                imgs: i,
                                overlay: n,
                                displacement: bfrGrid.getData(t.find(".slide-inner"), "displacement", "assets/img/displacement/8.jpg"),
                                intensity: bfrGrid.getData(t.find(".slide-inner"), "intensity", -2),
                                speedIn: bfrGrid.getData(t.find(".slide-inner"), "speedIn", 1.2),
                                speedOut: bfrGrid.getData(t.find(".slide-inner"), "speedOut", 1.2),
                                easing: bfrGrid.getData(t.find(".slide-inner"), "easing", "Expo.easeInOut"),
                            }
                        );
                    },
                };
            })().run(),
            await o(),
            await {
                swiper: function (t, i) {
                    (t = bfrGrid.convertToJQuery(t)),
                        (i = e.extend(
                            !0,
                            {
                                slidesPerView: 1,
                                centeredSlides: !0,
                                spaceBetween: 0,
                                grabCursor: !0,
                                speed: 1e3,
                                parallax: !0,
                                loop: !0,
                                slideToClickedSlide: !0,
                                pagination: { el: t.find(".swiper-pagination").get(0), clickable: !0 },
                                navigation: { nextEl: t.find(".swiper-next").get(0), prevEl: t.find(".swiper-prev").get(0) },
                            },
                            i
                        ));
                    let n = new Swiper(t.find(".swiper-container").get(0), i);
                    bfrGrid.addSwiper(n);
                },
                run: function () {
                    let t = this;
                    e(".bfr-swiper").each(function () {
                        let i = bfrGrid.getData(this, "option", {}),
                            n = e(this).parent().find(bfrGrid.getData(this, "controller"));
                        n.length && (i.thumbs = { swiper: { el: n.find(".swiper-container").get(0), allowTouchMove: !1, slidesPerView: 1, speed: i.speed || 1e3, parallax: !0, autoHeight: !0 } }),
                            (i.breakpoints = {
                                768: { slidesPerView: i.slidesPerView >= 1 ? (i.slidesPerView > 1.5 ? 2 : 1.3) : 1, spaceBetween: i.slidesPerView > 1 ? (i.spaceBetween > 21 ? 20 : i.spaceBetween) : 0 },
                                992: { slidesPerView: i.slidesPerView, spaceBetween: i.spaceBetween || 0 },
                                575: { slidesPerView: 1, spaceBetween: 0 },
                            }),
                            n.length &&
                                ((i.thumbs = { swiper: { el: n.find(".swiper-container").get(0), allowTouchMove: !1, slidesPerView: 1, speed: i.speed || 1e3, parallax: !0, autoHeight: !0 } }),
                                (i.breakpoints[768] = { slidesPerView: 1, spaceBetween: 0 })),
                            (i.slidesPerView = 1),
                            (i.spaceBetween = 0),
                            t.swiper(this, i);
                    });
                },
            }.run(),
            await void e(".bfr-accordion").each(function () {
                let t = e(this),
                    i = t.find(".accordion__question");
                i.on("click", function () {
                    let n = e(this).next();
                    t.find(".accordion__answer").not(n).slideUp(400), i.not(this).removeClass("expanded"), e(this).toggleClass("expanded"), n.slideToggle(400), (n = null);
                });
            }),
            await (function () {
                let t = e(".map-custom");
                if (t.length) {
                    if (!e("#map_api").length) {
                        let e = "AIzaSyA5bpEs3xlB8vhxNFErwoo3MXR64uavf6Y",
                            t = document.createElement("script");
                        (t.type = "text/javascript"), (t.id = "map_api"), (t.src = "https://maps.googleapis.com/maps/api/js?key=" + e), document.body.appendChild(t), (e = t = null);
                    }
                    setTimeout(function () {
                        try {
                            let e = t.data("bfr-lat"),
                                i = t.data("bfr-len"),
                                n = t.data("bfr-zoom"),
                                a = new google.maps.LatLng(e, i),
                                o = new google.maps.Map(t.get(0), {
                                    center: { lat: e, lng: i },
                                    mapTypeControl: !1,
                                    scrollwheel: !1,
                                    draggable: !0,
                                    streetViewControl: !1,
                                    navigationControl: !1,
                                    zoom: n,
                                    styles: [
                                        { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] },
                                        { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] },
                                        { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] },
                                        { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }] },
                                        { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] },
                                        { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] },
                                        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 21 }] },
                                        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] },
                                        { elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }] },
                                        { elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }] },
                                        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                                        { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] },
                                        { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#fefefe" }, { lightness: 20 }] },
                                        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }] },
                                    ],
                                });
                            google.maps.event.addDomListener(window, "resize", function () {
                                let e = o.getCenter();
                                google.maps.event.trigger(o, "resize"), o.setCenter(e), (e = null);
                            }),
                                new google.maps.Marker({ position: a, animation: google.maps.Animation.BOUNCE, icon: "assets/img/map-marker.png", title: "ASL", map: o }),
                                (e = i = n = a = null);
                        } catch (e) {
                            console.log(e);
                        }
                    }, 500);
                } else t = null;
            })(),
            await (async function () {
                const t = e(".bfr-paginate-right-page");
                t.length &&
                    (t.empty(),
                    e("[data-bfr-title]").each(function () {
                        const i = bfrGrid.getData(this, "title"),
                            n = e(this).offset().top,
                            a = e('<div class="bfr-link-paginate text-transform-upper"></div>');
                        a.html(i),
                            t.append(a),
                            a.on("click", function () {
                                bfrGrid.scrollTop(n, 1, -150);
                            });
                    }));
            })(),
            await (function () {
                let t = {
                    delegate: "a:not(.effect-ajax)",
                    type: "image",
                    closeOnContentClick: !1,
                    closeBtnInside: !1,
                    mainClass: "mfp-with-zoom",
                    gallery: { enabled: !0 },
                    zoom: {
                        enabled: !0,
                        duration: 400,
                        easing: "cubic-bezier(0.36, 0, 0.66, -0.56)",
                        opener: function (e) {
                            return e.find("img");
                        },
                    },
                    callbacks: {
                        open: function () {
                            e("html").css({ margin: 0 });
                        },
                    },
                };
                e(".gallery-portfolio").each(function () {
                    e(this).magnificPopup(t);
                }),
                    e(".has-popup .pop-up").length && (t.delegate = "a.pop-up"),
                    e(".has-popup").magnificPopup(t);
            })(),
            await void e(".gallery-portfolio").each(function () {
                e(this).justifiedGallery({ rowHeight: 250, margins: 15 });
            }),
            await (function () {
                class e {
                    constructor(e) {
                        (this.DOM = { el: e }),
                            (this.DOM.reveal = document.createElement("div")),
                            (this.DOM.reveal.className = "hover-reveal"),
                            (this.DOM.reveal.innerHTML = `<div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div>`),
                            this.DOM.el.appendChild(this.DOM.reveal),
                            (this.DOM.revealImg = this.DOM.reveal.querySelector(".hover-reveal__img")),
                            bfrGrid.convertTextLine(this.DOM.el.querySelectorAll(".work__item-text")),
                            (this.DOM.letters = [...this.DOM.el.querySelectorAll(".work__item-text span")]),
                            this.initEvents();
                    }
                    initEvents() {
                        (this.positionElement = (e) => {
                            if ($body.hasClass("bfr-ajax-effect")) return;
                            const t =
                                ((n = 0),
                                (a = 0),
                                (i = e) || (i = window.event),
                                i.pageX || i.pageY
                                    ? ((n = i.pageX), (a = i.pageY))
                                    : (i.clientX || i.clientY) && ((n = i.clientX + document.body.scrollLeft + document.documentElement.scrollLeft), (a = i.clientY + document.body.scrollTop + document.documentElement.scrollTop)),
                                { x: n, y: a });
                            var i, n, a;
                            if ($effectScroll.isScroller()) {
                                const e = $effectScroll.getScrollbar();
                                (this.DOM.reveal.style.top = t.y - this.DOM.reveal.offsetHeight / 2 + e.offset.y + "px"), (this.DOM.reveal.style.left = t.x - (this.DOM.reveal.offsetHeight / 2 - 60) - e.offset.x + "px");
                            } else {
                                const e = { left: document.body.scrollLeft + document.documentElement.scrollLeft, top: document.body.scrollTop + document.documentElement.scrollTop };
                                (this.DOM.reveal.style.top = t.y + 20 - e.top / 150 + "px"), (this.DOM.reveal.style.left = t.x + 20 - e.left + "px");
                            }
                        }),
                            (this.mouseenterFn = (e) => {
                                $body.hasClass("bfr-ajax-effect") || (this.positionElement(e), this.animateLetters(), this.showImage());
                            }),
                            (this.mousemoveFn = (e) =>
                                requestAnimationFrame(() => {
                                    $body.hasClass("bfr-ajax-effect") || this.positionElement(e);
                                })),
                            (this.mouseleaveFn = () => {
                                $body.hasClass("bfr-ajax-effect") || this.hideImage();
                            }),
                            this.DOM.el.addEventListener("mouseenter", this.mouseenterFn),
                            this.DOM.el.addEventListener("mousemove", this.mousemoveFn),
                            this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
                    }
                    showImage() {
                        TweenMax.killTweensOf(this.DOM.revealImg),
                            (this.tl = new TimelineMax({
                                onStart: () => {
                                    (this.DOM.reveal.style.opacity = 1), TweenMax.set(this.DOM.el, { zIndex: 1e3 });
                                },
                            })
                                .add("begin")
                                .set(this.DOM.revealImg, { transformOrigin: "95% 50%", x: "100%" })
                                .add(new TweenMax(this.DOM.revealImg, 0.2, { ease: Sine.easeOut, startAt: { scaleX: 0.5, scaleY: 1 }, scaleX: 1.5, scaleY: 0.7 }), "begin")
                                .add(new TweenMax(this.DOM.revealImg, 0.8, { ease: Expo.easeOut, startAt: { rotation: 10, y: "5%", opacity: 0 }, rotation: 0, y: "0%", opacity: 1 }), "begin")
                                .set(this.DOM.revealImg, { transformOrigin: "0% 50%" })
                                .add(new TweenMax(this.DOM.revealImg, 0.6, { ease: Expo.easeOut, scaleX: 1, scaleY: 1, opacity: 1 }), "begin+=0.2")
                                .add(new TweenMax(this.DOM.revealImg, 0.6, { ease: Expo.easeOut, x: "0%" }), "begin+=0.2"));
                    }
                    hideImage() {
                        TweenMax.killTweensOf(this.DOM.revealImg),
                            (this.tl = new TimelineMax({
                                onStart: () => {
                                    TweenMax.set(this.DOM.el, { zIndex: 999 });
                                },
                                onComplete: () => {
                                    TweenMax.set(this.DOM.el, { zIndex: "" }), TweenMax.set(this.DOM.reveal, { opacity: 0 });
                                },
                            })
                                .add("begin")
                                .add(new TweenMax(this.DOM.revealImg, 0.2, { ease: Sine.easeOut, opacity: 0, x: "-20%" }), "begin"));
                    }
                    animateLetters() {
                        TweenMax.killTweensOf(this.DOM.letters),
                            this.DOM.letters.forEach((e) => TweenMax.set(e, { y: 0 === Math.round(Math.random()) ? "50%" : "0%", opacity: 0 })),
                            TweenMax.to(this.DOM.letters, 1, { ease: Expo.easeOut, y: "0%", opacity: 1 });
                    }
                }
                Array.from(document.querySelectorAll('[data-fx="1"] > .work__item a, a[data-fx="1"]')).forEach((t) => new e(t));
            })(),
            await (function () {
                const t = e("#contact-form");
                t < 1 ||
                    (t.off("submit"),
                    t.on("submit", function (i) {
                        if (!i.isDefaultPrevented())
                            return (
                                t.validator(),
                                e.ajax({
                                    type: "POST",
                                    url: "contact.php",
                                    data: e(this).serialize(),
                                    success: function (e) {
                                        var i = "alert-" + e.type,
                                            n = e.message,
                                            a = '<div class="alert ' + i + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + n + "</div>";
                                        i && n && (t.find(".messages").html(a), t[0].reset()),
                                            setTimeout(function () {
                                                t.find(".messages").html("");
                                            }, 3e3);
                                    },
                                    error: function (e) {
                                        console.log(e);
                                    },
                                }),
                                !1
                            );
                    }));
            })(),
            await i().ajaxLoad(),
            await (e('a[href="#"]').on("click", function (e) {
                e.preventDefault();
            }),
            e('[href*="#"]:not([href="#"])').on("click", function (t) {
                t.preventDefault();
                let i = e(e(this).attr("href"));
                if (!i.length) return (i = null), !1;
                bfrGrid.scrollTop(i.get(0).offsetTop, 1, -100), (i = null);
            }),
            void (window.location.hash.length && ($wind.scrollTop(0), bfrGrid.scrollTop(window.location.hash, 1, -100)))),
            await e(".twentytwenty").twentytwenty();
    }
    function i() {
        var i,
            n,
            a = gsap.timeline();
        return {
            ajaxLoad: function () {
                if (!$body.hasClass("bfr-ajax")) return;
                let t = this;
                this.ajaxClick.off("click"),
                    this.ajaxClick.on("click", function (i) {
                        i.preventDefault();
                        let n = e(this),
                            o = n.attr("href"),
                            r = n.data("bfr-ajax");
                        o.indexOf("#") >= 0 || void 0 === o
                            ? (n = o = r = null)
                            : t.effectAjax() ||
                              (t.effectAjax(!0),
                              e.ajax({
                                  url: o,
                                  dataType: "html",
                                  beforeSend: t.animateAjaxStart.bind(t, r, n),
                                  success: function (e) {
                                      try {
                                          history.pushState(null, "", o), a.call(t.animateAjaxEnd.bind(t, e), null, null, "+=0.2");
                                      } catch (e) {
                                          window.location = o;
                                      }
                                  },
                                  error: function (e) {
                                      window.location = o;
                                  },
                              }));
                    });
            },
            mainRoot: e("main.main-root"),
            ajaxClick: e("a.effect-ajax "),
            effectAjax: function (e) {
                if (e) $body.addClass("bfr-ajax-effect");
                else {
                    if (!1 !== e) return $body.hasClass("bfr-ajax-effect");
                    $body.removeClass("bfr-ajax-effect");
                }
            },
            animateAjaxStart: function (e, t) {
                switch ((a.clear(), a.addLabel("beforeSend"), bfrGrid.isMobile() && "next" === e && (e = void 0), e)) {
                    case "slider":
                        this.ajaxSlider(t);
                        break;
                    case "next":
                        this.ajaxNextProject(t);
                        break;
                    case "work":
                        this.ajaxWork(t);
                        break;
                    case "work-hover":
                        this.ajaxWorkHover(t);
                        break;
                    default:
                        this.ajaxNormal();
                }
                "next" !== e &&
                    ($effectScroll.locked(),
                    a.call(function () {
                        bfrGrid.scrollTop(0, 0.01);
                    }));
            },
            ajaxNormal: function () {
                let t = e('<div class="bfr-ajax-loader bfr-ajax-normal"></div>');
                $body.append(t), a.to(t, 1, { autoAlpha: 1, ease: Expo.easeOut }, 0), (t = null);
            },
            ajaxSlider: function (t) {
                let i = t.parents(".slide-content"),
                    n = i.data("bfr-id"),
                    a = i
                        .parents(".main-slider")
                        .find('.slide-item[data-bfr-id="' + n + '"] .cover-bg')
                        .first(),
                    o = i.find(".title"),
                    r = i.parents(".main-slider").find(".bg-container");
                a.removeClass("hidden"),
                    i.data("webgel-src") && (a = e("<div class='cover-bg'></div>").attr({ "data-overlay": r.find(".bfr-webgl").data("overlay"), style: 'background-image:url("' + i.data("webgel-src") + '")' })),
                    this.bfrCreateElement(a, r, o, o);
            },
            ajaxNextProject: function (e) {
                let t = e.parents(".next-project"),
                    i = t.find(".bg"),
                    n = e;
                const o = window.Scrollbar.get(document.querySelector("#bfr-scrollbar"));
                a.to(o || $wind, 1, { scrollTo: { y: o ? $effectScroll.getScrollbar().limit.y : document.body.scrollHeight } }),
                    a.call(
                        this.bfrCreateElement.bind(this, i, t, n.find(".title"), n, {
                            before: function (e, t, i) {
                                i.removeClass("border-top").removeClass("border-bottom");
                            },
                        })
                    ),
                    a.call(function () {
                        $effectScroll.locked(),
                            a.call(function () {
                                bfrGrid.scrollTop(0, 0.01);
                            });
                    }),
                    (t = i = n = null);
            },
            ajaxWork: function (e) {
                let t = e.parents(".work-item"),
                    n = t.find(".box-img"),
                    o = t.find(".sec-title");
                this.bfrCreateElement(n, n, o, o), a.to(i.find("img"), 0.5, { height: "100%", top: "0%", y: "0" }), (t = n = o = null);
            },
            ajaxWorkHover: function (e) {
                let t = e,
                    i = t.find(".hover-reveal"),
                    n = t.find(".work__item-text");
                this.bfrCreateElement(i.find(".hover-reveal__img"), i, n, n), (t = i = n = null);
            },
            addElement: function (e, t, i) {
                if (void 0 === t || t.length <= 0) return;
                (void 0 === i || i.length <= 0) && (i = t), t.removeClass("line-after").removeClass("line-before");
                let n = t.clone(),
                    a = i[0].getBoundingClientRect();
                return (
                    void 0 === a && (a = { left: 0, top: 0 }),
                    n.css({ position: "fix", display: "block", transform: "", transition: "", objectFit: "cover" }),
                    n.css(bfrGrid.getBoundingClientRect(i[0])),
                    n.css(t.bfrGridStyleObject()),
                    e.append(n),
                    n
                );
            },
            bfrCreateElement: function (t, o, r, l, s = {}) {
                let c = e('<div class="bfr-ajax-loader"></div>');
                (i = this.addElement(c, t, o)),
                    (n = this.addElement(c, r, l)).find(".bfr-chars-wrapper").length || bfrGrid.convertTextLine(n),
                    void 0 !== s.before && s.before(c, i, n),
                    $body.append(c),
                    a.to(c, 1, { autoAlpha: 1, ease: Power4.easeInOut }, "-=0.8"),
                    void 0 !== s.after && s.after(c, i, n);
            },
            completeElement: function (t) {
                let o = e('[data-bfr-ajax="img"]'),
                    r = e('[data-bfr-ajax="title"]');
                if (!o.length && !r.length) {
                    let e = { value: "0%" };
                    return void a.to(e, 1, {
                        value: "100%",
                        onUpdate: function () {
                            t.css("clip-path", "inset(0% 0% " + e.value + " 0%)");
                        },
                        onComplete: function () {
                            e = null;
                        },
                        ease: Circ.easeIn,
                    });
                }
                o = o.first();
                let l = { top: 0, left: 0, width: "100%", height: "100%", transform: "none" };
                if (n.length) {
                    (r = r.first()).find(".bfr-chars-wrapper").length || bfrGrid.convertTextLine(r),
                        void 0 === (l = r.offset()) && (l = { top: 0, left: 0 }),
                        a.set(n.find(".bfr-chars-wrapper"), { x: n.offset().left - l.left, y: n.offset().top - l.top }, "-=1");
                    let e = n.find(".bfr-chars-wrapper").toArray();
                    n.offset().left < l.left && e.reverse(),
                        a.set(n, { top: l.top, left: l.left }, "-=0.8"),
                        a.to(n, 0.4, { padding: "0", borderWidth: 0, yoyo: !0 }),
                        a.to(n, 0.8, { css: r.bfrGridStyleObject(), yoyo: !0 }, "-=0.8"),
                        n.css("width", r.outerWidth()),
                        a.set(e, { color: n.css("color") }),
                        a.staggerTo(e, 0.8, { y: "0", x: "0", ease: Back.easeOut.config(1), color: r.css("color"), yoyo: !0 }, 0.02, "-=0.35");
                }
                o.length && (l = { top: o.get(0).offsetTop, left: o.get(0).offsetLeft, width: o.width(), height: o.height() }),
                    i.length && a.to(i, { duration: 1, top: l.top, left: l.left, width: l.width, height: l.height, objectFit: "cover", borderRadius: 0, ease: Expo.easeIn }, "-=1.4");
                let s = { value: "0%" };
                a.to(s, 0.5, {
                    value: "100%",
                    onUpdate: function () {
                        t.css("clip-path", "inset(0% 0% " + s.value + " 0%)");
                    },
                    onComplete: function () {
                        s = null;
                    },
                    ease: Circ.easeIn,
                });
            },
            animateAjaxEnd: function (i) {
                a.call(
                    function () {
                        bfrGrid.initAjax(i),
                            this.mainRoot.html(e(i).filter("main.main-root").html()),
                            t(!0).catch((e) => {
                                console.error(e);
                            });
                    }.bind(this),
                    null,
                    "+=1"
                );
                let n = e(".bfr-ajax-loader");
                n.hasClass("bfr-ajax-normal") ? a.to(n, 1, { autoAlpha: 0, ease: Expo.easeIn }) : a.call(this.completeElement.bind(this, n)),
                    a.eventCallback(
                        "onComplete",
                        function () {
                            n.remove(), this.effectAjax(!1);
                        }.bind(this)
                    );
            },
            backAnimate: function (t) {
                if (!t) return;
                let i = this;
                e.ajax({
                    url: t,
                    dataType: "html",
                    beforeSend: i.animateAjaxStart.bind(i),
                    success: function (e) {
                        a.call(i.animateAjaxEnd.bind(i, e), null, null, "+=0.2");
                    },
                    error: function (e) {
                        window.location = t;
                    },
                });
            },
        };
    }
    function n() {
        $wind.on("popstate", function (e) {
            if (window.location.hash.length) return $wind.scrollTop(0), void bfrGrid.scrollTop(window.location.hash, 1, -100);
            document.location.href.indexOf("#") > -1 ||
                setTimeout(function () {
                    i().backAnimate(document.location);
                }, 100);
        });
    }
    function a(t) {
        setTimeout(function () {
            e("[data-bfr-" + t + "]").each(function () {
                e(this).attr(t, bfrGrid.getData(this, t, ""));
            });
        }, 100);
    }
    function o() {
        e(".bfr-isotope").each((t, i) => {
            e(i).masonry({ itemSelector: bfrGrid.getData(i, "item", ".grid-item"), horizontalOrder: bfrGrid.getData(i, "horizontalOrder", !0), fitWidth: bfrGrid.getData(i, "fitWidth", !1) });
        }),
            e(".bfr-filter").each(function () {
                const t = e(this).find(".filtering-t "),
                    i = e(this).find(".bfr-item-filter");
                t.length &&
                    i.length &&
                    (i.isotope(),
                    t.find("button").off("click"),
                    t.find("button").on("click", function () {
                        e(this).addClass("active").siblings().removeClass("active"), i.isotope({ filter: e(this).attr("data-filter") });
                    }));
            });
    }
    async function r(t) {
        const i = e(".cursor");
        if (!bfrGrid.isMobile() && $body.hasClass("bfr-cursor-effect")) {
            if (!0 === t) return i.attr("class", "cursor"), void n();
            bfrGrid.mouseMove(i, { speed: 0.5 }), n();
        } else i.length && (i.css("display", "none"), $body.removeClass("bfr-cursor-effect"));
        function n() {
            bfrGrid.elementHover(i, "a:not(> img):not(.vid) , .bfr-button-sidebar,  button , .mfp-container", "cursor-scale-full"),
                bfrGrid.elementHover(i, ".c-hidden , .social-side a", "no-scale"),
                bfrGrid.elementHover(i, ".has-popup a , .work-item-box a:not(.effect-ajax)", "cursor-scale-half cursor-open"),
                bfrGrid.elementHover(i, '[data-cursor="close"]', "cursor-scale-full cursor-close"),
                bfrGrid.elementHover(i, "a.link-pop ", "cursor-scale-full cursor-view");
        }
    }
    !(function () {
        let i = e(".preloader"),
            a = i.find(".percent"),
            o = i.find(".title .text-fill"),
            r = { value: 0 },
            l = i.find(".preloader-bar"),
            s = l.find(".preloader-progress"),
            c = bfrGrid.pageLoad(0, 100, 1e3, function (e) {
                a.text(e), (r.value = e), o.css("clip-path", "inset(" + (100 - e) + "% 0% 0% 0%)"), s.css("width", e + "%");
            });
        i.length ||
            (n(),
            t().catch((e) => {
                console.log(e);
            })),
            $wind.on("load", function () {
                clearInterval(c),
                    gsap
                        .timeline()
                        .to(r, 1, {
                            value: 100,
                            onUpdate: function () {
                                a.text(r.value.toFixed(0)), o.css("clip-path", "inset(" + (100 - r.value) + "% 0% 0% 0%)"), s.css("width", r.value + "%");
                            },
                        })
                        .to(i.find("> *"), { y: -30, autoAlpha: 0 })
                        .call(function () {
                            i.length &&
                                (n(),
                                t().catch((e) => {
                                    console.log(e);
                                }));
                        })
                        .set(r, { value: 0 })
                        .to(
                            r,
                            0.8,
                            {
                                value: 100,
                                onUpdate: function () {
                                    i.css("clip-path", "inset(" + r.value + "% 0% 0% 0%)");
                                },
                                ease: Power2.easeInOut,
                            },
                            "+=0.5"
                        )
                        .call(function () {
                            i.remove(), (c = i = a = o = r = l = s = null);
                        });
            });
    })(),
        r();
})(jQuery);
