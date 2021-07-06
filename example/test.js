//import Vizzu from 'https://vizzu-lib-main.storage.googleapis.com/lib/vizzu.js';
import Vizzu from './lib/vizzu.js';


function digestMessage(message) {
    return new Promise(resolve => {
        let msgUint8 = new TextEncoder().encode(message);
        crypto.subtle.digest('SHA-256', msgUint8).then(hashBuffer => {
            let hashArray = Array.from(new Uint8Array(hashBuffer));
            let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            resolve(hashHex);
        })
    });
}


let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let testCase = urlParams.get('testCase');
let status = 'PASSED';

import('./testCases/' + testCase).then((module) => {
    let chart = new Vizzu('vizzuCanvas');
    chart.initializing.then((chart) => {
        let promise = Promise.resolve(chart);
        let promises = [];
        for (let i = 0; i < module.default.testSteps.length; i++) {
            promise = promise.then((chart) => {
                let prom = module.default.testSteps[i].task(chart)
                let anim = chart.animation;
                anim.pause();
                let seeks = Object.keys(module.default.testSteps[i]['ref'])
                seeks.sort(function(a, b) {
                    return parseInt(a.replace('%', '')) - parseInt(b.replace('%', ''));
                });
                seeks.forEach(key => {
                    let seek = key.replace('%', '') + '%'
                    let hash = module.default.testSteps[i]['ref'][key]
                    anim.seek(seek);
                    chart.render.updateFrame(true);
                    let cavasElement = document.getElementById('vizzuCanvas');
                    let dataURL = cavasElement.toDataURL();
                    let digest = digestMessage(dataURL);
                    promises.push(digest);
                    digest.then(digestBuffer => {
                        if (hash == digestBuffer) {
                            console.log(testCase + ' : ' + i + ' : ' + seek + ' : ' + 'PASSED');
                        } else {
                            status = 'FAILED';
                            console.error(testCase + ' : ' + i + ' : ' + seek + ' : ' + 'FAILED' + ' : ' + digestBuffer);
                        }
                    });
                });
                anim.play();
                return prom 
            })
        }
        promise.then(() => {
            Promise.all(promises).then(() => {
                window.result = status;
            })
        })
    })
})
