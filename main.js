
var m3u8Input = document.getElementById("m3u8url");
var m3u8ContextInput = document.getElementById("m3u8Context");
var baseUrlInput = document.getElementById("baseurl");
var progressSpan = document.getElementById("progress");
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
    m3u8Input.value = "";
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
    progressSpan.innerHTML = `下载中……`;
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

    const arrayBuffers = [];
    for (let i = 0; i < urls.length; i++) {
        await downloadTs(urls[i],i,urlCount, fileNameLength,arrayBuffers);
        progressSpan.innerHTML = `下载中……${((i+1) / urls.length * 100).toFixed(2)}%`;
    }
    let mergedBuffer = mergeArrayBuffers(arrayBuffers);
    console.log(mergedBuffer);
    downloadFile(new Blob([mergedBuffer]),"download.mp4");

    console.log('下载完毕');
};

function mergeArrayBuffers(arrayBuffers) {
    // 计算新的ArrayBuffer的总长度
    let totalLength = 0;
    for (const buffer of arrayBuffers) {
      totalLength += buffer.byteLength;
    }
  
    // 创建一个新的ArrayBuffer
    const mergedBuffer = new ArrayBuffer(totalLength);
  
    // 创建一个Uint8Array以便操作新的ArrayBuffer
    const uint8Array = new Uint8Array(mergedBuffer);
  
    let offset = 0;
    // 逐个复制ArrayBuffer到新的ArrayBuffer中
    for (const buffer of arrayBuffers) {
      const sourceArray = new Uint8Array(buffer);
      uint8Array.set(sourceArray, offset);
      offset += sourceArray.length;
    }
  
    return mergedBuffer;
  }

async function downloadTs(url, index, total,fileNameLength, arrayBuffers) {

    return new Promise((resolve, reject) => {
        fetch(baseUrl + url,{
            method: 'GET',
            mode: 'cors',
        }).then((res) => res.blob()).then(async (data) => {
            console.log(`downloaded ts from url:${baseUrl + url},size:${data.size}, ${index}/${total}`);
            let buffer = await data.arrayBuffer();
            arrayBuffers.push(buffer);
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
        downloadFile(blob, fileName);
    })

}

function downloadFile(blob, fileName){
    const a = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
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
    if (keyUrl && keyUrl.length > 0 && keyUrl.indexOf("http") != 0) {
        if (keyUrl[0] === '/') keyUrl = keyUrl.slice(1);
        keyUrl = baseUrl + keyUrl;
    }
    window.open(keyUrl,"_self");
    console.log(`key downloaded from ${keyUrl}`);
}