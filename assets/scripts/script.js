(function() {

    let item_global = '';

    // Variables
    var srcAlert = document.getElementById("modTarea");
    srcChose = document.getElementById("modDelete");
    btnClose = document.getElementById("alertClose");
    btnCloseChos = document.getElementById("deleteClose");
    txtTexto = document.getElementById("txtTexto");
    txtNumber = document.getElementById("txtNumber");
    lstLista = document.getElementById("lstLista");
    btnHi = document.getElementById("btnHi");
    btnde = document.getElementById("btnde");
    btnModal = document.getElementById("agregar");
    btnDelete = document.getElementById("delete");
    // btnChoose = document.getElementById("escoger");

    // Eventos
    btnModal.addEventListener("click", mostrar)
    btnClose.addEventListener("click", ocultar)
    btnCloseChos.addEventListener("click", ocultarEscoger)
    btnHi.addEventListener("click", agregar)
    btnde.addEventListener("click", eliminarEscoge)
    btnDelete.addEventListener("click", limLista)
    // btnChoose.addEventListener("click", mostrarEscoger)

    takeLocalStorage();

    // Función para mostrar modal
    function mostrar() {
        srcAlert.classList.remove("oculto");
    }

    // Funcion mostrar modale (tachar tarea hecha)
    function mostrarEscoger() {
        srcChose.classList.remove("oculto");
    }

    // Función para ocultar modal
    function ocultar() {
        srcAlert.setAttribute("class", "alert oculto");
    }

    // Función para ocultar modal (tarea hecha)
    function ocultarEscoger() {
        srcChose.setAttribute("class", "delete oculto");
    }

    // Funcion para mostrar en una ventana la tarea agregada
    function ejecutaAlerta(item) {  
        console.log(item) 
        var w = window.open('','','width=300,height=100');
        w.document.write(`Se añadió la tarea ${ item } a la lista!`);
        setTimeout(function() { w.close(); }, 2000);
    }

    // Función para tomar lo de local Storage
    function takeLocalStorage() {
        const local = localStorage.getItem("homeworks");
        if ( local !== null ) {
            let local_parse = JSON.parse(local);
            for ( let aux of local_parse ) {
                var elemento = document.createElement("li");
                elementoText = document.createElement("span");
                elementoText.setAttribute("class", "spanText");
                contenido = document.createTextNode(aux.homework);
                elementoText.appendChild(contenido);
                elemento.appendChild(elementoText);

                // contenido = document.createTextNode(aux.homework);
                // elemento.appendChild(contenido);
                if ( aux.mark == false ) {
                    elemento.removeAttribute("class");
                    // saveLocalStorage(item, false);
                } else {
                    elemento.setAttribute("class", "hecho");
                    // saveLocalStorage(item, true);
                }
                // item_global = aux.homework;
                elemento.addEventListener("click", marcar);
                
                elementoIcon = document.createElement("span");
                elementoIcon.setAttribute("class", "material-icons");
                elementoIcon.setAttribute("id", "spanDelete");
                contenidoIcon = document.createTextNode("close");
                elementoIcon.appendChild(contenidoIcon);
                elementoIcon.addEventListener("click", eliminarOne);
                // elementoIcon.addEventListener("click", alert('eliminar'))
                elemento.appendChild(elementoIcon);

                lstLista.appendChild(elemento);
            }
        }
    }

    //  Función para eliminar de Local Storage
    function deleteLocalStorage(item) {
        const local = localStorage.getItem("homeworks"); 

        if ( local !== null ) {
            array_homework =  JSON.parse(local);
            const new_homeworks = array_homework.filter((aux) => aux.homework !== item);
            localStorage.setItem("homeworks", JSON.stringify(new_homeworks));
        }
    }

    // Función para guardar en LocalStorage
    function saveLocalStorage(item, mark) {
        const local = localStorage.getItem("homeworks");
        let array_homework = [];
        let obj_homework = {
            homework: item,
            mark: mark
        }
        
        if ( !local || local == null ) {
            array_homework.push(obj_homework);
            localStorage.setItem("homeworks", JSON.stringify(array_homework));
        } else {
            array_homework =  JSON.parse(local);
            let exist = false;
            for ( let aux of array_homework ) {
                if ( aux.homework === obj_homework.homework ) {
                    aux.mark = obj_homework.mark;
                    exist = true;
                }
            }

            if ( exist == true ) {
                localStorage.setItem("homeworks", JSON.stringify(array_homework));
            } else {
                array_homework.push(obj_homework);
                localStorage.setItem("homeworks", JSON.stringify(array_homework));
            }
        }
    }

    // Función para agregar una tarea nueva
    function agregar() {
        var item = txtTexto.value.trim();

        if (item == "") {
            txtTexto.setAttribute("placeholder", "Tarea NO válida");
            txtTexto.value = "";
        } else {
            var elemento = document.createElement("li");
            elementoText = document.createElement("span");
            elementoText.setAttribute("class", "spanText");
            contenido = document.createTextNode(item);
            elementoText.appendChild(contenido);
            elemento.appendChild(elementoText);
            elemento.addEventListener("click", marcar);
            
            elementoIcon = document.createElement("span");
            elementoIcon.setAttribute("class", "material-icons");
            elementoIcon.setAttribute("id", "spanDelete");
            contenidoIcon = document.createTextNode("close");
            elementoIcon.appendChild(contenidoIcon);
            elementoIcon.addEventListener("click", eliminarOne);
            // elementoIcon.addEventListener("click", alert('eliminar'))
            elemento.appendChild(elementoIcon);
            ejecutaAlerta(item);
            saveLocalStorage(item, false);
            
            lstLista.appendChild(elemento);
            txtTexto.setAttribute("placeholder", "Agregar una tarea a la lista");
            txtTexto.value = "";
        }
    }

    // Funcion para eliminar uno
    function eliminarOne() {
        deleteLocalStorage(this.parentNode.querySelector(".spanText").innerHTML);
        this.parentNode.remove();
    }

    // Función para tachar tarea en caso de seleccionarla
    function marcar() {
        const local = JSON.parse(localStorage.getItem("homeworks")); 
        const text = this.querySelector(".spanText").innerHTML;
        console.log(text); 
        let exist = local.filter((aux) => {
            console.log(aux.homework)
            return aux.homework === text
        });
        console.log(exist)

        if ( exist.length > 0 ) {
            if (this.getAttribute("class") == "hecho") {
                this.removeAttribute("class");
                saveLocalStorage(text, false);
            } else {
                this.setAttribute("class", "hecho");
                saveLocalStorage(text, true);
            }
        }
        // valor.parentNode.parentNode.removeChild(valor.parentNode);
        // this.classList.add("oculto");
    }

    // Función para eliminar toda la lista (limpiar lista)
    function limLista() {
        if (lstLista.children.length >= 1) {
            while (lstLista.hasChildNodes()) {
                lstLista.removeChild(lstLista.firstChild);
                alert("Se elimino toda la lista");
            }
        } else {
            alert("Lista vacia!");
        }
    }

    // Función para eliminar (tarea hecha)
    function eliminarEscoge() {
        var item = txtNumber.value.trim();

        // alert(lstLista.children[item]);
        if (item == "" || item < 0 || item == undefined || item >= lstLista.children.length) {
            txtNumber.setAttribute("placeholder", "Nodo no encontrado");
            txtNumber.value = "";
        } else {
            if (lstLista.children.length >= 1) {
                lstLista.removeChild(lstLista.children[item]);
                ocultarEscoger();
                alert("Se elimino el elemento");

            } else {
                alert("Lista vacia! o no se encontro");
            }
            txtTexto.setAttribute("placeholder", "Agregar elemento a eliminar");
            txtTexto.value = "";
        }
    }

}());

