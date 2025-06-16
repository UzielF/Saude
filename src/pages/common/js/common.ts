function ObterPelaClasse(classe: string): Element | null
{
    let lista = document.getElementsByClassName(classe);

    if (lista.length !== 1) return null;
    return lista[0]!;
}

function CriarElemento(tipo: string, classe?: string | string[], id?: string): HTMLElement
{
    let elemento = document.createElement(tipo);

    if (typeof classe === "string")
    {
        elemento.classList.add(classe);
    }
    else if (classe instanceof Array)
    {
        classe.forEach(c => typeof c === "string" ? elemento.classList.add(c) : null);
    }

    if (typeof id === "string")
    {
        elemento.id = id;
    }
    
    return elemento;
}