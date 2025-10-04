
// TopCinema plugin for CloudStream
// Made by Nasscraft ❤️

const BASE_URL = "https://web6.topcinema.cam";

function getMainPage() {
    return [
        {
            name: "الأفلام",
            url: BASE_URL + "/home10/",
            type: "movies"
        }
    ];
}

function getVideoList(url) {
    let html = httpRequest(url);
    let links = [];
    let regex = /<iframe[^>]+src="([^"]+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
        links.push({
            name: "سيرفر",
            url: match[1],
            quality: "HD"
        });
    }
    return links;
}

function getSearchResults(query) {
    let html = httpRequest(BASE_URL + "/home10/");
    let regex = new RegExp(`<a[^>]+href="(${BASE_URL}[^"]+)"[^>]*>(.*?)</a>`, "g");
    let results = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
        if (match[2].toLowerCase().includes(query.toLowerCase())) {
            results.push({
                name: match[2],
                url: match[1],
                poster: ""
            });
        }
    }
    return results;
}
