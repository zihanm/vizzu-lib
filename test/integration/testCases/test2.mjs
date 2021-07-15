
const testData = {
    series: [
        {
            name: 'Colors',
            type: 'categories',
            values: ['red', 'green', 'yellow']
        },
        {
            name: 'Val',
            type: 'values',
            values: [ 3, 5, 4 ]
        }
    ]
};

const testSteps = [
    chart => chart.animate(
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
    chart => chart.animate(
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
    chart => chart.animate(
    {
        descriptor : {
            channels: {
                color: { attach: [ 'Colors' ]}
            }
        }
    }),
    chart => chart.animate(
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
    chart => chart.animate(
    {
        descriptor : {
            channels: {
                lightness: { detach: [ 'Colors' ]},
                label: { attach: [ 'Colors' ]}
            }
        }
    })
]


export default { testData, testSteps }
