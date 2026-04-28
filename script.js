/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Page Loader
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    });

    // 2. Scroll Progress Bar & Sticky Navbar & Back to Top
    const progressBar = document.getElementById("scroll-progress");
    const navbar = document.getElementById("navbar");
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        // Progress Bar
        let scrollTotal = document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrollPosition = (scrollTotal / height) * 100;
        progressBar.style.width = scrollPosition + "%";

        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Back to Top Button
        if (window.scrollY > 500) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll(".reveal");
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 4. Number Counter Animation (Triggered on scroll)
    const counters = document.querySelectorAll(".counter");
    let hasCounted = false;

    const counterObserver = new IntersectionObserver(function(entries) {
        if(entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute("data-target");
                    const count = +counter.innerText;
                    const speed = 40; 
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.getElementById("stats");
    if(statsSection) counterObserver.observe(statsSection);

    // 5. Live Date and Time for Dashboard
    const liveTimeElement = document.getElementById("live-time");
    function updateTime() {
        const now = new Date();
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        liveTimeElement.innerText = now.toLocaleDateString('en-US', options);
    }
    setInterval(updateTime, 1000);
    updateTime();

    // 6. Dashboard Subject Filter Logic
    const subjectFilter = document.getElementById("subject-filter");
    const tableRows = document.querySelectorAll("#table-body tr");

    subjectFilter.addEventListener("change", function() {
        const selectedValue = this.value;
        tableRows.forEach(row => {
            if (selectedValue === "all") {
                row.style.display = "";
            } else {
                if (row.getAttribute("data-subject") === selectedValue) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            }
        });
    });
});
