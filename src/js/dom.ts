export const DOM =
{
    ObterPelaClasse: (classe: string): HTMLElement | undefined =>
    {
        let elementos = document.getElementsByClassName(classe);
        if (elementos.length !== 1) return undefined;
        return <HTMLElement>elementos[0];
    }
} as const;