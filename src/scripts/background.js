fetch().then(res => res.json()).then(json => {
    throw json;
});