import * as DOM from "./dom.js";
import * as MODAL from "./modal.js"
import { MEDICOS } from "./medicos.js";

export function Adicionar()
{
    let paciente = MODAL.ObterPaciente();
    let medico = MODAL.ObterMedico();
    let procedimento = MODAL.ObterProcedimento();
    let convenio = MODAL.ObterConvenio();

    let item = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item");
    item.appendChild(ObterCabecalho(paciente, medico, procedimento));
    item.appendChild(ObterPagamento(convenio));

    DOM.ObterPelaClasse("div-tabela")!.appendChild(item);

    MODAL.Esconder();
    MODAL.Limpar();
}


function ObterCabecalho(paciente: string, medico: string, procedimento: string): HTMLDivElement
{
    let div = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-cabecalho");

    let divPaciente = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-cabecalho-paciente");
    let spanPaciente = <HTMLSpanElement>DOM.CriarElemento("span");
    spanPaciente.textContent = paciente;
    divPaciente.appendChild(spanPaciente);

    let divMedico = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-cabecalho-medico");
    let spanMedico = <HTMLSpanElement>DOM.CriarElemento("span");
    spanMedico.textContent = MEDICOS[medico]!.Apelido;
    divMedico.appendChild(spanMedico);
    
    let divProcedimento = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-cabecalho-procedimento");
    let spanProcedimento = <HTMLSpanElement>DOM.CriarElemento("span");
    spanProcedimento.textContent = MEDICOS[medico]!.Procedimentos[procedimento]!;
    divProcedimento.appendChild(spanProcedimento);

    div.appendChild(divPaciente);
    div.appendChild(divMedico);
    div.appendChild(divProcedimento);
    return div;
}


function ObterPagamento(convenio: string): HTMLDivElement
{
    let formaHospital = MODAL.ObterFormaDePagamentoHospital();
    let valorHospital = MODAL.ObterValorHospital();
    let formaMedico = MODAL.ObterFormaDePagamentoMedico();
    let valorMedico = MODAL.ObterValorMedico();
    let nfse = MODAL.ObterNFSe();

    let municipio = MODAL.ObterMunicipio();
    let cimau = MODAL.ObterCodigoCIMAU();


    let div = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-pagamento");

    let divConvenio = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-pagamento-convenio");
    let spanConvenio = <HTMLSpanElement>DOM.CriarElemento("span");
    spanConvenio.textContent = convenio;
    divConvenio.appendChild(spanConvenio);
    div.appendChild(divConvenio);

    if (convenio === "PARTICULAR" || convenio === "TARIFA")
    {
        let divHospital = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-pagamento-hospital");
        let spanHospital = <HTMLSpanElement>DOM.CriarElemento("span");
        spanHospital.textContent = "HOSPITAL";
        let spanFormaHospital = <HTMLSpanElement>DOM.CriarElemento("span");
        spanFormaHospital.textContent = `${formaHospital}: ${valorHospital}`;
        divHospital.replaceChildren(spanHospital, spanFormaHospital);

        let divMedico = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-pagamento-medico");
        let spanMedico = <HTMLSpanElement>DOM.CriarElemento("span");
        spanMedico.textContent = "MÉDICO";
        let spanFormaMedico = <HTMLSpanElement>DOM.CriarElemento("span");
        spanFormaMedico.textContent = `${formaMedico}: ${valorMedico}`;
        divMedico.replaceChildren(spanMedico, spanFormaMedico);

        let divNFSe = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-pagamento-nfse");
        let spanNFSe = <HTMLSpanElement>DOM.CriarElemento("span");
        spanNFSe.textContent = `NFS-e: ${nfse}`;
        divNFSe.appendChild(spanNFSe);

        div.appendChild(divHospital);
        div.appendChild(divMedico);
        div.appendChild(divNFSe);
    }
    else if (convenio === "CIMAU")
    {
        let divMunicipio = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-pagamento-municipio");
        let spanMunicipio = <HTMLSpanElement>DOM.CriarElemento("span");
        spanMunicipio.textContent = municipio;
        divMunicipio.appendChild(spanMunicipio);
        
        let divCIMAU = <HTMLDivElement>DOM.CriarElemento("div", "div-lista-item-pagamento-municipio");
        let spanCIMAU = <HTMLSpanElement>DOM.CriarElemento("span");
        spanCIMAU.textContent = cimau;
        divCIMAU.appendChild(spanCIMAU);

        div.appendChild(divMunicipio);
        div.appendChild(divCIMAU);
    }

    return div;
}