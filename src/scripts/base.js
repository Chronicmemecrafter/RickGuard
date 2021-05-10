browser.runtime.sendMessage({
    url: top.location.href,
    head: 'getLinks',
    content: window.location.hostname
}).then(links => {
    links.forEach(link => {
        console.log(link);
        if (top.location.href.includes(link)) {
            let url = browser.runtime.getURL("html/redirect.html");
            top.location.href = url + '?url=' + top.location.href;
            console.log(url);
        }
    });
});