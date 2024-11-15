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
const autentificacion=firebase.auth();

const botoniniciarsesion=document.getElementById("login");
const botoncerrarsesion=document.getElementById("logout");
const detailusuario=document.getElementById("username");
const fotoUser=document.getElementById("user-img");

//Evento de inicio de sesion
botoniniciarsesion.addEventListener('click', ()=>{
  const proveedor=new firebase.auth.GoogleAuthProvider();
  
  autentificacion.signInWithPopup(proveedor)

    .then(resultado=>{
    const usuario=resultado.user;
    mostrarInfoUsuario(usuario);
  }) .cath(error =>{
    console.error('Error al iniciar sesion',error)
  })
}

);

botoncerrarsesion.addEventListener('click',()=>{
  autentificacion.signOut()
  .then(()=>{
    borrardatos()
  })
  .catch(error=>{
    console.error("Error al cerrar sesion", error);
  });
});

const mostrarInfoUsuario=(usuario)=>{
  detailusuario.textContent=`Hola bienvenido, ${usuario.displayName}`;
  fotoUser.src=usuario.photoURL;
};

const borrardatos=()=>{
  detailusuario.textContent='';
  fotoUser.src='';
}
  autentificacion.onAuthStateChanged(usuario=>{
    if(usuario){
      mostrarInfoUsuario(usuario)
    }else{
      borrardatos();
    }
  });