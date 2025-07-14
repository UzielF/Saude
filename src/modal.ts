const MODAL =
    {
        Inicializar: () =>
        {
            // abrir
            DOM.ObterPelaClasse("button-adicionar")!.addEventListener("click", MODAL.Mostrar);
            // fechar
            document.addEventListener("click", e =>
            {
                if ((<HTMLDivElement>e.target).classList.contains("div-modal-adicionar")) MODAL.Esconder();
            });
            DOM.ObterPelaClasse("button-modal-adicionar-fechar")!.addEventListener("click", MODAL.Esconder);
            // limpar
            DOM.ObterPelaClasse("button-modal-adicionar-limpar")!.addEventListener("click", MODAL.Limpar);

            // input sempre maiusculo
            DOM.ObterPelaClasse("input-modal-adicionar-paciente")!.addEventListener("input", e =>
            {
                (<HTMLInputElement>e.target).value = (<HTMLInputElement>e.target).value.toUpperCase();
            });
            DOM.ObterPelaClasse("input-modal-adicionar-pagamento-municipio")!.addEventListener("input", e =>
            {
                (<HTMLInputElement>e.target).value = (<HTMLInputElement>e.target).value.toUpperCase();
            });

            // entradas de valores formatar para dinheiro
            DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-hospital")!.addEventListener("blur", e =>
            {
                (<HTMLInputElement>e.target).value = MODAL.FormatarValor((<HTMLInputElement>e.target).value);
            });
            DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-medico")!.addEventListener("blur", e =>
            {
                (<HTMLInputElement>e.target).value = MODAL.FormatarValor((<HTMLInputElement>e.target).value);
            });

            // input somente numeros
            DOM.ObterPelaClasse("input-modal-adicionar-pagamento-nfse")!.addEventListener("input", e =>
            {
                let numero = (<HTMLInputElement>e.target).value.match(/\d/g);
                (<HTMLInputElement>e.target).value = numero !== null ? numero.join("") : "";
            });
            DOM.ObterPelaClasse("input-modal-adicionar-pagamento-codigoCIMAU")!.addEventListener("input", e =>
            {
                let numero = (<HTMLInputElement>e.target).value.match(/\d/g);
                (<HTMLInputElement>e.target).value = numero !== null ? numero.join("") : "";
            });

            MODAL.CriarSelectMedico();
            MODAL.CriarSelectConvenio();
        },
        Mostrar: () =>
        {
            DOM.ObterPelaClasse("div-modal-adicionar")!.style.display = "flex";
        },
        Esconder: () =>
        {
            DOM.ObterPelaClasse("div-modal-adicionar")!.style.display = "none";
        },
        Limpar: () =>
        {
            (<HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-paciente")).value = "";
            (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-medico")).value = Object.keys(MEDICOS)[0]!;
            MODAL.AlterarSelectProcedimentos();
            (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-convenio")).value = CONVENIOS[0]!;
            MODAL.MudarConvenio();
            (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-pagamento-formaDePagamento-hospital")).value = "dinheiro";
            (<HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-hospital")).value = "";
            (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-pagamento-formaDePagamento-medico")).value = "dinheiro";
            (<HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-medico")).value = "";
            (<HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-nfse")).value = "";
            (<HTMLSelectElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-municipio")).value = "";
            (<HTMLSelectElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-codigoCIMAU")).value = "";
        },
        
        
        CriarSelectMedico: () =>
        {
            let select = <HTMLSelectElement>DOM.CriarElemento("select", "select-modal-adicionar-medico");
        
            for (let medico in MEDICOS)
            {
                let option = <HTMLOptionElement>DOM.CriarElemento("option");
                option.value = medico;
                option.textContent = MEDICOS[medico]!.Nome;
        
                select.appendChild(option);
            }
        
            select.addEventListener("change", MODAL.AlterarSelectProcedimentos);
        
            DOM.ObterPelaClasse("div-modal-adicionar-entrada-medico")!.appendChild(select);
            MODAL.AlterarSelectProcedimentos();
        },
        
        AlterarSelectProcedimentos: () =>
        {
            let medico = (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-medico")).value;
        
            DOM.ObterPelaClasse("select-modal-adicionar-procedimento")!.remove();
        
            let select = <HTMLSelectElement>DOM.CriarElemento("select", "select-modal-adicionar-procedimento");
        
            for (let procedimento in MEDICOS[medico]!.Procedimentos)
            {
                let option = <HTMLOptionElement>DOM.CriarElemento("option");
                option.value = procedimento;
                option.textContent = MEDICOS[medico]!.Procedimentos[procedimento]!;
        
                select.appendChild(option);
            }
        
            DOM.ObterPelaClasse("div-modal-adicionar-entrada-procedimento")!.appendChild(select);
        },
        
        CriarSelectConvenio: () =>
        {
            let select = <HTMLSelectElement>DOM.CriarElemento("select", "select-modal-adicionar-convenio");
        
            for (let convenio of CONVENIOS)
            {
                let option = <HTMLOptionElement>DOM.CriarElemento("option");
                option.value = convenio;
                option.textContent = convenio;
        
                select.appendChild(option);
            }
        
            select.addEventListener("change", MODAL.MudarConvenio);
        
            DOM.ObterPelaClasse("div-modal-adicionar-entrada-convenio")!.appendChild(select);
            MODAL.MudarConvenio();
        },
        
        
        MudarConvenio: () =>
        {
            let convenio = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-convenio");
            Array.from(document.getElementsByClassName("div-modal-adicionar-pagamento")).forEach(e =>
            {
                (<HTMLDivElement>e).style.display = "none";
            });
        
        
            if (convenio.value === CONVENIOS[0] || convenio.value === CONVENIOS[1]) MODAL.MudarParaConvenioParticularOuTarifa();
            else if (convenio.value === CONVENIOS[2]) MODAL.MudarParaConvenioCIMAU();
            else MODAL.MudarPraConvenioIsento();
        },
        
        MudarParaConvenioParticularOuTarifa: () =>
        {
            DOM.ObterPelaClasse("div-modal-adicionar-pagamento-particularOuTarifa")!.style.display = "flex";
        },
        
        MudarParaConvenioCIMAU: () =>
        {
            DOM.ObterPelaClasse("div-modal-adicionar-pagamento-cimau")!.style.display = "flex";
        },
        
        MudarPraConvenioIsento: () =>
        {
            DOM.ObterPelaClasse("div-modal-adicionar-pagamento-isento")!.style.display = "flex";
        },

        
        FormatarValor: (entrada: string): string =>
        {
            if ((/[^\d,.]/).test(entrada)) return entrada;
        
            let valores = entrada.match(/\d*[,.]?\d*/)![0].replace(".", ",").split(",");
        
            return `${valores[0]?.padStart(1, "0")},${valores[1] !== undefined ? valores[1].padEnd(2, "0") : "00"}`;
        },
        
        
        ObterPaciente: (): string =>
        {
            let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-paciente");
            return input.value;
        },
        
        ObterMedico: (): string =>
        {
            let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-medico");
            return select.value;
        },
        
        ObterProcedimento: (): string =>
        {
            let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-procedimento");
            return select.value;
        },
        
        ObterConvenio: (): string =>
        {
            let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-convenio");
            return select.value;
        },
        
        ObterFormaDePagamentoHospital: (): string =>
        {
            let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-pagamento-formaDePagamento-hospital");
            let option = <HTMLOptionElement>select.children[select.selectedIndex];
            return option.textContent!;
        },
        ObterValorHospital: (): string =>
        {
            let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-hospital");
            return input.value;
        },
        
        ObterFormaDePagamentoMedico: (): string =>
        {
            let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-pagamento-formaDePagamento-medico");
            let option = <HTMLOptionElement>select.children[select.selectedIndex];
            return option.textContent!;
        },
        ObterValorMedico: (): string =>
        {
            let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-medico");
            return input.value;
        },
        
        ObterNFSe: (): string =>
        {
            let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-nfse");
            return input.value;
        },
        
        ObterMunicipio: (): string =>
        {
            let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-municipio");
            return input.value;
        },
        
        ObterCodigoCIMAU: (): string =>
        {
            let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-codigoCIMAU");
            return input.value;
        }
    } as const;

