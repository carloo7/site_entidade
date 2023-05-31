document.addEventListener('DOMContentLoaded', function() {
  const emailInput = document.getElementById("email");
  const resultadoElement = document.getElementById("resultado");
  const jogosv = document.getElementById("jogosv");
  const enviarButton = document.getElementById("enviar");
  const verificarButton = document.getElementById("validar");
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  const firebaseConfig = {
    apiKey: "AIzaSyCbmUld8xcMMRNgaxho2tW4Z692OJbul_I",
    authDomain: "projeto-maua-e-sports.firebaseapp.com",
    databaseURL: "https://projeto-maua-e-sports-default-rtdb.firebaseio.com",
    projectId: "projeto-maua-e-sports",
    storageBucket: "projeto-maua-e-sports.appspot.com",
    messagingSenderId: "859489211111",
    appId: "1:859489211111:web:f4fb5e9b1d7354f2cf8842",
    measurementId: "G-L3LEW174YS"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  function validarEmail() {
    const email = emailInput.value;
    const regex = /^\d{2}\.\d{5}-\d@maua\.br$/;
    const resultado = regex.test(email);

    if (resultado) {
      exibirMensagem("E-mail válido!", true);
      enviarButton.disabled = false;
    } else {
      exibirMensagem("E-mail inválido! O formato do email deve ser XX.XXXXX-X@maua.br", false);
      enviarButton.disabled = true;
    }

    return resultado;
  }

  function verificarEmailExistente(email) {
    const emailRef = database.ref('dados');
    emailRef.orderByChild('email').equalTo(email).once('value', function(snapshot) {
      if (snapshot.exists()) {
        exibirMensagem("E-mail já cadastrado!", false);
        enviarButton.disabled = true;
      } else {
        exibirMensagem("E-mail válido!", true);
        enviarButton.disabled = false;
      }
    });
  }

  function exibirMensagem(mensagem, valido) {
    resultadoElement.textContent = mensagem;
    resultadoElement.classList.remove("valido", "invalido");
    resultadoElement.classList.add(valido ? "valido" : "invalido");
  }

  function checkFieldset() {
    var jogos = Array.from(checkboxes).map(checkbox => checkbox.checked ? "1" : "0").join("");
    jogosv.value = jogos;
  }

  function enviarDadosParaFirebase(email, jogos) {
    const newDataRef = database.ref('dados').push();

    const data = {
      email: email,
      jogos: jogos,
      timestamp: new Date().toISOString()
    };

    newDataRef.set(data, function(error) {
      if (error) {
        exibirMensagem("Erro ao enviar os dados para o Firebase.", false);
        console.error('Erro ao enviar os dados para o Firebase:', error);
      } else {
        exibirMensagem("Dados enviados para o Firebase com sucesso!", true);
        console.log('Dados enviados para o Firebase:', data);
        setTimeout(function() {
          window.close();
        }, 3000);
      }
    });
  }

  enviarButton.disabled = true;

  enviarButton.addEventListener('click', function(event) {
    event.preventDefault();

    if (validarEmail()) {
      const email = emailInput.value;
      const jogos = jogosv.value;
      enviarDadosParaFirebase(email, jogos);
    }
  });

  verificarButton.addEventListener('click', function(event) {
    event.preventDefault();

    if (validarEmail()) {
      const email = emailInput.value;
      verificarEmailExistente(email);
    }
  });

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", checkFieldset);
  });
});
