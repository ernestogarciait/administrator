state = {
    returndata: [],
  };

export async function fecthMenu() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idusuario: 1})
    };
    // GET request using fetch with error handling
    fetch('http://localhost:9000/api/menu',requestOptions)
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            this.setState({ returndata: data.total })
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        return this.getState((curState) => {returndata});
         
}

export async function fecthMenu2() {
    let listado = [];
    let consulta = collection(getFirestore(), coleccionABuscar);
    let resultado = await getDocs(consulta);

    resultado.forEach(documento => {
      let objeto = documento.data();
      objeto.id = documento.id;
      listado.push(objeto);
    });
    return listado;
  }
  