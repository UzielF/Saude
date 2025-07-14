const CAIXA =
    {
        Iniciar: () => {
            DOM.ObterPelaClasse("span-hoje")!.textContent = new Date().toLocaleDateString();
            
            MODAL.Inicializar();
            DOM.ObterPelaClasse("button-modal-adicionar-salvar")!.addEventListener("click", LISTA.Adicionar);
        }
    }

CAIXA.Iniciar();