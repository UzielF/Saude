const DOM = {
    ObterPelaClasse: function (classe) {
        let lista = document.getElementsByClassName(classe);
        if (lista.length !== 1)
            return null;
        return lista[0];
    },
    CriarElemento: function (tipo, classe = null, id = null) {
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
    },
    ObterPeloId: function (id) {
        let elemento = document.getElementById(id);
        return elemento;
    }
};
export {};
