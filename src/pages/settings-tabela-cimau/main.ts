enum TipoDeEntrada
{
    Profissional,
    GrupoDeProcedimentos
}

interface Item
{
    Tipo: TipoDeEntrada;
    Nome: string;
    Codigo: string;
    Clinica: string;
}

import { DOMH } from "../common/DOMH.js";

const ItensSaoIguais = (a: Item, b: Item): boolean =>
{
    return a.Tipo === b.Tipo && a.Nome === b.Nome && a.Codigo === b.Codigo && a.Clinica === b.Clinica;
};

interface ConfTabelaValores
{
    Itens: Item[];
    CarregarSalvos(): void;
    SalvarItens(): void;
    CriarLinha(item: Item): HTMLTableRowElement;
    Adicionar(): void;
    SubirItem(e: MouseEvent): void;
    DescerItem(e: MouseEvent): void;
    ObterIndiceDoItem(item: Item): number;
    Visualizar(): void;
}

const CONF_TABELA_VALORES: ConfTabelaValores =
{
    Itens: [],
    CarregarSalvos(): void
    {
        chrome.storage.local.get("TABELA_VALORES").then(r =>
        {
            if (!r.hasOwnProperty("TABELA_VALORES")) return;

            CONF_TABELA_VALORES.Itens = r["TABELA_VALORES"];
            CONF_TABELA_VALORES.Visualizar();
        });
    },
    SalvarItens(): void
    {
        chrome.storage.local.set({ "TABELA_VALORES": CONF_TABELA_VALORES.Itens });
    },
    CriarLinha(item: Item): HTMLTableRowElement
    {
        let linha = <HTMLTableRowElement>DOMH.CriarElemento("tr", "tr-item");

        let celAcoes = <HTMLTableCellElement>DOMH.CriarElemento("td", "td-item-acoes");
        let celDivAcoes = <HTMLDivElement>DOMH.CriarElemento("div", "div-item-acoes");
        let botaoApagar = <HTMLButtonElement>DOMH.CriarElemento("button", "button-item-apagar");
        botaoApagar.addEventListener("click", e => 
        {
            let linha = (<HTMLButtonElement>e.target).parentElement!.parentElement!.parentElement!;
            let indice = Array.prototype.indexOf.call(linha.parentElement!.children, linha);

            CONF_TABELA_VALORES.Itens.splice(indice, 1);
            CONF_TABELA_VALORES.SalvarItens();
            CONF_TABELA_VALORES.Visualizar();
        });
        let botaoSubir = <HTMLButtonElement>DOMH.CriarElemento("button", "button-item-subir");
        botaoSubir.addEventListener("click", CONF_TABELA_VALORES.SubirItem);
        let botaoDescer = <HTMLButtonElement>DOMH.CriarElemento("button", "button-item-descer");
        botaoDescer.addEventListener("click", CONF_TABELA_VALORES.DescerItem);
        celDivAcoes.replaceChildren(botaoApagar, botaoSubir, botaoDescer);
        celAcoes.replaceChildren(celDivAcoes);

        let celTipo = <HTMLTableCellElement>DOMH.CriarElemento("td", "td-item-tipo");
        celTipo.textContent = item.Tipo === TipoDeEntrada.Profissional ? "Profissional" : "Grupo de Procedimentos";
        let celNome = <HTMLTableCellElement>DOMH.CriarElemento("td", "td-item-nome");
        celNome.textContent = item.Nome;
        let celCodigo = <HTMLTableCellElement>DOMH.CriarElemento("td", "td-item-codigo");
        celCodigo.textContent = item.Codigo;
        let celClinica = <HTMLTableCellElement>DOMH.CriarElemento("td", "td-item-clinica");
        celClinica.textContent = item.Clinica;

        linha.replaceChildren(celAcoes, celTipo, celNome, celCodigo, celClinica);
        return linha;
    },
    Adicionar(): void
    {
        let selectTipo = <HTMLSelectElement>DOMH.ObterPelaClasse("select-adicionar-tipoDeItem");
        let inputNome = <HTMLInputElement>DOMH.ObterPelaClasse("input-adicionar-nome");
        let inputCodigo = <HTMLInputElement>DOMH.ObterPelaClasse("input-adicionar-codigo");
        let inputClinica = <HTMLInputElement>DOMH.ObterPelaClasse("input-adicionar-clinica");

        let obj: Item =
        {
            Tipo: selectTipo.value === "profissional" ? TipoDeEntrada.Profissional : TipoDeEntrada.GrupoDeProcedimentos,
            Nome: inputNome.value.trim(),
            Codigo: inputCodigo.value.trim(),
            Clinica: inputClinica.value.trim()
        };

        CONF_TABELA_VALORES.Itens.push(obj);

        selectTipo.value = "profissional";
        inputNome.value = "";
        inputCodigo.value = "";
        inputClinica.value = "";

        CONF_TABELA_VALORES.Visualizar();
    },
    SubirItem(e: MouseEvent): void
    {
        let linha = (<HTMLButtonElement>e.target).parentElement!.parentElement!.parentElement!;
        let indice = Array.prototype.indexOf.call(linha.parentElement!.children, linha);

        let item = CONF_TABELA_VALORES.Itens.splice(indice, 1);
        CONF_TABELA_VALORES.Itens.splice(indice-1, 0, item[0]!);
        CONF_TABELA_VALORES.SalvarItens();
        CONF_TABELA_VALORES.Visualizar();
    },
    DescerItem(e: MouseEvent): void
    {
        let linha = (<HTMLButtonElement>e.target).parentElement!.parentElement!.parentElement!;
        let indice = Array.prototype.indexOf.call(linha.parentElement!.children, linha);

        let item = CONF_TABELA_VALORES.Itens.splice(indice, 1);
        CONF_TABELA_VALORES.Itens.splice(indice+1, 0, item[0]!);
        CONF_TABELA_VALORES.SalvarItens();
        CONF_TABELA_VALORES.Visualizar();
    },
    ObterIndiceDoItem(item: Item): number
    {
        if (CONF_TABELA_VALORES.Itens.length === 0) return -1;

        let indice = -1;

        for (let i = 0; i < CONF_TABELA_VALORES.Itens.length; i++)
        {
            let outro = CONF_TABELA_VALORES.Itens[i]!;

            if (ItensSaoIguais(outro, item)) indice = i;
        }

        return indice;
    },
    Visualizar(): void
    {
        let linhas: HTMLTableRowElement[] = [];

        for (let item of CONF_TABELA_VALORES.Itens) linhas.push(CONF_TABELA_VALORES.CriarLinha(item));

        DOMH.ObterPelaClasse("tbody-itens")?.replaceChildren(...linhas);
    }
};
CONF_TABELA_VALORES.CarregarSalvos();
DOMH.ObterPelaClasse("button-adicionar")!.addEventListener("click", CONF_TABELA_VALORES.Adicionar);