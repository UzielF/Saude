function EstaNoPainelDeBeneficios(): boolean
{
    let secaoConcessaoDeBeneficios = document.getElementsByTagName("table")[3];
    if (secaoConcessaoDeBeneficios === undefined) return false;

    let botaoVoltar = secaoConcessaoDeBeneficios.getElementsByClassName("btnOusado")[0]!;
    let linhaBotoes = botaoVoltar.parentElement!;
    let botaoAvancarOuGravar = linhaBotoes.lastElementChild!.children[0]!;
    if (botaoAvancarOuGravar.textContent === "Gravar") return true;

    return false;
}

let LoopAtualizacaoValorTotal: number | null = null;
document.onreadystatechange = () =>
{
    if (document.readyState !== "complete") return;
    MudarParaEntrada();

    setTimeout(() => (<HTMLInputElement>document.getElementById("cimau_input")).select(), 120);
    
}

function AdicionarEventHandlerAoBotaoAvancar(): void
{
    if (EstaNoPainelDeBeneficios()) return;
    
    let secaoConcessaoDeBeneficios = document.getElementsByTagName("table")[3];
    if (secaoConcessaoDeBeneficios === undefined) return;

    let botaoVoltar = secaoConcessaoDeBeneficios.getElementsByClassName("btnOusado")[0]!;
    let linhaBotoes = botaoVoltar.parentElement!;
    let botaoAvancar = linhaBotoes.lastElementChild!.children[0]!;
    if (botaoAvancar.textContent !== "Avançar") return;

    let comandoTotal = botaoAvancar.getAttribute("onclick")!;

    let comandoPrimeFaces = comandoTotal.split(";")[0];

    botaoAvancar.setAttribute("onclick", comandoPrimeFaces + ".then(() => {MudarParaPainel();});return false;");
}
function AdicionarEventHandlerAoBotaoVoltar(): void
{
    if (!EstaNoPainelDeBeneficios()) return;
    
    let secaoConcessaoDeBeneficios = document.getElementsByTagName("table")[3];
    if (secaoConcessaoDeBeneficios === undefined) return;

    let botaoVoltar = secaoConcessaoDeBeneficios.getElementsByClassName("btnOusado")[0]!.children[0]!;

    let comandoTotal = botaoVoltar.getAttribute("onclick")!;

    let comandoPrimeFaces = comandoTotal.split(";result")[0];

    botaoVoltar.setAttribute("onclick", comandoPrimeFaces + ".then(() => {MudarParaEntrada();});return false;");
}

function MudarParaPainel(): void
{
    if (!EstaNoPainelDeBeneficios())
    {
        AdicionarEventHandlerAoBotaoAvancar();
        return;
    }
    AdicionarEventHandlerAoBotaoVoltar();
    CriarCampoValorTotal();
    IniciarLoop();
}
function MudarParaEntrada(): void
{
    AdicionarEventHandlerAoBotaoAvancar();
    document.getElementById("campoValorTotal")?.remove();
    TerminarLoop();
    CriarCampoAutorizacaoCIMAU();
}

// campo autorização cimau
function CriarCampoAutorizacaoCIMAU(): void
{
    let campo = document.createElement("input");
    campo.type = "text";
    campo.id = "cimau_input";
    campo.placeholder = "Nº Autorização CIMAU";
    campo.addEventListener("input", evt => {(<HTMLTextAreaElement>document.getElementById( "obs" )!).value = `CIMAU - Autorização nº ${(<HTMLInputElement>evt!.target!).value}`;});

    document.getElementById( "cabecalho" )!.insertBefore( campo, document.getElementById( "cabecalho" )!.children[ 2 ]! );
}


// VALOR TOTAL
function ObterValorTotal(): string
{
    let listaBeneficios = document.getElementById("listaBenef")!.getElementsByTagName("tr");
    
    if (listaBeneficios[1]!.textContent === "Nenhum adicionado..") return "R$ 0,00";
    
    let valorEmCentavos = 0;
    for (let i = 1; i < listaBeneficios.length; i++)
    {
        let valorString = listaBeneficios[i]!.children[6]!.textContent!;
        let valorNumeros = valorString.match(/\d/g);
        if (valorNumeros === null) continue;
        valorEmCentavos += parseInt(valorNumeros.join(""));
    }
    
    let valorEmCentavosString = valorEmCentavos.toString().padStart(3, "0");

    let reais = valorEmCentavosString.substring(0, valorEmCentavosString.length-2);
    let centavos = valorEmCentavosString.substring(valorEmCentavosString.length-2);

    return `R$ ${reais},${centavos}`;
}

function CriarCampoValorTotal(): void
{
    if (!EstaNoPainelDeBeneficios()) return;

    let painelBeneficios = document.getElementById("painelBen")!;
    let botaoAdicionar = painelBeneficios.getElementsByTagName("button")[0]!;

    let campoValorTotal = document.createElement("span");
    campoValorTotal.id = "campoValorTotal";
    campoValorTotal.textContent = "R$ 0,00";
    botaoAdicionar.parentElement!.insertBefore(campoValorTotal, botaoAdicionar);
}

function IniciarLoop(): void
{
    if (!EstaNoPainelDeBeneficios() || LoopAtualizacaoValorTotal !== null) return;
    LoopAtualizacaoValorTotal = setInterval(AtualizarValorTotal, 450);
}

function TerminarLoop(): void
{
    if (EstaNoPainelDeBeneficios() || LoopAtualizacaoValorTotal === null) return;
    clearInterval(LoopAtualizacaoValorTotal);
}

function AtualizarValorTotal(): void
{
    if (!EstaNoPainelDeBeneficios()) return;

    let campo = document.getElementById("campoValorTotal")!;

    campo.textContent = ObterValorTotal();
}
