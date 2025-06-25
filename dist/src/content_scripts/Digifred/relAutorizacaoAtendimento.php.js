"use strict";
function MoverBotoesParaCima() {
    let botoes = document.getElementById("btnImprimir").parentElement;
    botoes.style.marginTop = "70px";
    botoes.style.marginBottom = "60px";
    let botaoNovoAtendimento = document.createElement("input");
    botaoNovoAtendimento.classList.add("botao");
    botaoNovoAtendimento.setAttribute("type", "button");
    botaoNovoAtendimento.setAttribute("onclick", "location.href = '../municipio/atendimentoEletronico.php';");
    botaoNovoAtendimento.setAttribute("value", "Novo Atendimento");
    botoes.appendChild(botaoNovoAtendimento);
    let newStyle = document.createElement("style");
    newStyle.innerHTML = "center { display: none; }";
    newStyle.media = "print";
    document.head.appendChild(newStyle);
    let cabecalho = document.getElementById("cabecalho");
    document.body.insertBefore(botoes, cabecalho);
}
function AdicionarInformacoes() {
    chrome.storage.local.get("NOME_COMPUTADOR").then(r => {
        let nome = "";
        if (!r.hasOwnProperty("NOME_COMPUTADOR") || r["NOME_COMPUTADOR"] === "")
            nome = "NÃO IDENTIFICADO";
        else
            nome = r["NOME_COMPUTADOR"];
        let linhaInformacoesA = document.getElementsByTagName("table")[4].getElementsByTagName("td")[0];
        linhaInformacoesA.textContent += ` - Computador: ${nome}`;
        linhaInformacoesA.textContent += ` - UNIX: ${new Date().getTime()}`;
        linhaInformacoesA.style.breakAfter = "page";
        let linhaInformacoesB = document.getElementsByTagName("table")[9].getElementsByTagName("td")[0];
        linhaInformacoesB.textContent += ` - Computador: ${nome}`;
        linhaInformacoesB.textContent += ` - UNIX: ${new Date().getTime()}`;
    });
}
document.addEventListener("readystatechange", () => {
    if (document.readyState !== "complete")
        return;
    MoverBotoesParaCima();
    AdicionarInformacoes();
    document.body.children[7].remove();
    let breaks = document.getElementsByTagName("br");
    breaks[breaks.length - 1].remove();
});
