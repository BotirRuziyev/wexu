
AOS.init({});
function openMenu() {
    if (window.innerWidth < 993) {
        const html = document.querySelector('html');
        const header = document.querySelector('.header');
        const headerNav = document.querySelector('.header-nav');
        html.classList.toggle('overflow-hidden');
        header.classList.toggle('show');
        headerNav.classList.toggle('show');
    }
}
function openLang(e) {
    const wrapper = e.currentTarget;
    const langMenu = wrapper.querySelector('.lang-menu');
    const langBtn = wrapper.querySelector('.lang-btn');
    langMenu.classList.toggle('show');
    langBtn.classList.toggle('active');

    const langItems = langMenu.querySelectorAll('.lang-item');

    langItems.forEach(clickedItem => {
        clickedItem.onclick = function () {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            }

            langItems.forEach(item => {
                if (item !== this) {
                    item.classList.add('selected');
                    langBtn.childNodes[0].nodeValue = this.textContent + ' ';
                }
            });
        }
    });
}
function openModal(id) {
    const html = document.querySelector('html');
    const modal = document.querySelectorAll(".modal");
    html.classList.add('overflow-hidden');
    modal.forEach(e => {
        const _id = e.getAttribute("id")
        if (_id === id) {
            e.classList.add('show');
        } else {
            e.classList.remove('show');
        }
    })
}
function closeModal() {
    const html = document.querySelector('html');
    const modal = document.querySelectorAll(".modal");
    html.classList.remove('overflow-hidden');
    modal.forEach(e => {
        e.classList.remove('show');
    })
}
var input = document.querySelector("#phone");
if (input) {
    var iti = window.intlTelInput(input, {
        autoHideDialCode: true,
        autoPlaceholder: "ON",
        dropdownContainer: document.body,
        formatOnDisplay: true,
        initialCountry: "ae",
        placeholderNumberType: "MOBILE",
        preferredCountries: ["ae", "sa", "eg"],
        separateDialCode: true
    });
}
// swiper
if (document.querySelector(".clientSwiper")) {
    let swiper = new Swiper(".clientSwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        autoHeight: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            650: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 22,
            },
        },
    });
}
// map
if (document.getElementById("map")) {
    ymaps.ready(init);
    function init() {
        const baseCoordinates = [25.1071791, 55.2401703]
        var myMap = new ymaps.Map("map", {
            center: baseCoordinates,
            zoom: 17,
            controls: []
        });

        var myPlacemark = new ymaps.Placemark(baseCoordinates, {
            hintContent: 'Dubai Hills Business Park - by Emaar',
            balloonContent: 'Dubai Hills Business Park - by Emaar'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/public/img/icons/map-marker.svg',
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40],
            zIndex: 1500,
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.setType('yandex#map');

        function updateMapCenter() {
            let center = baseCoordinates;

            if (window.innerWidth <= 768 && window.innerWidth > 700) {
                myPlacemark.options.set('iconImageOffset', [160, -40]);
                const pixelCenter = myMap.options.get('projection').toGlobalPixels(baseCoordinates, myMap.getZoom());
                const shiftedPixelCenter = [
                    pixelCenter[0] - 200,
                    pixelCenter[1]
                ];
                center = myMap.options.get('projection').fromGlobalPixels(shiftedPixelCenter, myMap.getZoom());
            } else if (window.innerWidth <= 700) {
                myPlacemark.options.set('iconImageOffset', [-20, 50]);
            }

            myMap.setCenter(center);
            myPlacemark.geometry.setCoordinates(center);
        }
        updateMapCenter();
        myMap.events.add('boundschange', updateMapCenter);
        window.addEventListener('resize', () => {
            myMap.events.add('boundschange', updateMapCenter);
        });

    }
}
if (document.getElementById('sendForm')) {
    document.getElementById('sendForm').addEventListener('submit', function (e) {
        e.preventDefault();
    });
}

window.addEventListener('click', function (e) {
    const modal = document.querySelector(".modal-content__in")
    const button = document.querySelector(".home-block .skylinex-button")
    const iti = document.querySelector(".iti--container")
    if (!e.target.closest(".header-nav") && !e.target.closest(".burger-btn") && (modal ? !e.target.closest(".modal-content__in") : true) && (button ? !e.target.closest(".home-block .skylinex-button") : true) && (iti ? !e.target.closest(".iti--container") : true)) {
        const html = document.querySelector('html');
        const header = document.querySelector('.header');
        const headerNav = document.querySelector('.header-nav');
        html.classList.remove('overflow-hidden');
        header.classList.remove('show');
        headerNav.classList.remove('show');
    }

    if (!e.target.closest(".modal-content__in") && !e.target.closest(".home-block .skylinex-button") && !e.target.closest(".iti--container")) {
        closeModal()

    }
});

window.addEventListener('click', function (e) {
    const modal = document.querySelector(".modal-content__in")
    const button = document.querySelector(".home-block .skylinex-button")
    const iti = document.querySelector(".iti--container")

    if (!e.target.closest(".header-nav") && !e.target.closest(".burger-btn") && (modal ? !e.target.closest(".modal-content__in") : true) && (button ? !e.target.closest(".home-block .skylinex-button") : true) && (iti ? !e.target.closest(".iti--container") : true)) {
        const html = document.querySelector('html');
        const header = document.querySelector('.header');
        const headerNav = document.querySelector('.header-nav');
        html.classList.remove('overflow-hidden');
        header.classList.remove('show');
        headerNav.classList.remove('show');
    }
});
emailjs.init("AsU_GtDa3t6C0Tzo7");
if (document.getElementById("contactForm")) {
    document.getElementById("contactForm").addEventListener("submit", (event) => {
        event.preventDefault();
        let name = document.querySelector("#contactForm #name").value.trim();
        let email = document.querySelector("#contactForm #email").value.trim();
        let message = document.querySelector("#contactForm #message").value.trim();
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name === "") {
            alert("Пожалуйста, введите ваше имя!");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Пожалуйста, введите корректный email!");
            return;
        }
        emailjs.send("service_erc90gc", "template_e19wosd", {
            name: name,
            email: email,
            message: message,
        }).then(response => {
            alert("Message sent successfully!");
        }).catch(error => {
            alert("An error occurred: " + error.text);
        });
    })
}

