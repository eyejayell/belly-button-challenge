const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// d3.json(url).then(function(data) {
//     console.log(data)
// });

// function demographics(sample) {
//     d3.json(url).then(function(data) {
//         let metadata = data.metadata

//     })
// }


function init() {
    let dropdown = d3.select("#selDataset");
    d3.json(url).then(function(data) {
        let names = data.names;
        names.forEach((element) => {
            dropdown.append("option").text(element).property("value", element);
        });
        // for(var i = 0; i < names.length; i++){
        //     var name = names[i];

        //     console.log(name)

        //     var option = document.createElement("option")
        //     option.text = name;
        //     option.value = name;

        //     dropdown.append(option);
        // }   
        sample = names[0];
        buildCharts(sample);
        buildMetadata(sample);
    })
}
init()

function buildCharts(dog) {
    console.log(dog)
    d3.json(url).then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter(x => x.id == dog);
        let result = resultArray[0];
        console.log(result);

        let layoutBar = {
            title: "Top 10 OTUs Found in Individual",
        }

        let dataBar = {
            x: result.sample_values.slice(0,10).reverse(),
            y: result.otu_ids.slice(0,10).map(id => `OTU${id}`).reverse(),
            type: "bar",
            text: result.otu_labels.slice(0,10).reverse(),
            orientation: "h"

        }

        Plotly.newPlot("bar", [dataBar], layoutBar);

        let layoutBubble = {

        }

        let dataBubble = {
            x: result.otu_ids,
            y: result.sample_values,
            text: result.otu_labels,
            mode: "markers",
            marker: {
                size: result.sample_values,
                color: result.otu_ids,
            }
        }

        Plotly.newPlot("bubble", [dataBubble], layoutBubble)
    })

}

function buildMetadata(cat) {
    console.log(cat)
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let resultArray = metadata.filter(x => x.id == cat);
        let result = resultArray[0];
        console.log(result);

        let PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append('h6').text(`${key}: ${value}`);
        })
        
    })
}

function optionChanged(giraffe) {
    buildCharts(giraffe);
    buildMetadata(giraffe);
};

// init()
    // function barChart(sample) {
//     d3.json(url).then(function(data {

//     }))
// }

// function buildCharts() {
//     d3.json(url).then(function(data) {
//         let samples = data.samples
//         let otuValues = samples.sample_values
//         let otuIDs = samples.otu_ids
//         console.log(samples)
//         let trace1 = {
//             title: "Top 10 OTUs Found in Selected Individual",
//             x: otuValues,
//             y: otuIDs,
//             type: 'bar'
//         };
//         let plotData = [trace1]
//         Plotly.newPlot('bar', plotData)
//     })
// }

// buildCharts()

// function buildCharts() {
//     d3.json(url).then(function(data) {
//     for (let i = 0; i < data.length; i++) {
//         let samples = data.samples;
        
//         console.log(samples[0])

//     }
// })
// }

// buildCharts()