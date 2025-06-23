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
            this.Itens = r["TABELA_VALORES"];
            this.Visualizar();
        });
    },
    CriarLinha(item) {
        let linha = DOMH.CriarElemento("tr", "tr-item");
        let celAcoes = DOMH.CriarElemento("td", "td-item-acoes");
        let celDivAcoes = DOMH.CriarElemento("div", "div-item-acoes");
        let botaoApagar = DOMH.CriarElemento("button", "button-item-apagar");
        botaoApagar.addEventListener("click", e => {
            let linha = e.target.parentElement;
            console.log(e);
            let indice = 0;
            this.Itens.splice(indice, 1);
            this.Visualizar();
        });
        let botaoSubir = DOMH.CriarElemento("button", "button-item-subir");
        botaoSubir.addEventListener("click", this.SubirItem);
        let botaoDescer = DOMH.CriarElemento("button", "button-item-descer");
        botaoDescer.addEventListener("click", this.DescerItem);
        celDivAcoes.replaceChildren(botaoApagar, botaoSubir, botaoDescer);
        celAcoes.replaceChildren(celDivAcoes);
        let celNome = DOMH.CriarElemento("td", "td-item-nome");
        celNome.textContent = item.Nome;
        let celCodigo = DOMH.CriarElemento("td", "td-item-codigo");
        celCodigo.textContent = item.Codigo;
        let celClinica = DOMH.CriarElemento("td", "td-item-clinica");
        celClinica.textContent = item.Clinica;
        linha.replaceChildren(celAcoes, celNome, celCodigo, celClinica);
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
        this.Itens.push(obj);
        selectTipo.value = "profissional";
        inputNome.value = "";
        inputCodigo.value = "";
        inputClinica.value = "";
        this.Visualizar();
    },
    SubirItem(e) {
        let linha = e.target.parentElement;
    },
    DescerItem(e) { },
    ObterIndiceDoItem(item) {
        if (this.Itens.length === 0)
            return -1;
        let indice = -1;
        for (let i = 0; i < this.Itens.length; i++) {
            let outro = this.Itens[i];
            if (ItensSaoIguais(outro, item))
                indice = i;
        }
        return indice;
    },
    Visualizar() {
        let linhas = [];
        for (let item of this.Itens)
            linhas.push(this.CriarLinha(item));
        DOMH.ObterPelaClasse("tbody-itens")?.replaceChildren(...linhas);
    }
};
CONF_TABELA_VALORES.CarregarSalvos();
DOMH.ObterPelaClasse("button-adicionar").addEventListener("click", CONF_TABELA_VALORES.Adicionar);
