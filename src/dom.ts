export function ObterPelaClasse(classe: string): HTMLElement | undefined
{
    let elementos = document.getElementsByClassName(classe);
    if (elementos.length !== 1) return undefined;
    return <HTMLElement>elementos[0];
}

export function CriarElemento(tipo: string, classes: Array<string> | string | undefined = undefined, id: string | undefined = undefined)
{
    let elemento = document.createElement(tipo);

    if (classes instanceof Array) elemento.classList.add(...classes);
    else if (typeof classes === "string") elemento.classList.add(classes);

    if (typeof id === "string") elemento.id = id;

    return elemento;
}