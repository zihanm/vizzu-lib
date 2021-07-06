
const testData = {
    series: [
        {
            name: 'Colors',
            type: 'categories',
            values: ['red', 'green', 'blue']
        },
        {
            name: 'Val',
            type: 'values',
            values: [ 3, 5, 4 ]
        }
    ]
};

const testSteps = [
    { task: chart => chart.animate(
        {
            data: testData,
            descriptor : {
                channels: {
                    x: { attach: [ 'Colors'] },
                },
                title: null,
                legend: null,
            }
        }),
        ref: {
            '20%': 'b23b7753d80c845a2c73ded851694476a017c2201a1fcfe60917c357fded506a',
            '40%': '77fff225205652a45643e9cbb00c8cb9a96a5353523f6aea7ad836c381c006ba',
            '60%': '76ac9df557822e44311da4f986538f763fa3adf430a9062ec9493e46650f729a',
            '80%': 'fd9ed9552d8464dbae1076945077dda67366da0bc6d193766619fcbab8ce8534',
            '100%': '2168df8f369a1d34def4ebe8c984a59ae7fc77908651a91ec74bde54dd679fa8',
        }},
    { task: chart => chart.animate(
        {
            data: {
                filter: record => record.Colors != 'blue'
            },
            descriptor : {
                channels: {
                    x: { detach: [ 'Colors'] },
                    y: { attach: [ 'Colors' ]}
                },
            }
        }),
        ref: {
            '20%': '7e5767fced76b27f43f72586cff3bc7c187ca8f7341561a18047769bfec3fa88',
            '40%': '93ec221cd7d171fdff9c6e01a567ee2bd9c8ccf9a07dc43f0133c89712a1b10d',
            '60%': '86795c363c629e6f64ac2a4b6a4e540ff192fe70dbbc6f2dbab3b59e6360fb4f',
            '80%': '4dcf978a7345ec99b9f4152d40d15c45199c1f44f182c7283eddc9e25a246703',
            '100%': '962f5050e4554ee4af191122f89f847be320fc2d8b4b8802545aea6f3eaab14a',
        }},
    { task: chart => chart.animate(
        {
            descriptor : {
                channels: {
                    color: { attach: [ 'Colors' ]}
                }
            }
        }),
        ref: {
            '20%': 'd30866a2283e2a8d0e51f1a2e168deb5158f6de22ce42fc9cd99dc707d6d0bfd',
            '40%': 'b768ea817b0d2625139e78dcc173f6617f73616490541025ac654ac3fd1948a2',
            '60%': 'beb5055db114a69713e9815703c8ea33cb8f8e35491d8d7aab19cb332a75a1eb',
            '80%': '69f3076aebe157acd1bc7c8db63717c7dfb6ca6132028a78126724f919c06c1e',
            '100%': '03656d7d68b94ab1141f4b874517fa3dd397791890f5eee4de22e8abcf79e1f6',
        }},
    { task: chart => chart.animate(
        {
            data: {
                filter: null
            },
            descriptor : {
                channels: {
                    color: { detach: [ 'Colors' ]},
                    lightness: { attach: [ 'Colors' ]}
                }
            }
        }),
        ref: {
            '20%': '3718c84cf3933fc1dfb333b96bf059b5ff40b8b423224a7aa797be9ce3dd50c5',
            '40%': '0ebf22017c9fe836cb371c95dd88a6b3db1766d9a4d70c75270d3aac2f34c779',
            '60%': '885768906a3c961796197013c45d70447e98bde6f9e7696863fe25dae047e42b',
            '80%': '2e037a2a9e7d81f75edb6f555ebc99dcc4c0166e901376b3168c82215517b173',
            '100%': '8f02437e355e3edb7dd0d0712526f53718707d448f214a0d08ec29598494c1a6',
        }},
    { task: chart => chart.animate(
        {
            descriptor : {
                channels: {
                    lightness: { detach: [ 'Colors' ]},
                    label: { attach: [ 'Colors' ]}
                }
            }
        }),
        ref: {
            '20%': '24faecf575757195f0bbab7067e7de6fcf7d979aabd6197c63b4ee350cf8a6b5',
            '40%': '1410ab16e5b1635c90aed987f0c87757e802e364670b85af2dfe65482f96d474',
            '60%': '1410ab16e5b1635c90aed987f0c87757e802e364670b85af2dfe65482f96d474',
            '80%': '1410ab16e5b1635c90aed987f0c87757e802e364670b85af2dfe65482f96d474',
            '100%': '2cd9496665e7f04d88c65dd23552faed7d0a2bcb3eacf7d1a67f85f1462694c4',
        }},
]


export default { testData, testSteps }
