import { DOM } from "./dom.js";

const CAIXA =
{
    Iniciar: () =>
    {
        DOM.ObterPelaClasse("span-hoje")!.textContent = new Date().toLocaleDateString();
    }
} as const;

CAIXA.Iniciar();