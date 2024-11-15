const firebaseConfig = {
  apiKey: "AIzaSyCebnvxBCyTzDAbFrTr1lQBHEJ9RolBIww",
  authDomain: "pkforall-dbd49.firebaseapp.com",
  projectId: "pkforall-dbd49",
  storageBucket: "pkforall-dbd49.firebasestorage.app",
  messagingSenderId: "862448465532",
  appId: "1:862448465532:web:504225c84a92f26078fbf9",
  measurementId: "G-2TMF5G974L"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const autentificacion = firebase.auth();

const botonIniciarSesion = document.getElementById("login");
const botonCerrarSesion = document.getElementById("logout");
const detailUsuario = document.getElementById("username");
const fotoUser = document.getElementById("user-img");

// Verifica el estado de autenticación
autentificacion.onAuthStateChanged(usuario => {
  if (usuario) {
    // Si el usuario está autenticado, redirige al menú principal
    window.location.href = "menu_principal.html"; // Cambia esta URL a la que corresponda
    mostrarInfoUsuario(usuario);
  } else {
    // Si el usuario no está autenticado, muestra la pantalla de login
    borrardatos();
  }
});

// Evento de inicio de sesión
botonIniciarSesion.addEventListener('click', () => {
  const proveedor = new firebase.auth.GoogleAuthProvider();

  autentificacion.signInWithPopup(proveedor)
    .then(resultado => {
      const usuario = resultado.user;
      mostrarInfoUsuario(usuario);
    })
    .catch(error => {
      console.error('Error al iniciar sesión', error);
    });
});

// Evento de cierre de sesión
botonCerrarSesion.addEventListener('click', () => {
  autentificacion.signOut()
    .then(() => {
      borrardatos();
    })
    .catch(error => {
      console.error("Error al cerrar sesión", error);
    });
});

// Mostrar información del usuario
const mostrarInfoUsuario = (usuario) => {
  detailUsuario.textContent = `Hola bienvenido, ${usuario.displayName}`;
  fotoUser.src = usuario.photoURL;
};

// Borrar datos de usuario cuando se cierre sesión
const borrardatos = () => {
  detailUsuario.textContent = '';
  fotoUser.src = '';
};