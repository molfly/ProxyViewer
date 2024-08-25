function updateProxySettings() {
    browser.proxy.settings.get({}).then((proxySettings) => {
        let proxyIP = {
            http: 'N/A',
            https: 'N/A',
            socks: 'N/A'
        };
        let proxyPort = {
            http: 'N/A',
            https: 'N/A',
            socks: 'N/A'
        };

        if (proxySettings.value && proxySettings.value.proxyType === 'manual') {
            if (proxySettings.value.http) {
                const [httpIP, httpPort] = proxySettings.value.http.split(':');
                proxyIP.http = httpIP || 'N/A';
                proxyPort.http = httpPort || 'N/A';
            }
            if (proxySettings.value.ssl) {
                const [httpsIP, httpsPort] = proxySettings.value.ssl.split(':');
                proxyIP.https = httpsIP || 'N/A';
                proxyPort.https = httpsPort || 'N/A';
            }
            if (proxySettings.value.socks) {
                const [socksIP, socksPort] = proxySettings.value.socks.split(':');
                proxyIP.socks = socksIP || 'N/A';
                proxyPort.socks = socksPort || 'N/A';
            }
        }

        return browser.storage.local.set({
            proxyIP: proxyIP,
            proxyPort: proxyPort
        });
    }).catch((error) => {
        console.error("Error updating proxy settings:", error);
    });
}

browser.runtime.onStartup.addListener(updateProxySettings);
browser.runtime.onInstalled.addListener(updateProxySettings);
