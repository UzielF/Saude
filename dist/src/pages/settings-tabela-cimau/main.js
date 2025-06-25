var TipoDeEntrada;
(function (TipoDeEntrada) {
    TipoDeEntrada[TipoDeEntrada["Profissional"] = 0] = "Profissional";
    TipoDeEntrada[TipoDeEntrada["GrupoDeProcedimentos"] = 1] = "GrupoDeProcedimentos";
})(TipoDeEntrada || (TipoDeEntrada = {}));
import { DOMH } from "../common/DOMH.js";
const ItensSaoIguais = (a, b) => {
    return a.Tipo === b.Tipo && a.Nome === b.Nome && a.Codigo === b.Codigo && a.Clinica === b.Clinica;
};
const CONF_TABELA_VALORES = {
    Itens: [],
    CarregarSalvos() {
        chrome.storage.local.get("TABELA_VALORES").then(r => {
            if (!r.hasOwnProperty("TABELA_VALORES"))
                return;
            CONF_TABELA_VALORES.Itens = r["TABELA_VALORES"];
            CONF_TABELA_VALORES.Visualizar();
        });
    },
    SalvarItens() {
        chrome.storage.local.set({ "TABELA_VALORES": CONF_TABELA_VALORES.Itens });
    },
    CriarLinha(item) {
        let linha = DOMH.CriarElemento("tr", "tr-item");
        let celAcoes = DOMH.CriarElemento("td", "td-item-acoes");
        let celDivAcoes = DOMH.CriarElemento("div", "div-item-acoes");
        let botaoApagar = DOMH.CriarElemento("button", "button-item-apagar");
        botaoApagar.addEventListener("click", e => {
            let linha = e.target.parentElement.parentElement.parentElement;
            let indice = Array.prototype.indexOf.call(linha.parentElement.children, linha);
            CONF_TABELA_VALORES.Itens.splice(indice, 1);
            CONF_TABELA_VALORES.SalvarItens();
            CONF_TABELA_VALORES.Visualizar();
        });
        let botaoSubir = DOMH.CriarElemento("button", "button-item-subir");
        botaoSubir.addEventListener("click", CONF_TABELA_VALORES.SubirItem);
        let botaoDescer = DOMH.CriarElemento("button", "button-item-descer");
        botaoDescer.addEventListener("click", CONF_TABELA_VALORES.DescerItem);
        celDivAcoes.replaceChildren(botaoApagar, botaoSubir, botaoDescer);
        celAcoes.replaceChildren(celDivAcoes);
        let celTipo = DOMH.CriarElemento("td", "td-item-tipo");
        celTipo.textContent = item.Tipo === TipoDeEntrada.Profissional ? "Profissional" : "Grupo de Procedimentos";
        let celNome = DOMH.CriarElemento("td", "td-item-nome");
        celNome.textContent = item.Nome;
        let celCodigo = DOMH.CriarElemento("td", "td-item-codigo");
        celCodigo.textContent = item.Codigo;
        let celClinica = DOMH.CriarElemento("td", "td-item-clinica");
        celClinica.textContent = item.Clinica;
        linha.replaceChildren(celAcoes, celTipo, celNome, celCodigo, celClinica);
        return linha;
    },
    Adicionar() {
        let selectTipo = DOMH.ObterPelaClasse("select-adicionar-tipoDeItem");
        let inputNome = DOMH.ObterPelaClasse("input-adicionar-nome");
        let inputCodigo = DOMH.ObterPelaClasse("input-adicionar-codigo");
        let inputClinica = DOMH.ObterPelaClasse("input-adicionar-clinica");
        let obj = {
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
    SubirItem(e) {
        let linha = e.target.parentElement.parentElement.parentElement;
        let indice = Array.prototype.indexOf.call(linha.parentElement.children, linha);
        let item = CONF_TABELA_VALORES.Itens.splice(indice, 1);
        CONF_TABELA_VALORES.Itens.splice(indice - 1, 0, item[0]);
        CONF_TABELA_VALORES.SalvarItens();
        CONF_TABELA_VALORES.Visualizar();
    },
    DescerItem(e) {
        let linha = e.target.parentElement.parentElement.parentElement;
        let indice = Array.prototype.indexOf.call(linha.parentElement.children, linha);
        let item = CONF_TABELA_VALORES.Itens.splice(indice, 1);
        CONF_TABELA_VALORES.Itens.splice(indice + 1, 0, item[0]);
        CONF_TABELA_VALORES.SalvarItens();
        CONF_TABELA_VALORES.Visualizar();
    },
    ObterIndiceDoItem(item) {
        if (CONF_TABELA_VALORES.Itens.length === 0)
            return -1;
        let indice = -1;
        for (let i = 0; i < CONF_TABELA_VALORES.Itens.length; i++) {
            let outro = CONF_TABELA_VALORES.Itens[i];
            if (ItensSaoIguais(outro, item))
                indice = i;
        }
        return indice;
    },
    Visualizar() {
        let linhas = [];
        for (let item of CONF_TABELA_VALORES.Itens)
            linhas.push(CONF_TABELA_VALORES.CriarLinha(item));
        DOMH.ObterPelaClasse("tbody-itens")?.replaceChildren(...linhas);
    }
};
const CONF_NOME_COMPUTADOR = {
    Nome: "",
    Salvar() {
        let input = DOMH.ObterPelaClasse("input-nomeComputador");
        chrome.storage.local.set({ "NOME_COMPUTADOR": input.value });
    },
    Carregar() {
        let input = DOMH.ObterPelaClasse("input-nomeComputador");
        chrome.storage.local.get("NOME_COMPUTADOR").then(r => {
            if (!r.hasOwnProperty("NOME_COMPUTADOR"))
                return;
            input.value = r["NOME_COMPUTADOR"];
        });
    }
};
CONF_NOME_COMPUTADOR.Carregar();
CONF_TABELA_VALORES.CarregarSalvos();
DOMH.ObterPelaClasse("button-adicionar").addEventListener("click", CONF_TABELA_VALORES.Adicionar);
DOMH.ObterPelaClasse("button-nomeComputador").addEventListener("click", CONF_NOME_COMPUTADOR.Salvar);
