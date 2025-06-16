"use strict";
var TipoDeEntrada;
(function (TipoDeEntrada) {
    TipoDeEntrada[TipoDeEntrada["Profissional"] = 0] = "Profissional";
    TipoDeEntrada[TipoDeEntrada["GrupoDeProcedimentos"] = 1] = "GrupoDeProcedimentos";
})(TipoDeEntrada || (TipoDeEntrada = {}));
const ENTRADAS = [];
chrome.storage.local.get("tabela-valores").then(CarregarTabelaDeValores);
function CarregarTabelaDeValores(tabelaValores) {
}
function AdicionarLinha() {
    let trLinha = CriarElemento("tr", "tr-item");
    let obj = {
        Id: ENTRADAS.length + 1,
        Tipo: TipoDeEntrada.Profissional,
        Nome: "Nome",
        Valor: "0"
    };
    ENTRADAS.push(obj);
    let tdAcoes = CriarElemento("td", "td-item-acoes");
    let divAcoes = CriarElemento("div", "div-item-acoes");
    let botaoExcluir = CriarElemento("button", "button-excluir-linha");
    botaoExcluir.innerHTML = "&nbsp;";
    let botaoSubir = CriarElemento("button", "button-subir-linha");
    botaoSubir.innerHTML = "&nbsp;";
    let botaoDescer = CriarElemento("button", "button-descer-linha");
    botaoDescer.innerHTML = "&nbsp;";
    let botaoEditar = CriarElemento("button", "button-editar-linha");
    botaoEditar.innerHTML = "&nbsp;";
    divAcoes.replaceChildren(botaoExcluir, botaoSubir, botaoDescer, botaoEditar);
    tdAcoes.appendChild(divAcoes);
    let tdId = CriarElemento("td", "td-item-id");
    tdId.textContent = obj.Id.toString();
    let tdTipo = CriarElemento("td", "td-item-tipo");
    tdTipo.textContent = "Profissional";
    let tdNome = CriarElemento("td", "td-item-nome");
    tdNome.textContent = obj.Nome;
    let tdValor = CriarElemento("td", "td-item-valor");
    tdValor.textContent = obj.Valor;
    trLinha.replaceChildren(tdAcoes, tdId, tdTipo, tdNome, tdValor);
    ObterPelaClasse("tbody-itens").appendChild(trLinha);
}
ObterPelaClasse("button-adicionar-linha").addEventListener("click", () => AdicionarLinha());
