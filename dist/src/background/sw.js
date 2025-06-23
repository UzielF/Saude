const EXTENSION_ID = chrome.i18n.getMessage("@@extension_id");
chrome.action.onClicked.addListener(AbrirConfiguracoes);
function AbrirConfiguracoes() {
    const PROPRIEDADES = {
        url: `chrome-extension://${EXTENSION_ID}/src/pages/settings-tabela-cimau/index.html`
    };
    chrome.tabs.create(PROPRIEDADES);
}
export {};
