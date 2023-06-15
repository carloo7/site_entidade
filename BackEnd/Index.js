function abrirPopUp() {
    var width = window.innerWidth * 0.51; // Defina a largura do pop-up como 80% da largura da janela
    var height = window.innerHeight * 0.57; // Defina a altura do pop-up como 80% da altura da janela
    var left = (window.innerWidth - width) / 2; // Centralize o pop-up horizontalmente
    var top = (window.innerHeight - height) / 2; // Centralize o pop-up verticalmente
    var popup = window.open('login.html', 'popup', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
}

class MobileNavBar {
    constructor(mobileMenu, navList,    navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.mobileMenu.classList.toggle(this.activeClass);
        this.navList.classList.toggle(this.activeClass);
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}
const mobileNavBar = new MobileNavBar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);
mobileNavBar.init();