"use strict";
document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        if (location.pathname === "/municipio/atendimentoEletronico.php") {
            if (new URL(location.href).searchParams.has("atd"))
                document.body.setAttribute("onload", "setaFoco('edCodProc');");
            document.getElementById("formAtendimentoEletronico").setAttribute("onsubmit", "return ValidaNOVO();");
            document.getElementById("edClinica").setAttribute("onblur", "RetornaClinicaNOVO();");
            document.getElementById("edCodSUS").setAttribute("onblur", "RetornaBeneficiarioNOVO();");
        }
        if (location.pathname === "/municipio/verificaAtendimento.php") {
            let linhas = document.getElementsByClassName("tabela")[2]?.getElementsByTagName("tr");
            if (linhas === undefined)
                return;
            for (let i = 2; i < linhas.length; i++) {
                let conteudoCelulaExcluir = linhas[i].children[7].children[0];
                if (conteudoCelulaExcluir.tagName === "IMG")
                    continue;
                conteudoCelulaExcluir.href = "javascript: excluirAutorizacaoNOVO(1601351);";
            }
        }
    }
};
function RetornaClinicaNOVO() {
    var codProf = document.getElementById("edCodProf").value;
    var codCli = document.getElementById("edClinica").value;
    if (parseInt(codCli) <= 0) {
        document.getElementById("edClinica").value = "";
        document.getElementById("edDescClinica").value = "";
    }
    else {
        xajax_RetornaClinica(codProf, codCli);
        setTimeout(() => {
            setaFoco("edCodSUS");
        }, 80);
    }
}
function RetornaBeneficiarioNOVO() {
    var codSUS = document.getElementById("edCodSUS").value;
    if (parseInt(codSUS) >= 0) {
        xajax_RetornaBeneficiario(codSUS);
        setTimeout(() => {
            if (document.getElementById("edNome").value === "")
                return;
            setaFoco("edCodProc");
        }, 80);
    }
}
function ValidaNOVO() {
    let edClinica = document.getElementById('edClinica');
    let edCodProf = document.getElementById("edCodProf");
    let edData = document.getElementById("edData");
    let edNroRequisicao = document.getElementById("edNroRequisicao");
    let edCodSiaSUS = document.getElementById("edCodSiaSUS");
    let vlrNroRequisicao = edNroRequisicao.value;
    let vlrCodSiaSUS = edCodSiaSUS.value;
    //Valor para teste com Expressão Regular
    var expReg = /\D/g;
    if ((edCodProf.value == "")) {
        alert("Informe o Profissional!");
        edCodProf.focus();
        return false;
    }
    if (edClinica.value == '' || isNaN(parseInt(edClinica.value))) {
        alert("Informe a Clínica!");
        edClinica.focus();
        return false;
    }
    if (edCodSiaSUS.value == "") {
        alert("Informe o código CNES da Unidade de Saúde!");
        edCodSiaSUS.focus();
        return false;
    }
    if (vlrCodSiaSUS.search(expReg) >= 0) {
        alert("Código CNES é inválido!");
        edCodSiaSUS.focus();
        edCodSiaSUS.select();
        return false;
    }
    if (parseInt(vlrCodSiaSUS) <= 0) {
        alert("Código CNES é inválido!");
        edCodSiaSUS.focus();
        edCodSiaSUS.select();
        return false;
    }
    if (edData.value == "") {
        alert("Informe a data do atendimento!");
        edData.focus();
        return false;
    }
    else if (!ValidaData(edData.value)) {
        alert("Informe uma data válida!");
        edData.focus();
        return false;
    }
    if (edNroRequisicao.value == "") {
        alert("Informe o número da requisição!");
        edNroRequisicao.focus();
        return false;
    }
    if (vlrNroRequisicao.search(expReg) >= 0) {
        alert("Número da requisição é inválido!");
        edNroRequisicao.focus();
        edNroRequisicao.select();
        return false;
    }
    if (parseInt(vlrNroRequisicao) <= 0) {
        alert("Número da requisição é inválido");
        edNroRequisicao.focus();
        edNroRequisicao.select();
        return false;
    }
    let edCodProc = document.getElementById("edCodProc");
    let edCodOpe = document.getElementById("edCodOpe");
    let edQtd = document.getElementById("edQtd");
    if (edCodProc.value == "") {
        alert("Informe o código do Procedimento");
        edCodProc.focus();
        return false;
    }
    if (edCodOpe.value == "") {
        alert("Informe o tipo da operação");
        edCodOpe.focus();
        return false;
    }
    if (edQtd.value == "") {
        alert("Informe a Quantidade");
        edQtd.focus();
        return false;
    }
    return;
}
function excluirAutorizacaoNOVO(codigo) {
    var url = "atendimentoEletronico.php?atd=" + codigo + "&proc=&acao=cancelar";
    ConfirmaExclusao('Voc&ecirc; deseja excluir este atendimento?', url);
}
