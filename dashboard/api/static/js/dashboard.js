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

function plotView1(model, continent, period ) {
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
                  
                    //var chart = new google.charts.Line(document.getElementById('view1_plot'));  
                    //chart.draw(dataTable, google.charts.Line.convertOptions(options));
                    var chart = new google.visualization.LineChart(document.getElementById('view1_plot'))
                    chart.draw(dataTable, options);
                    //chart.setSelection([{row: 5, column: 2}]);
                })
                .catch(err => console.log(err));            

        })
        .catch(err => console.log(err));   
    });
}


$( document ).ready(() => {
    loadArima();
});


