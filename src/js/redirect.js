const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('url');

if (!url) top.location.href = browser.runtime.getURL("images/icon.png");

if (confirm('Rick Roll link detected, continue?')) {
    browser.runtime.sendMessage({
        url: top.location.href,
        head: 'ignoreLink',
        content: url
    }).then(() => {
        top.location.href = url;
    });
} else {
    top.location.href = 'about:blank';
}