//Peguei o elemento do form pela DOM, adicionei uma lista de evento, submit ao
// enviar o form, ele n dê rework no form.
document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email_input = document.getElementById('email')
    const password_input = document.getElementById('password')
    const email = email_input.value;
    const password = password_input.value;

    if(!email || !password) return alert('INSIRA OS CAMPOS')
    
})

