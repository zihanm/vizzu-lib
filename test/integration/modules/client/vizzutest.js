function catchError(err) {
    console.error(err)
    window.testData = { result: 'ERROR', description: err.toString() };
}

function digestMessage(message) {
    return crypto.subtle.digest('SHA-256', message).then(hashBuffer => {
        let hashArray = Array.from(new Uint8Array(hashBuffer));
        let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex.substring(0,7);
    });  
}

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let testCase = urlParams.get('testCase');
let vizzuUrl = urlParams.get('vizzuUrl');
let testData = { result: 'FINISHED', seeks: [], images: [], hashes: [], references: [] };

import(vizzuUrl + '/vizzu.js').then((vizzuModule) => {
    var Vizzu = vizzuModule.default;
    return import('/test/integration/test_cases/' + testCase + '.mjs').then((testCasesModule) => {
        return fetch('/test/integration/test_cases/' + testCase + '.json')
            .then(response => {
                let hashList = [];
                console.log(response)
                if (response.status == 404) {
                    let hashListDefItem = { "20%": "", "40%": "", "60%": "", "80%": "", "100%": "" };
                    for (let i = 0; i < testCasesModule.default.length; i++) {
                        hashList.push(hashListDefItem);
                    }
                    return hashList;
                } else {
                    hashList = response.json();
                    return hashList;
                }
            }).then(hashList => {
                let chart = new Vizzu('vizzuCanvas');
                return chart.initializing.then((chart) => {
                    let promise = Promise.resolve(chart);
                    let promises = [];
                    for (let i = 0; i < testCasesModule.default.length; i++) {
                        promise = promise.then((chart) => {
                            let prom = testCasesModule.default[i](chart)
                            let anim = chart.animation;
                            anim.pause();
                            let seeks = Object.keys(hashList[i])
                            seeks.sort(function(a, b) {
                                return parseInt(a.replace('%', '')) - parseInt(b.replace('%', ''));
                            });
                            testData.seeks[i] = [];
                            testData.images[i] = [];
                            testData.hashes[i] = [];
                            testData.references[i] = [];
                            seeks.forEach(key => {
                                let seek = key.replace('%', '') + '%'
                                testData.seeks[i].push(seek);
                                testData.references[i].push(hashList[i][key]);
                                anim.seek(seek);
                                chart.render.updateFrame(true);
                                let canvasElement = document.getElementById('vizzuCanvas');
                                let dataURL = canvasElement.toDataURL();
                                testData.images[i].push(dataURL);
                                let ctx = canvasElement.getContext('2d');
                                let digestData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
                                let digest = digestMessage(digestData.data.buffer.slice());
                                digest = digest.then(digestBuffer => {
                                    testData.hashes[i].push(digestBuffer);
                                });
                                promises.push(digest);
                            });
                            anim.play();
                            return prom 
                        });
                    }
                    return promise.then(() => {
                        return Promise.all(promises).then(() => {
                            if (typeof window.testData === 'undefined') {
                                window.testData = testData;
                            }
                        });
                    });
                });
            });
    });
}).catch((err) => { catchError(err) });
