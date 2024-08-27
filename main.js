
var m3u8Input = document.getElementById("m3u8url");
var m3u8ContextInput = document.getElementById("m3u8Context");
var baseUrlInput = document.getElementById("baseurl");
// m3u8内容
let m3u8FileContext = "";
let baseUrl = "";
var tss = [];

!function init() {
    m3u8ContextInput.addEventListener("input", function (e) {
        m3u8FileContext = m3u8ContextInput.value;
    })
    baseUrlInput.addEventListener("input", function (e) {
        baseUrl = baseUrlInput.value;
    })
    m3u8Input.value = "https://cdn77-vid.xvideos-cdn.com/H4bk_OWgoc7xFUcjk5Oc2Q==,1724779997/videos/hls/2a/3f/fd/2a3ffdaf8c5c5d86560d7da3a66cb802/hls-1080p-cbc05.m3u8";
    baseUrlInput.value = ""
    // onGetM3U8BtnClick();
}();

function getM3U8File(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status === 200) {
            m3u8FileContext = xhr.response;
            m3u8ContextInput.value = m3u8FileContext;
        }
    }
    xhr.send();
}
function onGetM3U8BtnClick(e) {
    if (typeof m3u8Input.value === "string" && m3u8Input.value.length > 0) {
        m3u8FileContext = getM3U8File(m3u8Input.value);
        getBaseUrl(m3u8Input.value);
    }
}

async function onDownloadTsBtnClick() {
    let urls = [];
    w = /#EXTINF:(\d*(?:\.\d+)?)(?:,(.*)\s+)(\S*)?/g;
    for (var i = w.lastIndex; null != (o = w.exec(m3u8FileContext));) {
        // console.log(o);
        if (o[3]) {
            urls.push(o[3])
        }
    }
    baseUrl = baseUrlInput.value || "";
    let urlCount = urls.length;

    console.log(`ts count:${urlCount}`);
    let fileNameLength = `${urlCount}`.length;
    downloadKey();
    let tasks = [];
    for (let i = 0; i < urls.length; i++) {
        await downloadTs(urls[i],i,urlCount, fileNameLength);
        
        // tasks.push((function (url, i, length) {
        //     return new Promise((reslove, reject) => {
        //         downloadTs(url, i, urlCount).then((ts) => saveTsFile(ts, i + 1, length).then(reslove('')));
        //     })
        // })(urls[i], i, length));
    }
    console.log(tasks);
    Promise.all(tasks).then(() => {
        console.log('下载完毕');
    })
    // downloadTss();
};

async function downloadTss() {
    let length = `${tss.length}`.length;
    for (var i = 0; i < tss.length; i++) {
        await saveTsFile(tss[i], i + 1, length);
    }
    tss.length = 0;
}

async function downloadTs(url, index, total,fileNameLength) {

    return new Promise((resolve, reject) => {
        fetch(baseUrl + url).then((res) => res.blob()).then(async (data) => {
            // tss.push(data);
            console.log(`downloaded ts from url:${baseUrl + url},size:${data.size}, ${index}/${total}`);
            await saveTsFile(data,index+1,fileNameLength);
            resolve(data);
        })
    })

}

async function saveTsFile(blob, index, length) {
    return new Promise((reslove, reject) => {
        if (blob.size <= 0) resolve('');
        let fileName = ("" + index).padStart(length, "0");
        console.log(`保存文件 ${fileName}.ts`);
        // let file = new Blob([context],{type:"video/mp2t"});
        const a = document.createElement("a");
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `${fileName}.ts`;
        a.click();
        URL.revokeObjectURL(objectUrl);
        setTimeout(() => {
            reslove('');
        }, 100)
    })

}

function getBaseUrl(url){
    if(typeof url == 'string'){
        let rindex = url.lastIndexOf('/');
        if(rindex > 0){
            baseUrlInput.value = url.substring(0,rindex + 1);
        }
    }
}

async function downloadKey() {
    let r = /(?:#EXT-X-(KEY):(.+))/g;
    let o = r.exec(m3u8FileContext);
    if (!o || !o[2]) return;
    let attr = new AttrList(o[2]);
    let keyUrl = attr.URI;
    let iv = attr.IV;
    if (keyUrl && keyUrl.length > 0 && keyUrl.indexOf("http") != 0 && keyUrl.includes(".key")) {
        if (keyUrl[0] === '/') keyUrl = keyUrl.slice(1);
        keyUrl = baseUrl + keyUrl;
    }
    window.open(keyUrl);
    console.log(`key downloaded from ${keyUrl}`);
}