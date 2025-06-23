function CriarBotaoImprimir() {
    let numeroAtendimento = new URL(location.href).searchParams.get("atd");
    let atendimento = btoa(numeroAtendimento);
    let botaoImprimir = document.createElement("input");
    botaoImprimir.type = "button";
    botaoImprimir.classList.add("botao", "botaoImprimir");
    botaoImprimir.value = "Imprimir";
    botaoImprimir.addEventListener("click", () => {
        location.href = "http://cialtouruguai.com.br/publico/relAutorizacaoAtendimento.php?codigo=" + atendimento;
    });
    let linhaTopo = document.getElementsByTagName("table")[2].children[0].children[0];
    linhaTopo.children[0].appendChild(botaoImprimir);
}
function PreencherData() {
    let diaAtual = new Date().getDate().toString().padStart(2, "0");
    let mesAtual = (new Date().getMonth() + 1).toString().padStart(2, "0");
    let anoAtual = new Date().getFullYear();
    let dataHoje = `${diaAtual}/${mesAtual}/${anoAtual}`;
    document.getElementById("edData").value = dataHoje;
}
document.addEventListener("readystatechange", () => {
    if (document.readyState !== "complete")
        return;
    PreencherData();
    let urlAtendimento = new URL(location.href);
    if (urlAtendimento.searchParams.has("atd")
        && !urlAtendimento.searchParams.has("acao"))
        CriarBotaoImprimir();
});
export {};
