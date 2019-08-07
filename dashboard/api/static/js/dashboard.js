var plot = [];

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

    plotBuidlingLinearRegression();
}

function plotBuidlingLinearRegression(withFloorPlan) {
    loadData(APP_BASEURL.concat(`/buildings/${(withFloorPlan?"floorarea":"nofloorarea")}`))
        .then(data => {
            test_data = [];
            train_data = [];
            xs = [];

            i = 1;
            data["result"].forEach(item => {
                test_data.push(item.Real);
                train_data.push(item.Predict);
                xs.push(i++);
            });

            let canvas = document.querySelector("#linear_regression_plot").getContext("2d");

            if (plot[8]) plot[8].destroy();

            plot[8] = new Chart( canvas, {
                type: 'line',                        
                data: {
                    labels : xs,                            
                    datasets: [{
                        label : 'Train',
                        backgroundColor: 'rgb(0, 0, 255)',
                        fill: false,
                        borderColor: 'rgb(0, 0, 255)',
                        data: train_data
                    },{
                        label : "Test",
                        backgroundColor: 'rgb(255, 0, 0)',
                        fill: false,
                        borderColor: 'rgb(255, 0, 0)',
                        data: test_data
                    }
                ]
                },
                options: {
                    title: {
                        display : true,
                        text: "Linear Regression", // ": Complete" when Floor Area checked, ": Without Floor Area" when unchecked
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
            })
        });

    loadData(APP_BASEURL.concat(`/buildings/${(withFloorPlan?"floorarea":"nofloorarea")}/score`))
        .then(data => {
            document.querySelector("#linear_regression_test_score").innerHTML = data["result"][0].Test;
            document.querySelector("#linear_regression_train_score").innerHTML = data["result"][0].Train;
        })
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
                continent: selectContinental[selectContinental.selectedIndex].value            
            },
            {
                code : 'cep',
                description : 'Production',
                container : 'view2_plot',
                index: 1,
                continent: selectContinental[selectContinental.selectedIndex].value
            },
            {
                code : 'cec',
                description : 'Consumption',
                container : 'view3_plot',
                index: 2,
                continent: selectContinentalCompare[selectContinentalCompare.selectedIndex].value            
            },
            {
                code : 'cep',
                description : 'Production',
                container : 'view4_plot',
                index: 3,
                continent: selectContinentalCompare[selectContinentalCompare.selectedIndex].value
            }
        ];
    } else if ( componentTrigger === 'selectContinental') {
        models = [
            {
                code : 'cec',
                description : 'Consumption',
                container : 'view1_plot',
                index: 0,
                continent: selectContinental[selectContinental.selectedIndex].value            
            },
            {
                code : 'cep',
                description : 'Production',
                container : 'view2_plot',
                index: 1,
                continent: selectContinental[selectContinental.selectedIndex].value
            }
        ];
    } else if ( componentTrigger === 'selectContinentalCompare') {
        models = [
            {
                code : 'cec',
                description : 'Consumption',
                container : 'view3_plot',
                index: 2,
                continent: selectContinentalCompare[selectContinentalCompare.selectedIndex].value            
            },
            {
                code : 'cep',
                description : 'Production',
                container : 'view4_plot',
                index: 3,
                continent: selectContinentalCompare[selectContinentalCompare.selectedIndex].value
            }
        ];
    }

    models.forEach(model => {
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
                                backgroundColor: 'rgb(143, 165, 201)',
                                fill: false,
                                borderColor: 'rgb(143, 165, 201)',
                                data: r_data
                            },
                            {
                                label : 'Arima',
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
                                        labelString: 'British Thermal Unit(Btu)'
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
                                label : 'Arima',
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
                                        labelString: 'British Thermal Unit(Btu)'
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
                                backgroundColor: 'rgb(143, 165, 201)',
                                fill: false,
                                borderColor: 'rgb(143, 165, 201)',
                                data: r_data
                            },
                            {
                                label : 'Arima',
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
                                        labelString: 'British Thermal Unit(Btu)'
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


$( document ).ready(() => {
    init();
});


