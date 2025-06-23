document.onreadystatechange = () =>
{
    if (document.readyState === "interactive")
    {
        if (location.pathname === "/municipio/atendimentoEletronico.php")
        {
            if (new URL(location.href).searchParams.has("atd")) document.body.setAttribute("onload", "setaFoco('edCodProc');");
            document.getElementById("formAtendimentoEletronico")!.setAttribute("onsubmit", "return ValidaNOVO();");
            document.getElementById("edClinica")!.setAttribute("onblur", "RetornaClinicaNOVO();");
            document.getElementById("edCodSUS")!.setAttribute("onblur", "RetornaBeneficiarioNOVO();");
        }

        if (location.pathname === "/municipio/verificaAtendimento.php")
        {
            let linhas = document.getElementsByClassName("tabela")[2]?.getElementsByTagName("tr");

            if (linhas === undefined) return;

            for (let i = 2; i < linhas.length; i++)
            {
                let conteudoCelulaExcluir = linhas[i]!.children[7]!.children[0]!;

                if (conteudoCelulaExcluir.tagName === "IMG") continue;

                (<HTMLAnchorElement>conteudoCelulaExcluir).href = "javascript: excluirAutorizacaoNOVO(1601351);";
            }
        }
    }
};

declare function xajax_RetornaClinica(a: string, b: string): void;
declare function setaFoco(a: string): void;
declare function xajax_RetornaBeneficiario(a: string): void;
declare function ValidaData(a: string): boolean;
declare function ValidaBeneficiario(): boolean;
declare function ConfirmaExclusao(msg: string, url: string): void;

function RetornaClinicaNOVO()
{
    var codProf = (<HTMLInputElement>document.getElementById("edCodProf")!).value;
    var codCli = (<HTMLInputElement>document.getElementById("edClinica")!).value;
    if (parseInt(codCli) <= 0)
    {
        (<HTMLInputElement>document.getElementById("edClinica")!).value = "";
        (<HTMLInputElement>document.getElementById("edDescClinica")!).value = "";
    } else
    {
        xajax_RetornaClinica(codProf, codCli);
        setTimeout(() =>
        {
            setaFoco("edCodSUS");
        }, 80);
    }
}

function RetornaBeneficiarioNOVO()
{
    var codSUS = (<HTMLInputElement>document.getElementById("edCodSUS")!).value;
    if (parseInt(codSUS) >= 0)
    {
        xajax_RetornaBeneficiario(codSUS);
        setTimeout(() =>
        {
            if ((<HTMLInputElement>document.getElementById("edNome")!).value === "") return;
            setaFoco("edCodProc");
        }, 80);

    }
}

function ValidaNOVO()
{

    let edClinica = <HTMLInputElement>document.getElementById('edClinica');
    let edCodProf = <HTMLInputElement>document.getElementById("edCodProf");
    let edData = <HTMLInputElement>document.getElementById("edData");
    let edNroRequisicao = <HTMLInputElement>document.getElementById("edNroRequisicao");
    let edCodSiaSUS = <HTMLInputElement>document.getElementById("edCodSiaSUS");

    let vlrNroRequisicao = edNroRequisicao.value;
    let vlrCodSiaSUS = edCodSiaSUS.value;

    //Valor para teste com Expressão Regular
    var expReg = /\D/g;

    if ((edCodProf.value == ""))
    {
        alert("Informe o Profissional!");
        edCodProf.focus();
        return false;
    }

    if (edClinica.value == '' || isNaN(parseInt(edClinica.value)))
    {
        alert("Informe a Clínica!");
        edClinica.focus();
        return false;
    }

    if (edCodSiaSUS.value == "")
    {
        alert("Informe o código CNES da Unidade de Saúde!");
        edCodSiaSUS.focus();
        return false;

    }
    if (vlrCodSiaSUS.search(expReg) >= 0)
    {
        alert("Código CNES é inválido!");
        edCodSiaSUS.focus();
        edCodSiaSUS.select();
        return false;
    }

    if (parseInt(vlrCodSiaSUS) <= 0)
    {
        alert("Código CNES é inválido!");
        edCodSiaSUS.focus();
        edCodSiaSUS.select();
        return false;
    }

    if (edData.value == "")
    {
        alert("Informe a data do atendimento!");
        edData.focus();
        return false;
    } else if (!ValidaData(edData.value))
    {
        alert("Informe uma data válida!");
        edData.focus();
        return false;
    }
    if (edNroRequisicao.value == "")
    {
        alert("Informe o número da requisição!");
        edNroRequisicao.focus();
        return false;
    }

    if (vlrNroRequisicao.search(expReg) >= 0)
    {
        alert("Número da requisição é inválido!");
        edNroRequisicao.focus();
        edNroRequisicao.select();
        return false;
    }

    if (parseInt(vlrNroRequisicao) <= 0)
    {
        alert("Número da requisição é inválido");
        edNroRequisicao.focus();
        edNroRequisicao.select();
        return false;
    }

    let edCodProc = <HTMLInputElement>document.getElementById("edCodProc");
    let edCodOpe = <HTMLInputElement>document.getElementById("edCodOpe");
    let edQtd = <HTMLInputElement>document.getElementById("edQtd");

    if (edCodProc.value == "")
    {
        alert("Informe o código do Procedimento");
        edCodProc.focus();
        return false;
    }

    if (edCodOpe.value == "")
    {
        alert("Informe o tipo da operação");
        edCodOpe.focus();
        return false;
    }

    if (edQtd.value == "")
    {
        alert("Informe a Quantidade");
        edQtd.focus();
        return false;
    }

    return;
}

function excluirAutorizacaoNOVO(codigo: string)
{
    var url = "atendimentoEletronico.php?atd=" + codigo + "&proc=&acao=cancelar";
    ConfirmaExclusao('Voc&ecirc; deseja excluir este atendimento?', url);
}
