const urlParams = new URLSearchParams(window.location.search);
const url = decodeURIComponent(urlParams.get('url'));

if (!url) top.location.href = browser.runtime.getURL("images/icon.png");

if (confirm('Rick Roll Link Detected, Continue?')) {
    browser.runtime.sendMessage({
        url: top.location.href,
        head: 'ignoreLink',
        content: url
    }).then(() => {
        top.location.href = url;
    });
} else {
    history.go(-2);
}