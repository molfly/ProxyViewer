document.addEventListener('DOMContentLoaded', () => {
    // Загрузка текущих настроек
    browser.storage.local.get(['proxyIP', 'proxyPort']).then((data) => {
        document.getElementById('httpProxyIP').textContent = data.proxyIP.http || 'N/A';
        document.getElementById('httpProxyPort').textContent = data.proxyPort.http || 'N/A';
        document.getElementById('httpsProxyIP').textContent = data.proxyIP.https || 'N/A';
        document.getElementById('httpsProxyPort').textContent = data.proxyPort.https || 'N/A';
        document.getElementById('socksProxyIP').textContent = data.proxyIP.socks || 'N/A';
        document.getElementById('socksProxyPort').textContent = data.proxyPort.socks || 'N/A';
    }).catch((error) => {
        console.error("Error loading proxy settings:", error);
    });

    // Сохранение новых настроек
    document.getElementById('saveSettings').addEventListener('click', () => {
        const newProxyIP = {
            http: document.getElementById('newHttpProxyIP').value || 'N/A',
            https: document.getElementById('newHttpsProxyIP').value || 'N/A',
            socks: document.getElementById('newSocksProxyIP').value || 'N/A'
        };
        const newProxyPort = {
            http: document.getElementById('newHttpProxyPort').value || 'N/A',
            https: document.getElementById('newHttpsProxyPort').value || 'N/A',
            socks: document.getElementById('newSocksProxyPort').value || 'N/A'
        };

        // Сохранение в локальном хранилище
        browser.storage.local.set({
            proxyIP: newProxyIP,
            proxyPort: newProxyPort
        }).then(() => {
            console.log("New proxy settings saved.");
            alert("Новые настройки прокси сохранены.");
        }).catch((error) => {
            console.error("Error saving proxy settings:", error);
        });
    });
});
