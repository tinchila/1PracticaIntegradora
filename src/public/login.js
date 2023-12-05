// Reemplaza 'fetch' por 'node-fetch'
import fetch from 'node-fetch'

const form =
    // document.getElementById('loginForm');

    form.addEventListener('submit', e => {
        e.preventDefault()

        const formData = new FormData(form)
        const loginData = {}

        formData.forEach((value, key) => {
            loginData[key] = value
        })

        fetch('http://localhost:3000/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 200) {
                    // window.location.replace('/');
                } else {
                    // Manejar la respuesta en caso de error
                }
            })
            .catch(error => {
                // Manejar errores de la solicitud
                console.error('Error al realizar la solicitud:', error)
            })
    })
