import { DOM } from "./dom.js";

interface IProcedimentos {
    "nome": string;
    [key: string]: string;
}

const PROCEDIMENTOS: { [key: string]: IProcedimentos } =
{
    "roberto":
    {
        "nome": "ROBERTO CARLOS STRÜCKER REATEGUI NAVARRO",
        "us-abdomen-total": "US ABDOMEN TOTAL",
        "us-aparelho-urinario": "US APARELHO URINÁRIO",
        "us-prostata-abdominal": "US PRÓSTATA VIA ABDOMINAL",
    },
    "hermes":
    {
        "nome": "HERMES FASOLIN MELLO",
        "us-abdomen-total": "US ABDOMEN TOTAL",
        "us-aparelho-urinario": "US APARELHO URINÁRIO",
        "us-prostata-abdominal": "US PRÓSTATA VIA ABDOMINAL",
        "us-prostata-transretal": "US PRÓSTATA VIA TRANSRETAL",
        "ecodoppler-tireoide": "ECODOPPLER TIREÓIDE"
    },
    "eduardo":
    {
        "nome": "EDUARDO MAIO ZABALETTA",
        "endoscopia": "ENDOSCOPIA",
        "colonoscopia": "COLONOSCOPIA"
    }
};

const CONVENIOS = ["PARTICULAR", "TARIFA", "CIMAU", "SISREG"] as const;

const CAIXA =
    {
        Iniciar: () => {
            DOM.ObterPelaClasse("span-hoje")!.textContent = new Date().toLocaleDateString();
            DOM.ObterPelaClasse("button-adicionar")!.addEventListener("click", CAIXA.MostrarEntradas);
            DOM.ObterPelaClasse("button-modal-adicionar-fechar")!.addEventListener("click", CAIXA.EsconderEntradas);
            DOM.ObterPelaClasse("button-modal-adicionar-limpar")!.addEventListener("click", CAIXA.LimparEntradas);

            document.addEventListener("click", e => {
                if ((<HTMLElement>e.target).classList.contains("div-modal-adicionar")) {
                    CAIXA.EsconderEntradas();
                }
            });

            DOM.ObterPelaClasse("input-modal-adicionar-paciente")!.addEventListener("input", e => {
                (<HTMLInputElement>e.target).value = (<HTMLInputElement>e.target).value.toUpperCase();
            });

            CAIXA.CriarSelectMedico();
            CAIXA.CriarSelectConvenio();
        },
        LimparEntradas: () => { },
        MostrarEntradas: () => {
            DOM.ObterPelaClasse("div-modal-adicionar")!.style.display = "flex";
        },
        EsconderEntradas: () => {
            DOM.ObterPelaClasse("div-modal-adicionar")!.style.display = "none";
        },
        CriarSelectMedico: () => {
            let selectMedico = <HTMLSelectElement>DOM.Criar("select", "select-modal-adicionar-medico");

            for (let medico in PROCEDIMENTOS) {
                let optionMedico = <HTMLOptionElement>DOM.Criar("option");
                optionMedico.value = medico;
                optionMedico.textContent = PROCEDIMENTOS[medico]!.nome;

                selectMedico.appendChild(optionMedico);
            }

            selectMedico.addEventListener("change", CAIXA.AlterarProcedimentos);

            DOM.ObterPelaClasse("div-modal-adicionar-entrada-medico")!.appendChild(selectMedico);
            CAIXA.AlterarProcedimentos();
        },
        AlterarProcedimentos: () => {
            let medico = (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-medico")).value;

            let procedimentos = PROCEDIMENTOS[medico]!;

            let selectProc = <HTMLSelectElement>DOM.Criar("select", "select-modal-adicionar-procedimento");

            for (let proc in procedimentos) {
                if (proc === "nome") continue;

                let optionProc = <HTMLOptionElement>DOM.Criar("option");
                optionProc.value = proc;
                optionProc.textContent = procedimentos[proc]!;

                selectProc.appendChild(optionProc);
            }

            DOM.ObterPelaClasse("select-modal-adicionar-procedimento")?.remove();
            DOM.ObterPelaClasse("div-modal-adicionar-entrada-procedimento")!.appendChild(selectProc);
        },
        CriarSelectConvenio: () => {
            let selectConvenio = <HTMLSelectElement>DOM.Criar("select", "select-modal-adicionar-convenio");
            for (let convenio of CONVENIOS) {
                let optionConvenio = <HTMLOptionElement>DOM.Criar("option");
                optionConvenio.value = convenio;
                optionConvenio.textContent = convenio;

                selectConvenio.appendChild(optionConvenio);
            }

            selectConvenio.addEventListener("change", CAIXA.MudarConvenio);

            DOM.ObterPelaClasse("div-modal-adicionar-entrada-convenio")!.appendChild(selectConvenio);
            CAIXA.MudarConvenio();
        },
        MudarConvenio: () => {
            let convenio = (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-convenio")).value;

            if (convenio === CONVENIOS[0] || convenio === CONVENIOS[1]) CAIXA.Convenios.ParticularOuTarifa();
            else if (convenio === CONVENIOS[2]) CAIXA.Convenios.CIMAU();
            else CAIXA.Convenios.SISREG();
        },
        Convenios:
        {
            ParticularOuTarifa: () => {
                let area = <HTMLDivElement>DOM.ObterPelaClasse("div-modal-adicionar-pagamento");

                let valores = <HTMLDivElement>DOM.Criar("div", "div-modal-adicionar-valores");

                let valorHospital = <HTMLDivElement>DOM.Criar("div", "div-modal-adicionar-valorHospital");
                valorHospital.replaceChildren("Hospital:");
                let valorMedico = <HTMLDivElement>DOM.Criar("div", "div-modal-adicionar-valorMedico");
                valorMedico.replaceChildren("Médico:");

                const CriarSelect = (classe: string): HTMLSelectElement => {
                    let select = <HTMLSelectElement>DOM.Criar("select", `select-modal-adicionar-formaDePagamento-${classe}`);

                    const FORMAS = ["DINHEIRO", "PIX", "CARTÃO"] as const;

                    for (let forma of FORMAS) {
                        let option = <HTMLOptionElement>DOM.Criar("option");
                        option.value = forma;
                        option.textContent = forma;

                        select.appendChild(option);
                    }

                    return select;
                }
                const CriarInput = (classe: string): HTMLInputElement =>
                {
                    let input = <HTMLInputElement>DOM.Criar("input", `input-modal-adicionar-${classe}`);
                    input.type = "text";
                    input.addEventListener("blur", () =>
                    {
                        input.value = CAIXA.FormatarValor(input.value);
                    });

                    return input;
                }

                valorHospital.appendChild(CriarSelect("valorHospital"));
                valorHospital.appendChild(CriarInput("valorHospital"));
                valorMedico.appendChild(CriarSelect("valorMedico"));
                valorMedico.appendChild(CriarInput("valorMedico"));

                valores.replaceChildren(valorHospital, valorMedico);
                area.replaceChildren(valores);
            },
            CIMAU: () => {
                let area = <HTMLDivElement>DOM.ObterPelaClasse("div-modal-adicionar-pagamento");

                area.replaceChildren("CIMAU");
            },
            SISREG: () => {
                DOM.ObterPelaClasse("div-modal-adicionar-pagamento")!.replaceChildren("NÃO SE APLICA");
            }
        },
        FormatarValor: (valor: string): string =>
        {
            return valor;
        }
    } as const;

CAIXA.Iniciar();