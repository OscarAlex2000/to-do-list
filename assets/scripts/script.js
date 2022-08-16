
(function() {

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
    btnChoose = document.getElementById("escoger");

    // Eventos
    btnModal.addEventListener("click", mostrar)
    btnClose.addEventListener("click", ocultar)
    btnCloseChos.addEventListener("click", ocultarEscoger)
    btnHi.addEventListener("click", agregar)
    btnde.addEventListener("click", eliminarEscoge)
    btnDelete.addEventListener("click", limLista)
    btnChoose.addEventListener("click", mostrarEscoger)

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

    function ejecutaAlerta(item) {   
        var w = window.open('','','width=300,height=100');
        w.document.write(`Se añadió la tarea '${item}' a la lista!`);
        setTimeout(function() { w.close(); }, 2000);
    }

    // Función para agregar una tarea nueva
    function agregar() {
        var item = txtTexto.value.trim();

        if (item == "") {
            txtTexto.setAttribute("placeholder", "Tarea NO válida");
            txtTexto.value = "";
        } else {
            var elemento = document.createElement("li");

            contenido = document.createTextNode(item);
            elemento.appendChild(contenido);
            elemento.addEventListener("click", marcar);
            
            elementoIcon = document.createElement("span");
            elementoIcon.setAttribute("class", "material-icons");
            contenidoIcon = document.createTextNode("close");
            elementoIcon.appendChild(contenidoIcon);
            elementoIcon.addEventListener("click", eliminarOne);
            // elementoIcon.addEventListener("click", alert('eliminar'))
            elemento.appendChild(elementoIcon);
            ejecutaAlerta(item);
            
            lstLista.appendChild(elemento);
            txtTexto.setAttribute("placeholder", "Agregar una tarea a la lista");
            txtTexto.value = "";
        }
    }

    function eliminarOne() {
        // console.log(this.parentNode.remove());
        this.parentNode.remove();
    }

    // Función para tachar tarea en caso de seleccionarla
    function marcar() {
        if (this.getAttribute("class") == "hecho") {
            this.removeAttribute("class");
        } else {
            this.setAttribute("class", "hecho");
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
