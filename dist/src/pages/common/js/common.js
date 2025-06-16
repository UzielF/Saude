"use strict";
function ObterPelaClasse(classe) {
    let lista = document.getElementsByClassName(classe);
    if (lista.length !== 1)
        return null;
    return lista[0];
}
function CriarElemento(tipo, classe, id) {
    let elemento = document.createElement(tipo);
    if (typeof classe === "string") {
        elemento.classList.add(classe);
    }
    else if (classe instanceof Array) {
        classe.forEach(c => typeof c === "string" ? elemento.classList.add(c) : null);
    }
    if (typeof id === "string") {
        elemento.id = id;
    }
    return elemento;
}
