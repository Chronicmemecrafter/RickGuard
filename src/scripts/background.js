var directs = {};
fetch('https://raw.githubusercontent.com/UnusualNorm/RickGuard/main/links/direct.json')
.then(res => res.json()).then(json => directs = json);

var indirects = {};
fetch('https://raw.githubusercontent.com/UnusualNorm/RickGuard/main/links/indirect.json')
.then(res => res.json()).then(json => indirects = json);

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.head) {
        case 'getLinks':
            let links = [];
            
            directs.forEach(site => {
                let merge = false;
                for (let i = 0; i < site.domains.length; i++) {
                    const domain = site.domains[i];
                    if (request.content.includes(domain)) merge = true;
                }

                if (merge) site.links.forEach(link => links.push(link));
            });

            indirects.forEach(site => {
                let merge = false;
                for (let i = 0; i < site.domains.length; i++) {
                    const domain = site.domains[i];
                    if (request.content.includes(domain)) merge = true;
                }

                if (merge) site.links.forEach(link => links.push(link));
            });

            sendResponse(links);
            break;
    
        default:
            break;
    }
});