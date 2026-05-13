document.addEventListener("DOMContentLoaded", function () {
    var v = document.querySelector(".hero-demo-video");
    if (v) {
        function tryPlay() {
            var p = v.play();
            if (p && typeof p.then === "function") p.catch(function () {});
        }
        if (v.readyState >= 2) tryPlay();
        else v.addEventListener("canplay", tryPlay, { once: true });
        v.addEventListener("click", function () {
            if (v.paused) tryPlay();
        });
    }

    var proofRoot = document.getElementById("field-proof");
    var tabs = proofRoot ? proofRoot.querySelectorAll(".tab-btn") : document.querySelectorAll("#field-proof .tab-btn");
    var panels = proofRoot ? proofRoot.querySelectorAll(".tab-panel") : [];
    var tablist = proofRoot ? proofRoot.querySelector('[role="tablist"]') : null;

    function activateTab(tab) {
        if (!tab) return;
        tabs.forEach(function (t) {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
            t.setAttribute("tabindex", "-1");
        });
        panels.forEach(function (p) {
            p.classList.remove("active");
            p.hidden = true;
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        tab.setAttribute("tabindex", "0");
        var id = tab.getAttribute("aria-controls");
        var activePanel = id ? document.getElementById(id) : null;
        if (activePanel) {
            activePanel.classList.add("active");
            activePanel.hidden = false;
        }
    }

    if (tabs.length && panels.length) {
        tabs.forEach(function (tab) {
            tab.addEventListener("click", function () {
                activateTab(tab);
            });
        });
        if (tablist) {
            tablist.addEventListener("keydown", function (e) {
                var list = Array.prototype.slice.call(tabs);
                var i = list.indexOf(document.activeElement);
                if (i < 0) return;
                var next = i;
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    next = (i + 1) % list.length;
                    e.preventDefault();
                } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    next = (i - 1 + list.length) % list.length;
                    e.preventDefault();
                } else if (e.key === "Home") {
                    next = 0;
                    e.preventDefault();
                } else if (e.key === "End") {
                    next = list.length - 1;
                    e.preventDefault();
                } else {
                    return;
                }
                list[next].focus();
                activateTab(list[next]);
            });
        }
    }

    var dayNightRoot = document.querySelector("[data-day-night]");
    var dayNightRange = document.querySelector("[data-day-night-range]");
    if (dayNightRoot && dayNightRange) {
        var dayNightVtext = document.documentElement.lang === "pl" ? "% profilu nocnego" : "% night profile visible";
        dayNightRange.addEventListener("input", function () {
            dayNightRoot.style.setProperty("--exposure", this.value + "%");
            this.setAttribute("aria-valuenow", this.value);
            this.setAttribute("aria-valuetext", this.value + dayNightVtext);
        });
    }

    var form = document.getElementById("prelaunch-form");
    var submitBtn = document.getElementById("waitlist-submit");
    var emailInput = document.getElementById("waitlist-email");
    var isPl = document.documentElement.lang.toLowerCase().indexOf("pl") === 0;

    function formSuccessState() {
        if (!submitBtn || !emailInput) return;
        submitBtn.textContent = isPl ? "Zabezpieczono" : "Secured";
        submitBtn.style.backgroundColor = "#00E5FF";
        submitBtn.style.color = "#0F172A";
        emailInput.value = "";
        emailInput.placeholder = isPl ? "Oczekuj sygnału." : "Awaiting signal.";
    }

    window.ml_webform_success_187353900174541990 = function () {
        formSuccessState();
    };

    if (form && submitBtn && emailInput) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var gotcha = form.querySelector('[name="_gotcha"]');
            if (gotcha && gotcha.value) {
                formSuccessState();
                return;
            }

            var email = emailInput.value.trim();
            if (!email) return;

            submitBtn.disabled = true;
            emailInput.disabled = true;
            submitBtn.textContent = isPl ? "Autoryzacja..." : "Authorizing...";

            var mlUrl =
                "https://assets.mailerlite.com/jsonp/2344423/forms/187353900174541990/subscribe?fields%5Bemail%5D=" +
                encodeURIComponent(email) +
                "&_=" +
                new Date().getTime();
            var script = document.createElement("script");
            script.src = mlUrl;
            script.async = true;

            script.onload = function () {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };
            script.onerror = function () {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                submitBtn.disabled = false;
                emailInput.disabled = false;
                submitBtn.textContent = isPl ? "Błąd. Ponów." : "Error. Retry.";
            };

            document.head.appendChild(script);
        });
    }

    var lightbox = document.getElementById("field-proof-lightbox");
    if (!lightbox) return;
    var lightboxImg = lightbox.querySelector(".lightbox-target-image");
    var triggers = proofRoot ? proofRoot.querySelectorAll("[data-lightbox-trigger]") : document.querySelectorAll("#field-proof [data-lightbox-trigger]");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    if (!lightboxImg || !closeBtn) return;

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
        setTimeout(function () {
            lightboxImg.src = "";
            lightboxImg.alt = "";
        }, 300);
    }

    triggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            var sourceImage = trigger.querySelector("img");
            if (!sourceImage) return;
            openLightbox(sourceImage.currentSrc || sourceImage.src, sourceImage.alt);
        });
    });

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
});
