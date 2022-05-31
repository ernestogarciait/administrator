import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase,collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { uuid } from 'uuidv4';

//ESTA CON LA CUENTA DE REGB2018@GMAIL.COM 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function firebaseConfig() {
/*  const config = {
    apiKey: "AIzaSyDBCQmU9UQ_kvDBETqCRJeKe_lAmMzLlZg",
    authDomain: "sistema-fa054.firebaseapp.com",
    projectId: "sistema-fa054",
    storageBucket: "sistema-fa054.appspot.com",
    messagingSenderId: "769887160696",
    appId: "1:769887160696:web:38eea942e7de3c49a8e08d",
    measurementId: "G-1ZNT5BXFKM"
  };
*/

const config = {
  apiKey: "AIzaSyDO1G8R_jBQtC7-CbNzBbHv7HsMZScBEg8",
  authDomain: "sistemacurso-e3fa6.firebaseapp.com",
  projectId: "sistemacurso-e3fa6",
  storageBucket: "sistemacurso-e3fa6.appspot.com",
  messagingSenderId: "269486836087",
  appId: "1:269486836087:web:040aa0fffc530033573972",
  measurementId: "G-3E318ZJ1HE"
};
  // Initialize Firebase
  const app = initializeApp(config);
  console.log(app);
  const analytics = getAnalytics(app);
}

export function firebaseRegistrarUsuario(email, password) {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {
      // credenciales.user.
    })
}

export async function firebaseIniciarSesion(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
    //credenciales.user
  } catch (e) {
    return false;
  }
  return true;
}

export async function firebaseBuscar(coleccionABuscar) {
  let listado = [];
  let consulta = collection(getFirestore(), coleccionABuscar);
  let resultado = await getDocs(consulta);
  console.log(resultado);
  resultado.forEach(documento => {
    let objeto = documento.data();
    objeto.id = documento.id;
    listado.push(objeto);
  });
  return listado;
}

export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuid();
  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto);
}

export function firebaseEditar(coleccion, objeto) {
 let referencia = doc(getFirestore(), coleccion, objeto.id);
 setDoc(referencia, objeto);
//  const db = getFirestore();
 // db.collection("clientes").doc(objeto.id).update(objeto);
}


export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}