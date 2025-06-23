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
    let linhaInformacoes = document.getElementsByTagName("table")[4].getElementsByTagName("td")[0];
    linhaInformacoes.textContent += " - Computador: 1";
    linhaInformacoes.textContent += ` - UNIX: ${new Date().getTime()}`;
    linhaInformacoes.style.breakAfter = "page";
}
document.addEventListener("readystatechange", () => {
    if (document.readyState !== "complete")
        return;
    MoverBotoesParaCima();
    AdicionarInformacoes();
});
export {};
