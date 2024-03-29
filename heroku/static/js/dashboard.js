var plot = [];

const continentScales = {
    'africa' : {
        upper: 40,
        lower: 5
    },
    'asia_oceania' : {
        upper: 300,
        lower: 0
    },
    'central_south_america' : {
        upper: 40,
        lower: 10
    },
    'eurasia' : {
        upper : 85,
        lower : 35
    },
    'europe' : {
        upper : 90,
        lower : 40
    },
    'middle_east' : {
        upper : 120,
        lower : 0
    },
    'north_america' : {
        upper: 140,
        lower : 80
    },    
    'world' : {
        upper : 700,
        lower : 250
    }
};

const defaultAnimation = {
    'startup': true,
    duration: 500,
    easing: 'out'    
}

const defaultDimensions = {
    height: 400,
    width: 1400
}

const loadData = async (endpoint) => {
    let headers = new Headers();
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        redirect: 'follow'
      }
    });
  
    if ( response.status !== 200) {
      throw new Error('Error loading data');
    };
  
    return await response.json();
}

function init() {
    String.prototype.capitalize = function() {
        return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };
    
    let model = 'cec';
    let period = document.querySelector('#selectPeriod');
    let periodSector = document.querySelector('#selectSectorPeriod');

    loadData(APP_BASEURL.concat(`/${model}/get_continents`))
        .then(data => {
            let selectContinental = document.querySelector('#selectContinental');
            let selectContinentalCompare = document.querySelector('#selectContinentalCompare');

            data['result'].forEach(item => {
                let continent = document.createElement('option');
                let continentCompare = document.createElement('option');

                continent.value = item;
                continent.textContent = item.replace(/_/g,' ').capitalize();
                
                continentCompare.value = item;
                continentCompare.textContent = item.replace(/_/g,' ').capitalize();

                // In Continents dropdown menu, add "&": from "Central South America" to "Central & South America".
                // ugly code implementation...
                if (continent.textContent === 'Central South America') continent.textContent = 'Central & South America';
                if (continentCompare.textContent === 'Central South America') continentCompare.textContent = 'Central & South America';

                selectContinental.appendChild(continent);
                selectContinentalCompare.appendChild(continentCompare);
            });

            plotView1(period[period.selectedIndex].value);            

        })
        .catch(err => console.log(err));    

    loadData(APP_BASEURL.concat('/emmissions/get_sectors'))
        .then(data => {
            let sectors = document.querySelector('#selectSector');
            let sectorsCompare = document.querySelector('#selectSectorCompare');

            data['result'].forEach(item => {
                let sector = document.createElement('option');
                let sectorCompare = document.createElement('option');

                sector.value = item;
                sector.textContent = item.replace(/_/g,' ').capitalize();

                sectorCompare.value = item;
                sectorCompare.textContent = item.replace(/_/g,' ').capitalize();

                // Annie change - In Sector dropdown menu, capitalize "S" in "Us Territories".
                // ugly code implementation...
                if (sector.textContent === 'Us Territories') sector.textContent = 'US Territories';
                if (sectorCompare.textContent === 'Us Territories') sectorCompare.textContent = 'US Territories';


                sectors.appendChild(sector);
                sectorsCompare.appendChild(sectorCompare);
            });

            plotView2(periodSector[periodSector.selectedIndex].value);
        })
        .catch(err => console.log(err));

    loadData(APP_BASEURL.concat('/gases/get_gases'))
        .then(data => {
            let gases = document.querySelector('#selectGas');
            let gasesCompare = document.querySelector('#selectGasCompare');

            data['result'].forEach(item => {
                let gas = document.createElement('option');
                let gasCompare = document.createElement('option');

                gas.value = item;
                gas.textContent = item.replace(/_/g,' ').capitalize();

                gasCompare.value = item;
                gasCompare.textContent = item.replace(/_/g,' ').capitalize();

                gases.appendChild(gas);
                gasesCompare.appendChild(gasCompare);
            });

            plotView3(periodSector[periodSector.selectedIndex].value);
        })
        .catch(err => console.log(err));   
        
    plotView4();
}

