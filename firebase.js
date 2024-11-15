const firebaseConfig = {
  apiKey: "AIzaSyCebnvxBCyTzDAbFrTr1lQBHEJ9RolBIww",
  authDomain: "pkforall-dbd49.firebaseapp.com",
  projectId: "pkforall-dbd49",
  storageBucket: "pkforall-dbd49.firebasestorage.app",
  messagingSenderId: "862448465532",
  appId: "1:862448465532:web:504225c84a92f26078fbf9",
  measurementId: "G-2TMF5G974L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const autentificacion = firebase.auth();

// Obtenemos los elementos del DOM
const botoniniciarsesion = document.getElementById("login");
const botoncerrarsesion = document.getElementById("logout");
const detailusuario = document.getElementById("username");
const fotoUser = document.getElementById("user-img");

// Evento de inicio de sesión
botoniniciarsesion.addEventListener('click', () => {
  const proveedor = new firebase.auth.GoogleAuthProvider();

  autentificacion.signInWithPopup(proveedor)
    .then(resultado => {
      const usuario = resultado.user;
      mostrarInfoUsuario(usuario);
      window.location.href = "menu_principal.html";  // Redirigir al menú principal si inicia sesión
    })
    .catch(error => {
      console.error('Error al iniciar sesión', error);
    });
});

// Evento de cerrar sesión
botoncerrarsesion.addEventListener('click', () => {
  autentificacion.signOut()
    .then(() => {
      borrardatos();
      window.location.href = "index.html";  // Redirigir al index (login) después de cerrar sesión
    })
    .catch(error => {
      console.error("Error al cerrar sesión", error);
    });
});

// Mostrar información del usuario
const mostrarInfoUsuario = (usuario) => {
  detailusuario.textContent = `Hola bienvenido, ${usuario.displayName}`;
  fotoUser.src = usuario.photoURL;
};

// Borrar los datos del usuario
const borrardatos = () => {
  detailusuario.textContent = '';
  fotoUser.src = '';
};

// Verificar el estado de autenticación
autentificacion.onAuthStateChanged(usuario => {
  if (usuario) {
    mostrarInfoUsuario(usuario);
    window.location.href = "menu_principal.html";  // Redirigir automáticamente al menú si el usuario está autenticado
  } else {
    borrardatos();
    window.location.href = "index.html";  // Redirigir al login si no hay usuario autenticado
  }
});