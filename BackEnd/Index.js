function abrirPopUp() {
    var width = window.innerWidth * 0.8; // Defina a largura do pop-up como 80% da largura da janela
    var height = window.innerHeight * 0.85; // Defina a altura do pop-up como 80% da altura da janela
    var left = (window.innerWidth - width) / 2; // Centralize o pop-up horizontalmente
    var top = (window.innerHeight - height) / 2; // Centralize o pop-up verticalmente
    var popup = window.open('Login.html', 'popup', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
}
