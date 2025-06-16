enum TipoDeEntrada
{
    Profissional,
    GrupoDeProcedimentos
}

interface Item {
    Id: number,
    Tipo: TipoDeEntrada,
    Nome: string,
    Valor: string
}

const ENTRADAS: Item[] = [];

chrome.storage.local.get("tabela-valores").then(CarregarTabelaDeValores);

function CarregarTabelaDeValores(tabelaValores: {[key: string]: string}): void
{

}

function AdicionarLinha(): void
{
    let trLinha = <HTMLDivElement>CriarElemento("tr", "tr-item");

    let obj: Item =
    {
        Id: ENTRADAS.length + 1,
        Tipo: TipoDeEntrada.Profissional,
        Nome: "Nome",
        Valor: "0"
    };
    ENTRADAS.push(obj);

    let tdAcoes = <HTMLDivElement>CriarElemento("td", "td-item-acoes");
    let divAcoes = <HTMLDivElement>CriarElemento("div", "div-item-acoes");
    let botaoExcluir = <HTMLButtonElement>CriarElemento("button", "button-excluir-linha");
    botaoExcluir.innerHTML = "&nbsp;";
    let botaoSubir = <HTMLButtonElement>CriarElemento("button", "button-subir-linha");
    botaoSubir.innerHTML = "&nbsp;";
    let botaoDescer = <HTMLButtonElement>CriarElemento("button", "button-descer-linha");
    botaoDescer.innerHTML = "&nbsp;";
    let botaoEditar = <HTMLButtonElement>CriarElemento("button", "button-editar-linha");
    botaoEditar.innerHTML = "&nbsp;";
    divAcoes.replaceChildren(botaoExcluir, botaoSubir, botaoDescer, botaoEditar);
    tdAcoes.appendChild(divAcoes);

    let tdId = <HTMLTableCellElement>CriarElemento("td", "td-item-id");
    tdId.textContent = obj.Id.toString();
    let tdTipo = <HTMLTableCellElement>CriarElemento("td", "td-item-tipo");
    tdTipo.textContent = "Profissional";
    let tdNome = <HTMLTableCellElement>CriarElemento("td", "td-item-nome");
    tdNome.textContent = obj.Nome;
    let tdValor = <HTMLTableCellElement>CriarElemento("td", "td-item-valor");
    tdValor.textContent = obj.Valor;

    trLinha.replaceChildren(tdAcoes, tdId, tdTipo, tdNome, tdValor);

    ObterPelaClasse("tbody-itens")!.appendChild(trLinha);
}

ObterPelaClasse("button-adicionar-linha")!.addEventListener("click", () => AdicionarLinha());