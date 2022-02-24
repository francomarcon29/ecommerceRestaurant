window.addEventListener('load',function(){
    //Capturar el formulario 
    let formulario = document.querySelector('.formulario');
    //console.log(formulario.elements.email.value);
    formulario.addEventListener('submit',function(evento){
        if(!validaciones(evento)){
            evento.preventDefault();
        }else{
            formulario.submit();
        }    

        function validaciones(evento){
          //Destructuring  
          let {first_name, last_name, email, password, confirm_password, provincia, avatar  } = formulario.elements;
          let errores = [];
          console.log(formulario.elements.confirm_password.value);
          //Validar Nombre
          if(first_name.value == ''){
              errores.push('El campo nombre no puede estar vacio... VIENE DE JS FRONT');
              first_name.classList.add('is-invalid');   
              //errores['first_name'] = 'El campo nombre no puede estar vacio...';
          }else{
              first_name.classList.add('is-valid');
              first_name.classList.remove('is-invalid');
          }

          //Validar Apellido
          if(last_name.value == ''){
            errores.push('El campo apellido no puede estar vacio... VIENE DE JS FRONT');
            last_name.classList.add('is-invalid');   
            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            last_name.classList.add('is-valid');
            last_name.classList.remove('is-invalid');
        }
        //Validar el email - Expresiones Regulares https://www.w3schools.com/jsref/jsref_obj_regexp.asp       https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        let reEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   
        if(!reEmail.test(email.value)){
            errores.push('El email es inválido... VIENE DE JS FRONT');
            email.classList.add('is-invalid');   
            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
        }
        //Aquí valido el password haciendo uso de Expresiones Regulares
        //Esta expresión regular valida como Mínimo seis caracteres, al menos una letra y un número:
        let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if(!rePassword.test(password.value)){
            errores.push('La contraseña como mínimo debe tener seis caracteres, al menos una letra y un número VIENE DE JS FRONT');
            password.classList.add('is-invalid');   
            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        }
        //Aquí valido a que la confirmación del password no llegue vacia
        if(confirm_password.value == ""){
            errores.push('La confirmación de la contraseña no puede estar vacia VIENE DE JS FRONT');
            confirm_password.classList.add('is-invalid');   

        }else{
            //Ahora valido si las dos contraseñas son iguales
            if(password.value != confirm_password.value && confirm_password != ""){
                errores.push('Las contraseñas deben ser iguales');
                confirm_password.classList.add('is-invalid');   
                //errores['last_name'] = 'El campo nombre no puede estar vacio...';
            }else{
                confirm_password.classList.add('is-valid');
                confirm_password.classList.remove('is-invalid');
            }
        }
        //Aquí valido la provincia la cual no puede estar vacia
        console.log(provincia.value);
        if(provincia.value == ""){
            errores.push('Debe seleccionar una provincia VIENE DE JS FRONT');
            provincia.classList.add('is-invalid');   
            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            provincia.classList.add('is-valid');
            provincia.classList.remove('is-invalid');
        }

        //Aquí valido que el usuario coloque su avatar (Yo en mi caso lo considero como un dato obligatorio, ustedes si quieren lo validan como deseen)
        if(avatar.value == ''){
            errores.push('Debe seleccionar su avatar en formato JPG - PNG ó JPEG VIENE DE JS FRONT');
            avatar.classList.add('is-invalid');   
            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            avatar.classList.add('is-valid');
            avatar.classList.remove('is-invalid');
        }

          //Aquí enviamos los errores al usuario
          let ulErrores = document.getElementById('errores');
          ulErrores.classList.add('alert-danger')
          if(errores.length > 0){
              evento.preventDefault();
              ulErrores.innerHTML = "";
              for (let i = 0 ; i < errores.length; i++){
                ulErrores.innerHTML += `<li> ${errores[i]} </li> `
              }
              errores = [];
          }else{
              return true;
          } 
        }
        
    })

    //Aquí voy a disponer lo referido al uso de las APIS.
    let selectProvincia = document.getElementById('provincia');
    
    //Debemos crear una función que cargue las provincias
    cargarProvincias();

    function cargarProvincias(){
        fetch('https://apis.datos.gob.ar/georef/api/provincias') 
        .then(function(respuesta){
            return respuesta.json();
        })
        .then(function(datosProvincias){
            //console.log(datosProvincias.provincias);
            //selectProvincia.innerHTML = `<option value= "" disabled selected > Seleccione una provincia </option> `
            for (const datoProvincia of datosProvincias.provincias) {
                let opcionProvincia = document.createElement('option');
                opcionProvincia.setAttribute('value',datoProvincia.id);
                opcionProvincia.innerHTML = datoProvincia.nombre;
                selectProvincia.appendChild(opcionProvincia);
            }

        })
    }



})