if (document.getElementById('recaptcha-error')) {
    function recaptchaSuccess() {
        document.getElementById('recaptcha-error').style.display = 'none';
    }
    recaptchaSuccess()
}
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var response = grecaptcha.getResponse();
        if (!response) {
            document.getElementById('recaptcha-error').style.display = 'block';
        } else {
            const time = new Date();
            const hours = time.getHours().toString().padStart(2, '0');
            const minutes = time.getMinutes().toString().padStart(2, '0');
            let name = document.querySelector("#contact-form #name").value.trim();
            let email = document.querySelector("#contact-form #email").value.trim();
            let phone = document.querySelector("#contact-form #phone").value.trim();
            let company = document.querySelector("#contact-form #company").value.trim();
            let message = document.querySelector("#contact-form #message").value.trim();
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            phone = "+" + iti.getSelectedCountryData().dialCode + phone

            if (name === "") {
                alert("Пожалуйста, введите ваше имя!");
                return;
            }
            if (!emailPattern.test(email)) {
                alert("Пожалуйста, введите корректный email!");
                return;
            }
            if (phone === "") {
                alert("Пожалуйста, введите ваше имя!");
                return;
            }
            if (company === "") {
                alert("Пожалуйста, введите ваше имя!");
                return;
            }
            emailjs.send("service_uitt1ba", "template_xcy0ro7", {
                name: name,
                time: `${hours}:${minutes}`,
                email: email,
                phone: phone,
                company: company,
                message: message,
            }).then(response => {
                openModal("successModal")
            }).catch(error => {
                alert("Произошла ошибка: " + error.text);
            });
        }

    });
}
