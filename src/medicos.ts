interface IMedico
{
    Nome: string;
    Apelido: string;
    Procedimentos: { [key: string]: string };
}

const MEDICOS: { [key: string]: IMedico } =
{
    "roberto":
    {
        Nome: "ROBERTO CARLOS STRÜCKER REATEGUI NAVARRO",
        Apelido: "DR ROBERTO",
        Procedimentos:
        {
            "us-abdomen-total": "US ABDOMEN TOTAL",
            "us-aparelho-urinario": "US APARELHO URINÁRIO",
            "us-prostata-abdominal": "US PRÓSTATA VIA ABDOMINAL",
            "us-mamas": "US MAMAS"
        }
    },
    "hermes":
    {
        Nome: "HERMES FASOLIN MELLO",
        Apelido: "DR HERMES",
        Procedimentos:
        {
            "us-abdomen-total": "US ABDOMEN TOTAL",
            "us-aparelho-urinario": "US APARELHO URINÁRIO",
            "us-prostata-abdominal": "US PRÓSTATA VIA ABDOMINAL",
            "us-prostata-transretal": "US PRÓSTATA VIA TRANSRETAL",
            "ecodoppler-tireoide": "ECODOPPLER TIREÓIDE"
        }
    },
    "eduardo":
    {
        Nome: "EDUARDO MAIO ZABALETTA",
        Apelido: "DR EDUARDO",
        Procedimentos:
        {
            "endoscopia": "ENDOSCOPIA",
            "colonoscopia": "COLONOSCOPIA"
        }
    }
} as const;