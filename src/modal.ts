import * as DOM from "./dom.js";
import { MEDICOS } from "./medicos.js";
import { CONVENIOS } from "./convenios.js";

export function Inicializar()
{
    // abrir
    DOM.ObterPelaClasse("button-adicionar")!.addEventListener("click", Mostrar);
    // fechar
    document.addEventListener("click", e =>
    {
        if ((<HTMLDivElement>e.target).classList.contains("div-modal-adicionar")) Esconder();
    });
    DOM.ObterPelaClasse("button-modal-adicionar-fechar")!.addEventListener("click", Esconder);
    // limpar
    DOM.ObterPelaClasse("button-modal-adicionar-limpar")!.addEventListener("click", Limpar);

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
        (<HTMLInputElement>e.target).value = FormatarValor((<HTMLInputElement>e.target).value);
    });
    DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-medico")!.addEventListener("blur", e =>
    {
        (<HTMLInputElement>e.target).value = FormatarValor((<HTMLInputElement>e.target).value);
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

    CriarSelectMedico();
    CriarSelectConvenio();
}


function Mostrar()
{
    DOM.ObterPelaClasse("div-modal-adicionar")!.style.display = "flex";
}
export function Esconder()
{
    DOM.ObterPelaClasse("div-modal-adicionar")!.style.display = "none";
}
export function Limpar()
{
    (<HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-paciente")).value = "";
    (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-medico")).value = Object.keys(MEDICOS)[0]!;
    AlterarSelectProcedimentos();
    (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-convenio")).value = CONVENIOS[0]!;
    MudarConvenio();
    (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-pagamento-formaDePagamento-hospital")).value = "dinheiro";
    (<HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-hospital")).value = "";
    (<HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-pagamento-formaDePagamento-medico")).value = "dinheiro";
    (<HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-medico")).value = "";
    (<HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-nfse")).value = "";
    (<HTMLSelectElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-municipio")).value = "";
    (<HTMLSelectElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-codigoCIMAU")).value = "";
}


function CriarSelectMedico()
{
    let select = <HTMLSelectElement>DOM.CriarElemento("select", "select-modal-adicionar-medico");

    for (let medico in MEDICOS)
    {
        let option = <HTMLOptionElement>DOM.CriarElemento("option");
        option.value = medico;
        option.textContent = MEDICOS[medico]!.Nome;

        select.appendChild(option);
    }

    select.addEventListener("change", AlterarSelectProcedimentos);

    DOM.ObterPelaClasse("div-modal-adicionar-entrada-medico")!.appendChild(select);
    AlterarSelectProcedimentos();
}

function AlterarSelectProcedimentos()
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
}

function CriarSelectConvenio()
{
    let select = <HTMLSelectElement>DOM.CriarElemento("select", "select-modal-adicionar-convenio");

    for (let convenio of CONVENIOS)
    {
        let option = <HTMLOptionElement>DOM.CriarElemento("option");
        option.value = convenio;
        option.textContent = convenio;

        select.appendChild(option);
    }

    select.addEventListener("change", MudarConvenio);

    DOM.ObterPelaClasse("div-modal-adicionar-entrada-convenio")!.appendChild(select);
    MudarConvenio();
}


function MudarConvenio()
{
    let convenio = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-convenio");
    Array.from(document.getElementsByClassName("div-modal-adicionar-pagamento")).forEach(e =>
    {
        (<HTMLDivElement>e).style.display = "none";
    });


    if (convenio.value === CONVENIOS[0] || convenio.value === CONVENIOS[1]) MudarParaConvenioParticularOuTarifa();
    else if (convenio.value === CONVENIOS[2]) MudarParaConvenioCIMAU();
    else MudarPraConvenioIsento();
}

function MudarParaConvenioParticularOuTarifa()
{
    DOM.ObterPelaClasse("div-modal-adicionar-pagamento-particularOuTarifa")!.style.display = "flex";
}

function MudarParaConvenioCIMAU()
{
    DOM.ObterPelaClasse("div-modal-adicionar-pagamento-cimau")!.style.display = "flex";
}

function MudarPraConvenioIsento()
{
    DOM.ObterPelaClasse("div-modal-adicionar-pagamento-isento")!.style.display = "flex";
}


function FormatarValor(entrada: string): string
{
    if ((/[^\d,.]/).test(entrada)) return entrada;

    let valores = entrada.match(/\d*[,.]?\d*/)![0].replace(".", ",").split(",");

    return `${valores[0]?.padStart(1, "0")},${valores[1] !== undefined ? valores[1].padEnd(2, "0") : "00"}`;
}


export function ObterPaciente(): string
{
    let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-paciente");
    return input.value;
}

export function ObterMedico(): string
{
    let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-medico");
    return select.value;
}

export function ObterProcedimento(): string
{
    let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-procedimento");
    return select.value;
}

export function ObterConvenio(): string
{
    let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-convenio");
    return select.value;
}

export function ObterFormaDePagamentoHospital(): string
{
    let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-pagamento-formaDePagamento-hospital");
    let option = <HTMLOptionElement>select.children[select.selectedIndex];
    return option.textContent!;
}
export function ObterValorHospital(): string
{
    let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-hospital");
    return input.value;
}

export function ObterFormaDePagamentoMedico(): string
{
    let select = <HTMLSelectElement>DOM.ObterPelaClasse("select-modal-adicionar-pagamento-formaDePagamento-medico");
    let option = <HTMLOptionElement>select.children[select.selectedIndex];
    return option.textContent!;
}
export function ObterValorMedico(): string
{
    let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-valor-medico");
    return input.value;
}

export function ObterNFSe(): string
{
    let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-nfse");
    return input.value;
}

export function ObterMunicipio(): string
{
    let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-municipio");
    return input.value;
}

export function ObterCodigoCIMAU(): string
{
    let input = <HTMLInputElement>DOM.ObterPelaClasse("input-modal-adicionar-pagamento-codigoCIMAU");
    return input.value;
}