var plot;

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

function loadArima() {
    String.prototype.capitalize = function() {
        return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };
    
    let model = document.querySelector('#selectModel');
    let period = document.querySelector('#selectPeriod');

    loadData(APP_BASEURL.concat(`/${model[model.selectedIndex].value}/get_continents`))
        .then(data => {
            let selectContinental = document.querySelector('#selectContinental');

            data['result'].forEach(item => {
                let continent = document.createElement('option');

                continent.value = item;
                continent.textContent = item.replace(/_/g,' ').capitalize();

                selectContinental.appendChild(continent);
            });

            plotView1(model[model.selectedIndex].value, selectContinental[selectContinental.selectedIndex].value, period[period.selectedIndex].value);
        })
        .catch(err => console.log(err));    
}

function G_plotView1(model, continent, period ) {
    google.charts.load("current", {packages:['corechart', 'line']});
    google.charts.setOnLoadCallback(() => {
        loadData(APP_BASEURL.concat(`/${model}/get_actual_consumption/${continent}`))
        .then(data_real => {

            let dataTable = new google.visualization.DataTable();
            dataTable.addColumn('number', 'Year');
            dataTable.addColumn('number', 'Consumption');
            dataTable.addColumn('number', 'Prediction');
            dataTable.addColumn({type: 'string', role: 'annotation'})

            data_real['result'].forEach(item => dataTable.addRow([item.x, item.y, null, null]));

            loadData(APP_BASEURL.concat(`/${model}/get_prediction/${continent}/${period}`))
                .then(data_predict => {
                    data_predict['result'].forEach(item => dataTable.addRow([item.x, null, item.y, null]));

                    let options = {
                        title : 'Arima Forecast Model',
                        titleTextStyle: { bold: true},
                        hAxis: {
                            title: 'Year',
                            format : ' ',
                            titleTextStyle: { bold: true }                            
                        },
                        legend : {
                            position: 'none'
                        },
                        vAxis: {
                            title: 'British Thermal Unit(Btu)',
                            titleTextStyle: { bold: true},
                            format: 'decimal'                            
                        },
                        crosshair: {
                            color: '#000',
                            trigger: 'focus'
                        },
                        annotations: {
                            style: 'line',
                            position: 'top'
                        },        
                        height:defaultDimensions.height,
                        width:defaultDimensions.width,                
                        backgroundColor: { 
                            fill:'transparent' 
                        },
                        animation: defaultAnimation
                    };
                  
                    var chart = new google.visualization.LineChart(document.getElementById('view1_plot'))
                    chart.draw(dataTable, options);
                })
                .catch(err => console.log(err));            

        })
        .catch(err => console.log(err));   
    });
}

function plotView1(model, continent, period) {
    
    loadData(APP_BASEURL.concat(`/${model}/get_actual_consumption/${continent}`))
        .then(data_real => {

            let container = 'view1_plot';
            let labels = [];
            let r_data = [];            

            data_real['result'].forEach(item => {
                labels.push(item.x);
                r_data.push(item.y);
            });
            
            const last_real_year = labels[labels.length -1];

            loadData(APP_BASEURL.concat(`/${model}/get_prediction/${continent}/${period}`))
                .then(data_predict => {

                    let p_data = [];
                    let serie = document.querySelector('#selectModel');


                    r_data.forEach(item => p_data.push(null));
                    p_data[p_data.length -1] = r_data[r_data.length -1];                    
                    
                    data_predict['result'].forEach(item => {
                        labels.push(item.x);
                        p_data.push(item.y);
                    });                            

                    let canvas = document.querySelector(`#${container}`).getContext('2d');

                    if (plot) plot.destroy();

                    plot = new Chart( canvas, {
                        type: 'line',                        
                        data: {
                            labels : labels,                            
                            datasets: [{
                                label : serie[serie.selectedIndex].text,
                                backgroundColor: 'rgb(143, 165, 201)',
                                fill: false,
                                borderColor: 'rgb(143, 165, 201)',
                                data: r_data
                            },
                            {
                                label : 'Forecast',
                                backgroundColor: 'rgb(255, 99, 132)',
                                fill: false,
                                borderColor: 'rgb(255, 99, 132)',
                                data: p_data
                            }]
                        },
                        options: {
                            title: {
                                display : true,
                                text: 'Arima Forecast Model',
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

}

$( document ).ready(() => {
    loadArima();
});