function plotView1(period, componentTrigger) {

    let models = [];

    let selectContinental = document.querySelector('#selectContinental');
    let selectContinentalCompare = document.querySelector('#selectContinentalCompare');
    
    if (componentTrigger === undefined) {
        models = [
            {
                code : 'cec',
                description : 'Consumption',
                container : 'view1_plot',
                index: 0,
                continent: selectContinental[selectContinental.selectedIndex].value,
                color: 'rgb(255, 159, 64)',
                y:0

            },
            {
                code : 'cep',
                description : 'Production',
                container : 'view2_plot',
                index: 1,
                continent: selectContinental[selectContinental.selectedIndex].value,
                color: 'rgb(143, 165, 201)',
                y:0

            },
            {
                code : 'cec',
                description : 'Consumption',
                container : 'view3_plot',
                index: 2,
                continent: selectContinentalCompare[selectContinentalCompare.selectedIndex].value,
                color: 'rgb(255, 159, 64)',
                y:0
            },
            {
                code : 'cep',
                description : 'Production',
                container : 'view4_plot',
                index: 3,
                continent: selectContinentalCompare[selectContinentalCompare.selectedIndex].value,
                color: 'rgb(143, 165, 201)',
                y:0
            }
        ];
    } else if ( componentTrigger === 'selectContinental') {
        models = [
            {
                code : 'cec',
                description : 'Consumption',
                container : 'view1_plot',
                index: 0,
                continent: selectContinental[selectContinental.selectedIndex].value,
                color: 'rgb(255, 159, 64)',
                y:0
            },
            {
                code : 'cep',
                description : 'Production',
                container : 'view2_plot',
                index: 1,
                continent: selectContinental[selectContinental.selectedIndex].value,
                color: 'rgb(143, 165, 201)',
                y:0
            }
        ];
    } else if ( componentTrigger === 'selectContinentalCompare') {
        models = [
            {
                code : 'cec',
                description : 'Consumption',
                container : 'view3_plot',
                index: 2,
                continent: selectContinentalCompare[selectContinentalCompare.selectedIndex].value,
                color: 'rgb(255, 159, 64)',
                y:0
            },
            {
                code : 'cep',
                description : 'Production',
                container : 'view4_plot',
                index: 3,
                continent: selectContinentalCompare[selectContinentalCompare.selectedIndex].value,
                color: 'rgb(143, 165, 201)',
                y:0
            }
        ];
    }

    models.forEach((model) => {
        loadData(APP_BASEURL.concat(`/${model.code}/get_actual_consumption/${model.continent}`))
        .then(data_real => {

            let container = model.container;
            let labels = [];
            let r_data = [];            

            data_real['result'].forEach(item => {
                labels.push(item.x);
                r_data.push(item.y);
            });

            const last_real_year = labels[labels.length -1];

            loadData(APP_BASEURL.concat(`/${model.code}/get_prediction/${model.continent}/${period}/arima`))
                .then(data_predict => {

                    let p_data = [];
                    let e_data = []

                    data_predict['result'].forEach(models => {
                        if (models.hasOwnProperty('arima')) {
                            r_data.forEach(item => p_data.push(null));
                            p_data[p_data.length -1] = r_data[r_data.length -1];                    
                            
                            models['arima'].forEach(item => {
                                if (!labels.includes(item.x)) labels.push(item.x);
                                p_data.push(item.y);
                            });

                        } else if (models.hasOwnProperty('exponential')) {
                            r_data.forEach(item => e_data.push(null));
                            e_data[e_data.length -1] = r_data[r_data.length -1];                    
                            
                            models['exponential'].forEach(item => {
                                if (!labels.includes(item.x)) labels.push(item.x);
                                e_data.push(item.y);
                            });
                        }
                    });

                    let canvas = document.querySelector(`#${container}`).getContext('2d');

                    if (plot[model.index]) plot[model.index].destroy();

                    plot[model.index] = new Chart( canvas, {
                        type: 'line',                        
                        data: {
                            labels : labels,                            
                            datasets: [{
                                label : model.description,
                                backgroundColor: model.color,
                                fill: false,
                                borderColor: model.color,
                                data: r_data
                            },
                            {
                                label : 'ARIMA',
                                backgroundColor: 'rgb(255, 99, 132)',
                                fill: false,
                                borderColor: 'rgb(255, 99, 132)',
                                data: p_data
                            }/*,
                            {
                                label : 'Exponential smoothing',
                                backgroundColor: 'rgb(75, 192, 192)',
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                data: e_data
                            },*/
                        ]
                        },
                        options: {
                            title: {
                                display : true,
                                text: model.description,
                                fontSize: 16,
                                fontStyle: 'bold',
                                position: 'top'
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            annotation: {
                                annotations: [
                                  {
                                    type: "line",
                                    mode: "vertical",
                                    scaleID: "x-axis-0",
                                    value: last_real_year,
                                    borderColor: "black",
                                    label: {
                                      content: "forecast",
                                      enabled: true,
                                      position: "top"
                                    }
                                  }
                                ]
                            },
                            scales : {
                                yAxes : [{
                                    scaleLabel: {
                                        display : true,
                                        labelString: 'British termal unit (Btu)'                                        
                                    },
                                    ticks : {
                                        min: continentScales[model.continent].lower,
                                        max: continentScales[model.continent].upper
                                    }
                                }]
                            }

                        
                        }
                    });
                })
                .catch(err => console.log(err));
            
        } )
        .catch(err => console.log(err));


    });

}

function plotView2(period, componentTrigger) {

    let models = [];

    let selectSector = document.querySelector('#selectSector');
    let selectSectorCompare = document.querySelector('#selectSectorCompare');

    if (componentTrigger === undefined) {
        models = [
            {
                description: 'Emissions',
                code: 'emmissions',
                container : 'view5_plot',
                index: 4,
                sector: selectSector[selectSector.selectedIndex].value            
            },
            {
                description: 'Emissions',
                code: 'emmissions',
                container : 'view6_plot',
                index: 5,
                sector: selectSectorCompare[selectSectorCompare.selectedIndex].value            
            }
        ];

    } else if ( componentTrigger === 'selectSector') {
        models = [
            {
                description: 'Emissions',
                code: 'emmissions',
                container : 'view5_plot',
                index: 4,
                sector: selectSector[selectSector.selectedIndex].value            
            }
        ];

    } else if (componentTrigger === 'selectSectorCompare') {
        models = [
            {
                description: 'Emissions',
                code: 'emmissions',
                container : 'view6_plot',
                index: 5,
                sector: selectSectorCompare[selectSectorCompare.selectedIndex].value            
            }
        ];
    }

    models.forEach(model => {
        loadData(APP_BASEURL.concat(`/${model.code}/get_actual_consumption/${model.sector}`))            
        .then(data_real => {

            let container = model.container;
            let labels = [];
            let r_data = [];            

            data_real['result'].forEach(item => {
                labels.push(item.x);
                r_data.push(item.y);
            });
            
            const last_real_year = labels[labels.length -1];

            loadData(APP_BASEURL.concat(`/${model.code}/get_prediction/${model.sector}/${period}/arima`))
                .then(data_predict => {

                    let p_data = [];
                    let e_data = []

                    data_predict['result'].forEach(models => {
                        if (models.hasOwnProperty('arima')) {
                            r_data.forEach(item => p_data.push(null));
                            p_data[p_data.length -1] = r_data[r_data.length -1];                    
                            
                            models['arima'].forEach(item => {
                                if (!labels.includes(item.x)) labels.push(item.x);
                                p_data.push(item.y);
                            });

                        } else if (models.hasOwnProperty('exponential')) {
                            r_data.forEach(item => e_data.push(null));
                            e_data[e_data.length -1] = r_data[r_data.length -1];                    
                            
                            models['exponential'].forEach(item => {
                                if (!labels.includes(item.x)) labels.push(item.x);
                                e_data.push(item.y);
                            });
                        }
                    });

                    let canvas = document.querySelector(`#${container}`).getContext('2d');

                    if (plot[model.index]) plot[model.index].destroy();

                    plot[model.index] = new Chart( canvas, {
                        type: 'line',                        
                        data: {
                            labels : labels,                            
                            datasets: [{
                                label : model.description,
                                backgroundColor: 'rgb(143, 165, 201)',
                                fill: false,
                                borderColor: 'rgb(143, 165, 201)',
                                data: r_data
                            },
                            {
                                label : 'ARIMA',
                                backgroundColor: 'rgb(255, 99, 132)',
                                fill: false,
                                borderColor: 'rgb(255, 99, 132)',
                                data: p_data
                            }/*,
                            {
                                label : 'Exponential smoothing',
                                backgroundColor: 'rgb(75, 192, 192)',
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                data: e_data
                            },*/
                        ]
                        },
                        options: {
                            title: {
                                display : true,
                                text: model.description,
                                fontSize: 16,
                                fontStyle: 'bold',
                                position: 'top'
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            annotation: {
                                annotations: [
                                  {
                                    type: "line",
                                    mode: "vertical",
                                    scaleID: "x-axis-0",
                                    value: last_real_year,
                                    borderColor: "black",
                                    label: {
                                      content: "forecast",
                                      enabled: true,
                                      position: "top"
                                    }
                                  }
                                ]
                            },
                            scales : {
                                yAxes : [{
                                    scaleLabel: {
                                        display : true,
                                        labelString: 'British termal unit (Btu)'
                                    }
                                }]
                            }

                        
                        }
                    });
                })
                .catch(err => console.log(err));
            
        } )
        .catch(err => console.log(err));


    });

}

function plotView3(period, componentTrigger) {

    let models = [];

    let gasSector = document.querySelector('#selectGas');
    let gasSectorCompare = document.querySelector('#selectGasCompare');

    if (componentTrigger === undefined) {
        models = [
            {
                description: 'Emissions',
                code: 'gases',
                container : 'view7_plot',
                index: 6,
                sector: gasSector[gasSector.selectedIndex].value            
            },
            {
                description: 'Emissions',
                code: 'gases',
                container : 'view8_plot',
                index: 7,
                sector: gasSectorCompare[gasSectorCompare.selectedIndex].value            
            }
        ];

    } else if ( componentTrigger === 'selectGas') {
        models = [
            {
                description: 'Emissions',
                code: 'gases',
                container : 'view7_plot',
                index: 6,
                sector: selectGas[selectGas.selectedIndex].value            
            }
        ];

    } else if (componentTrigger === 'selectGasCompare') {
        models = [
            {
                description: 'Emissions',
                code: 'gases',
                container : 'view8_plot',
                index: 7,
                sector: selectGasCompare[selectGasCompare.selectedIndex].value            
            }
        ];
    }

    models.forEach(model => {
        loadData(APP_BASEURL.concat(`/${model.code}/get_actual_consumption/${model.sector}`))            
        .then(data_real => {

            let container = model.container;
            let labels = [];
            let r_data = [];            

            data_real['result'].forEach(item => {
                labels.push(item.x);
                r_data.push(item.y);
            });
            
            const last_real_year = labels[labels.length -1];

            loadData(APP_BASEURL.concat(`/${model.code}/get_prediction/${model.sector}/${period}/arima`))
                .then(data_predict => {

                    let p_data = [];
                    let e_data = []

                    data_predict['result'].forEach(models => {
                        if (models.hasOwnProperty('arima')) {
                            r_data.forEach(item => p_data.push(null));
                            p_data[p_data.length -1] = r_data[r_data.length -1];                    
                            
                            models['arima'].forEach(item => {
                                if (!labels.includes(item.x)) labels.push(item.x);
                                p_data.push(item.y);
                            });

                        } else if (models.hasOwnProperty('exponential')) {
                            r_data.forEach(item => e_data.push(null));
                            e_data[e_data.length -1] = r_data[r_data.length -1];                    
                            
                            models['exponential'].forEach(item => {
                                if (!labels.includes(item.x)) labels.push(item.x);
                                e_data.push(item.y);
                            });
                        }
                    });

                    let canvas = document.querySelector(`#${container}`).getContext('2d');

                    if (plot[model.index]) plot[model.index].destroy();

                    plot[model.index] = new Chart( canvas, {
                        type: 'line',                        
                        data: {
                            labels : labels,                            
                            datasets: [{
                                label : model.description,
                                backgroundColor: 'rgb(75, 192, 192)',
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                data: r_data
                            },
                            {
                                label : 'ARIMA',
                                backgroundColor: 'rgb(255, 99, 132)',
                                fill: false,
                                borderColor: 'rgb(255, 99, 132)',
                                data: p_data
                            }/*,
                            {
                                label : 'Exponential smoothing',
                                backgroundColor: 'rgb(75, 192, 192)',
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                data: e_data
                            },*/
                        ]
                        },
                        options: {
                            title: {
                                display : true,
                                text: model.description,
                                fontSize: 16,
                                fontStyle: 'bold',
                                position: 'top'
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            annotation: {
                                annotations: [
                                  {
                                    type: "line",
                                    mode: "vertical",
                                    scaleID: "x-axis-0",
                                    value: last_real_year,
                                    borderColor: "black",
                                    label: {
                                      content: "forecast",
                                      enabled: true,
                                      position: "top"
                                    }
                                  }
                                ]
                            },
                            scales : {
                                yAxes : [{
                                    scaleLabel: {
                                        display : true,
                                        labelString: 'British termal unit (Btu)'
                                    }
                                }]
                            }

                        
                        }
                    });
                })
                .catch(err => console.log(err));
            
        } )
        .catch(err => console.log(err));


    });

}


function plotView4() {

    let floor = document.querySelector('#floor_area');
    let feature = floor.checked ? 'floor' : 'nofloor';
    let graphIndex = 8;
    const startArray = 1;

    let LRrecords = document.querySelector('#selectLRRecords');
    const endArray = LRrecords[LRrecords.selectedIndex].value;

    loadData(APP_BASEURL.concat(`/building_lr_pred/${feature}`))
        .then(data => {

            let labels = [];
            let r_data = [];
            let p_data = [];

            data['result'].forEach(item => {
                r_data.push(item.real);
                p_data.push(item.predict);
            });

            labels = data['result'].map((item, index) => index + 1);

            let canvas = document.querySelector('#view9_plot').getContext('2d');

            if (plot[graphIndex]) plot[graphIndex].destroy();

            plot[graphIndex] = new Chart( canvas, {
                type: 'line',
                data: {
                    labels : labels.slice(startArray, endArray),                            
                    datasets: [{
                        label : 'Train',
                        backgroundColor: 'rgb(12, 12, 218)',
                        fill: false,
                        borderColor: 'rgb(12, 12, 218)',
                        data: r_data.slice(startArray, endArray)
                    },
                    {
                        label : 'Test',
                        backgroundColor: 'rgb(246, 28, 28)',
                        fill: false,
                        borderColor: 'rgb(246, 28, 28)',
                        data: p_data.slice(startArray, endArray)
                    }]
                },
                options :{
                    title: {
                        display : true,
                        text: "LINEAR REGRESSION : Y = site EUI",
                        fontSize: 16,
                        fontStyle: 'bold',
                        position: 'top'
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            ticks: {
                                display: false
                            }
                        }]
                    }
                }
            });
        })
        .catch(err => console.log(err));

    loadData(APP_BASEURL.concat(`/building_lr_score/${feature}`))
        .then(data => {
            let testScore = document.querySelector('#lr_test_score');
            let trainScore = document.querySelector('#lr_train_score');

            data['result'].forEach(item => {

                testScore.textContent = `Test : ${Math.floor(item.test * 100)} %`
                trainScore.textContent = `Train : ${Math.floor(item.train * 100)} %`
            });            
        })
        .catch(err => console.log(err));

    loadData(APP_BASEURL.concat(`/building_fr_score/${feature}`))
        .then(data => {
            const testScore = document.querySelector('#fr_train_score');
            const trainScore = document.querySelector('#fr_test_score');

            data['result'].forEach (item => {
                trainScore.textContent = `Train : ${Math.floor(item.train * 100)} %`;
                testScore.textContent = `Test : ${Math.floor(item.test * 100)} %`;
            });
            
        })
        .catch(err => console.log(err));

    loadData(APP_BASEURL.concat(`/building_fr_weight/${feature}`))
        .then(data => {

            let frTBody = document.querySelector('#fr_tbody');
            frTBody.innerHTML = "";

            console.log(data['result']);

            data['result'].forEach(item => {
                frTBody.innerHTML += `
                    <tr>
                        <td> ${item.features} </td>
                        <td> ${item.weight} </td>
                    </tr>            
                `;
            });
           

            
        })
        .catch(err => console.log(err));
}



$( document ).ready(() => {
    init();
});


