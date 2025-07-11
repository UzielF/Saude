import * as DOM from "./dom.js";
import * as MODAL from "./modal.js";

const CAIXA =
    {
        Iniciar: () => {
            DOM.ObterPelaClasse("span-hoje")!.textContent = new Date().toLocaleDateString();
            
            MODAL.Inicializar();
        }
    }

CAIXA.Iniciar();