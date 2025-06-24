"use strict";
var TipoDeEntrada;
(function (TipoDeEntrada) {
    TipoDeEntrada[TipoDeEntrada["Profissional"] = 0] = "Profissional";
    TipoDeEntrada[TipoDeEntrada["GrupoDeProcedimentos"] = 1] = "GrupoDeProcedimentos";
})(TipoDeEntrada || (TipoDeEntrada = {}));
const TABELA_VALORES = {
    Itens: [],
    CarregarItens() {
        chrome.storage.local.get(null).then(r => {
            if (!r.hasOwnProperty("TABELA_VALORES"))
                return;
            TABELA_VALORES.Itens = r["TABELA_VALORES"];
            TABELA_VALORES.CriarVisualizacao();
        });
    },
    ObterValorGrupo(item) {
        let url = "http://cialtouruguai.com.br/municipio/relatorio_mvtogeral.php";
        let datas = TABELA_VALORES.ObterDatasFaturamentoAtual();
        let di = encodeURIComponent(datas[0]);
        let df = encodeURIComponent(datas[1]);
        let payload = `edDtIni=${di}&edDtFim=${df}&edGrupoProcedimento=${item.Codigo}&btnEnviar=Listar`;
        TABELA_VALORES.EnviarRequest(url, payload, (res) => TABELA_VALORES.ExtrairValorGrupo(item, res));
    },
    ExtrairValorGrupo(item, res) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(res, "text/html");
        let celulas = doc.getElementsByTagName("td");
        DOM.ObterPelaClasse(`valor-${item.Codigo}-`).textContent = celulas.length > 2 ? celulas[celulas.length - 1].textContent : "0,00";
    },
    ObterValorProfissional: async function (item) {
        let url = "http://cialtouruguai.com.br/municipio/relatorio_atendimento.php";
        let datas = TABELA_VALORES.ObterDatasFaturamentoAtual();
        let di = encodeURIComponent(datas[0]);
        let df = encodeURIComponent(datas[1]);
        let payload = `edDtIni=${di}&edDtFim=${df}&edCompetencia=&edProfissional=${item.Codigo}&codSusBeneficiario=&edAgrupar=2&btnEnviar=Listar`;
        TABELA_VALORES.EnviarRequest(url, payload, (res) => TABELA_VALORES.ObterValorClinica(item, res));
    },
    ObterValorClinica: async function (item, res) {
        let url = `http://cialtouruguai.com.br/publico/pesquisaclinica.php?codProf=${item.Codigo}&idCampoFoco=edData`;
        let x = new XMLHttpRequest();
        x.open("GET", url, true);
        x.onreadystatechange = () => {
            if (x.readyState !== 4)
                return;
            let parser = new DOMParser();
            let doc = parser.parseFromString(x.response, "text/html");
            let clinicas = doc.getElementsByClassName("tabela")[2].children[0].children;
            for (let i = 2; i < clinicas.length; i++) {
                if (clinicas[i].children[0].textContent !== item.Clinica)
                    continue;
                TABELA_VALORES.ExtrairValorClinica(item, clinicas[i].children[1].textContent, res);
            }
        };
        x.send();
    },
    ExtrairValorClinica(item, nomeClinica, res) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(res, "text/html");
        if (doc.getElementsByClassName("tabela")[1] === undefined) {
            DOM.ObterPelaClasse(`valor-${item.Codigo}-${item.Clinica}`).textContent = "0,00";
            return;
        }
        let tabela = doc.getElementsByClassName("tabela")[1].children[0].children;
        let valores = {};
        let clinicaAtual = "";
        for (let i = 1; i < tabela.length - 1; i++) {
            if (tabela[i].children.length === 1)
                clinicaAtual = tabela[i].children[0].textContent.trim();
            if (tabela[i].children.length === 2)
                valores[clinicaAtual] = tabela[i].children[1].textContent;
        }
        DOM.ObterPelaClasse(`valor-${item.Codigo}-${item.Clinica}`).textContent = valores[nomeClinica];
    },
    ObterValorTotal: async function () {
        let url = "http://cialtouruguai.com.br/municipio/relatorio_atendimento.php";
        let datas = TABELA_VALORES.ObterDatasFaturamentoAtual();
        let di = encodeURIComponent(datas[0]);
        let df = encodeURIComponent(datas[1]);
        let payload = `edDtIni=${di}&edDtFim=${df}&edCompetencia=&edProfissional=&codSusBeneficiario=&edAgrupar=2&btnEnviar=Listar`;
        TABELA_VALORES.EnviarRequest(url, payload, (res) => TABELA_VALORES.ExtrairValorTotal(res));
    },
    ExtrairValorTotal(res) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(res, "text/html");
        let celulas = doc.getElementsByTagName("td");
        DOM.ObterPelaClasse("valor--").textContent = celulas[celulas.length - 1].textContent;
    },
    CriarVisualizacao() {
        let tabelaValores = DOM.CriarElemento("div", ["div-tabelaValores", "div-tabelaValores-escondida"]);
        let botaoToggle = DOM.CriarElemento("button", "button-tabelaValores-toggle");
        botaoToggle.addEventListener("click", () => {
            tabelaValores.classList.toggle("div-tabelaValores-escondida");
            if (tabelaValores.classList.contains("div-tabelaValores-escondida")) {
                imagemDireita.style.display = "none";
                imagemEsquerda.style.display = "block";
            }
            else {
                imagemDireita.style.display = "block";
                imagemEsquerda.style.display = "none";
            }
        });
        let imagemEsquerda = DOM.CriarElemento("img", "img-botaoToggle-esquerda");
        imagemEsquerda.src = `chrome-extension://${chrome.i18n.getMessage("@@extension_id")}/assets/Images/Icons/Esquerda.png`;
        let imagemDireita = DOM.CriarElemento("img", "img-botaoToggle-direita");
        imagemDireita.src = `chrome-extension://${chrome.i18n.getMessage("@@extension_id")}/assets/Images/Icons/Direita.png`;
        imagemDireita.style.display = "none";
        botaoToggle.replaceChildren(imagemEsquerda, imagemDireita);
        let conteudo = DOM.CriarElemento("div", "div-tabelaValores-conteudo");
        let titulo = DOM.CriarElemento("span", "span-tabelaValores-titulo");
        titulo.textContent = "Tabela de valores";
        let faturamento = DOM.CriarElemento("span", "span-tabelaValores-faturamento");
        let datas = TABELA_VALORES.ObterDatasFaturamentoAtual();
        faturamento.textContent = `Faturamento: de ${datas[0]} a ${datas[1]}`;
        let lista = DOM.CriarElemento("table", "table-tabelaValores");
        for (let item of TABELA_VALORES.Itens) {
            let linha = DOM.CriarElemento("tr", "tr-tabelaValores-item");
            let tdNome = DOM.CriarElemento("td", "td-tabelaValores-nome");
            tdNome.textContent = item.Nome;
            let tdValor = DOM.CriarElemento("td", ["td-tabelaValores-valor", `valor-${item.Codigo}-${item.Clinica}`]);
            if (item.Codigo !== "") {
                if (item.Tipo === TipoDeEntrada.Profissional)
                    TABELA_VALORES.ObterValorProfissional(item);
                else
                    TABELA_VALORES.ObterValorGrupo(item);
            }
            else
                TABELA_VALORES.ObterValorTotal();
            linha.replaceChildren(tdNome, tdValor);
            lista.appendChild(linha);
        }
        conteudo.replaceChildren(titulo, faturamento, lista);
        tabelaValores.replaceChildren(botaoToggle, conteudo);
        document.body.appendChild(tabelaValores);
    },
    EnviarRequest: async function (url, payload, resultHandler) {
        let req = new XMLHttpRequest();
        req.open("POST", url, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = () => { if (req.readyState === 4)
            resultHandler(req.response); };
        req.send(payload);
    },
    ObterDatasFaturamentoAtual() {
        let dia = new Date().getDate();
        let mes = new Date().getMonth() + 1;
        let ano = new Date().getFullYear();
        let mesIni = dia < 16 ? mes - 1 : mes;
        let mesFim = dia < 16 ? mes : mes + 1;
        let anoIni = dia < 16 && mes == 1 ? ano - 1 : ano;
        let anoFim = dia >= 16 && mes == 12 ? ano + 1 : ano;
        let dataIni = `16/${mesIni.toString().padStart(2, "0")}/${anoIni}`;
        let dataFim = `15/${mesFim.toString().padStart(2, "0")}/${anoFim}`;
        return [dataIni, dataFim];
    }
};
TABELA_VALORES.CarregarItens();
