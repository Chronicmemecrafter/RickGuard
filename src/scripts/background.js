var directs = [];
fetch('https://raw.githubusercontent.com/UnusualNorm/RickGuard/main/links/direct.json')
    .then(res => res.json()).then(json => {
        directs = json;
        console.log(json);
    });

var indirects = [];
fetch('https://raw.githubusercontent.com/UnusualNorm/RickGuard/main/links/indirect.json')
    .then(res => res.json()).then(json => {
        indirects = json;
        console.log(json);
    });

var ignoredLinks = [];

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    switch (request.head) {
        case 'getLinks':
            let ignored = false;
            for (i = 0; i < ignoredLinks.length; i++) {
                const link = ignoredLinks[i];
                
                if (link == request.url) {
                    sendResponse([]);
                    ignored = true;
                    ignoredLinks.splice(i, 1);
                    console.log(request.url);
                }
            }

            if (!ignored) {
                let links = [];

                directs.forEach(site => {
                    let merge = false;
                    for (let i = 0; i < site.domains.length; i++) {
                        const domain = site.domains[i];
                        if (request.content.includes(domain)) {
                            merge = true;
                            console.log(domain);
                        };
                    }

                    if (merge) {
                        site.links.forEach(link => {
                            links.push(link);
                            console.log(link);
                        });
                    }
                });

                indirects.forEach(site => {
                    let merge = false;
                    for (let i = 0; i < site.domains.length; i++) {
                        const domain = site.domains[i];
                        if (request.content.includes(domain)) {
                            merge = true;
                            console.log(domain);
                        };
                    }

                    if (merge) {
                        site.links.forEach(link => {
                            links.push(link);
                            console.log(link);
                        });
                    }
                });

                sendResponse(links);
            }
            break;

        case 'ignoreLink':
            ignoredLinks.push(request.content);

            sendResponse();
            break;

        default:
            break;
    }
});