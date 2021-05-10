var cachedLinks = [];

browser.runtime.sendMessage({
    url: location.href,
    head: 'getLinks',
    content: location.href
}).then(currentLinks => {
    let isLink = false;

    currentLinks.forEach(links => {
        links.links.forEach(link => {
            if (location.href.includes(link)) {
                isLink = true;
                let url = browser.runtime.getURL("html/redirect.html");
                location.href = url + '?url=' + location.href;
            }
        });
    });

    if (!isLink) {
        cachedLinks.concat(currentLinks);
        var as = document.getElementsByTagName('a');

        function checkHref(a, links) {
            console.log(links);
            links.forEach(link => {
                for (let i = 0; i < link.links.length; i++) {
                    const linkCheck = link.links[i];

                    if (a.href.includes(linkCheck)) {
                        i = link.links.length;

                        let div = document.createElement('div');
                        div.style = 'display: inline-block; width: 24px; height: 24px;'

                        let img = document.createElement('img');
                        img.src = browser.runtime.getURL('images/icon.png');
                        img.width = '24';
                        img.height = '24';

                        div.append(img);
                        a.append(div);

                        a.addEventListener('click', function(e) {
                            if (!confirm('Rick Roll Link Detected, Continue?')) e.preventDefault();
                        });
                    }
                }
            });
        }

        for (var i = 0; i < as.length; ++i) {
            const a = as[i];
            let cached = false;

            for (let i2 = 0; i2 < cachedLinks.length; i2++) {
                const links = cachedLinks[i2];

                links.domains.forEach(domain => {
                    if (a.href.includes(domain)) {
                        cached = true;
                        i2 = cachedLinks.length;
                        checkHref(a, cachedLinks);
                    }
                });
            }

            if (!cached) {
                browser.runtime.sendMessage({
                    url: location.href,
                    head: 'getLinks',
                    content: a.href
                }).then(newLinks => {
                    cachedLinks.concat(newLinks);
                    checkHref(a, newLinks);
                });
            }
        }
    }
});