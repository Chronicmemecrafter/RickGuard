browser.runtime.sendMessage({
    head: 'getLinks',
    content: window.location.hostname
}).then(links => {
    links.forEach(link => {
        console.log(link);
    });
});