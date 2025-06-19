const GERADOR =
{
    TipoDeTag: null,
    ModoDeImpressao: null,
    Iniciar: function ()
    {
        GERADOR.EsconderFilhos(DOM.ObterPelaClasse("div-campos"));
        GERADOR.EsconderFilhos(DOM.ObterPelaClasse("div-visualizacao"));

        DOM.ObterPelaClasse("select-tipoDeTag").addEventListener("change", GERADOR.MudarTipoDeTag);
        DOM.ObterPelaClasse("select-modoDeImpressao").addEventListener("change", GERADOR.MudarModoDeImpressao);

        DOM.ObterPelaClasse("input-padrao-data").value = (new Date()).toLocaleDateString("pt-BR");
        DOM.ObterPelaClasse("span-padrao-data").textContent = (new Date()).toLocaleDateString("pt-BR");

        GERADOR.CriarEventHandlers();
    },
    CriarEventHandlers: function ()
    {
        DOM.ObterPelaClasse("input-campanha-titulo").addEventListener("input", GERADOR.Escrever);
        DOM.ObterPelaClasse("input-campanha-data").addEventListener("input", GERADOR.Escrever);
        DOM.ObterPelaClasse("input-campanha-lote").addEventListener("input", GERADOR.Escrever);
        DOM.ObterPelaClasse("input-campanha-validade").addEventListener("input", GERADOR.Escrever);
        DOM.ObterPelaClasse("input-campanha-laboratorio").addEventListener("input", GERADOR.Escrever);
        
        DOM.ObterPelaClasse("input-padrao-data").addEventListener("input", GERADOR.Escrever);
        DOM.ObterPelaClasse("input-padrao-lote").addEventListener("input", GERADOR.Escrever);
        DOM.ObterPelaClasse("input-padrao-laboratorio").addEventListener("input", GERADOR.Escrever);

        DOM.ObterPelaClasse("button-gerar").addEventListener("click", GERADOR.Gerar);
    },
    Escrever: function (e)
    {
        let tipoDeInput = e.target.className.split("input-")[1];
        DOM.ObterPelaClasse(`span-${tipoDeInput}`).textContent = e.target.value.toUpperCase();
    },
    EsconderFilhos: function (elemento)
    {
        for (let i = 0; i < elemento.children.length; i++)
        {
            elemento.children[i].style.display = "none";
        }
    },
    MudarTipoDeTag: function (entrada)
    {
        if (typeof entrada === "string") GERADOR.TipoDeTag = entrada;
        else GERADOR.TipoDeTag = entrada.target.value;

        GERADOR.EsconderFilhos(DOM.ObterPelaClasse("div-campos"));
        GERADOR.EsconderFilhos(DOM.ObterPelaClasse("div-visualizacao"));

        DOM.ObterPelaClasse(`div-${GERADOR.TipoDeTag}-campos`).style.display = "flex";
        DOM.ObterPelaClasse(`div-${GERADOR.TipoDeTag}-visualizacao`).style.display = "flex";
    },
    MudarModoDeImpressao: function (entrada)
    {
        if (typeof entrada === "string") GERADOR.ModoDeImpressao = entrada;
        else GERADOR.ModoDeImpressao = entrada.target.value;
    },
    Gerar: function ()
    {
        if (GERADOR.ModoDeImpressao === "tabela") GERADOR.GerarTabela();
        else GERADOR.GerarEtiqueta();
    },
    GerarTabela: async function ()
    {
        let tabela = document.createElement("table");

        let image = URL.createObjectURL(await domtoimage.toBlob(DOM.ObterPelaClasse(`td-${GERADOR.TipoDeTag}-visualizacao`).children[0]));

        for (let i = 0; i < 16; i++)
        {
            let linha = document.createElement("tr");

            for (let j = 0; j < 5; j++)
            {
                let celula = document.createElement("td");

                let div = document.createElement("div");
                let imagem = document.createElement("img");
                imagem.src = image;
                div.appendChild(imagem);
                celula.appendChild(div);

                linha.appendChild(celula);
            }
            
            tabela.appendChild(linha);
        }

        DOM.ObterPelaClasse("div-saida").replaceChildren(tabela);
    },
    GerarEtiqueta: async function ()
    {
        let div = document.createElement("div");
        div.style.display = "flex";
        div.style.gap = "0.3cm";
        
        let table = document.createElement("table");

        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let img = document.createElement("img");
        img.src = URL.createObjectURL(await domtoimage.toBlob(DOM.ObterPelaClasse(`td-${GERADOR.TipoDeTag}-visualizacao`).children[0]));
        td.replaceChildren(img);
        tr.replaceChildren(td, td.cloneNode(true));
        table.replaceChildren(tr, tr.cloneNode(true));

        div.replaceChildren(table, table.cloneNode(true));
        DOM.ObterPelaClasse("div-saida").replaceChildren(div);
    }
};
GERADOR.Iniciar();
GERADOR.MudarTipoDeTag("campanha");
GERADOR.MudarModoDeImpressao("tabela");
