
document.querySelector('#selectContinental').addEventListener('change', (e) => {
    let period = document.querySelector('#selectPeriod');

    plotView1(period[period.selectedIndex].value, e.target.id);
});


document.querySelector('#selectContinentalCompare').addEventListener('change', (e) => {
    let period = document.querySelector('#selectPeriod');

    plotView1(period[period.selectedIndex].value, e.target.id);
});

document.querySelector('#selectPeriod').addEventListener('change', (e) => {
    
    let period = e.target;    

    plotView1(period[period.selectedIndex].value);
});


document.querySelector('#selectSector').addEventListener('change', (e) => {
    let period = document.querySelector('#selectSectorPeriod');

    plotView2(period[period.selectedIndex].value, e.target.id);
});

document.querySelector('#selectSectorCompare').addEventListener('change', (e) => {
    let period = document.querySelector('#selectSectorPeriod');

    plotView2(period[period.selectedIndex].value, e.target.id);
});

document.querySelector('#selectSectorPeriod').addEventListener('change', (e) => {
    
    let period = e.target;    

    plotView2(period[period.selectedIndex].value);
});


document.querySelector('#selectGas').addEventListener('change', (e) => {
    let period = document.querySelector('#selectGasPeriod');

    plotView3(period[period.selectedIndex].value, e.target.id);
});

document.querySelector('#selectGasCompare').addEventListener('change', (e) => {
    let period = document.querySelector('#selectGasPeriod');

    plotView3(period[period.selectedIndex].value, e.target.id);
});

document.querySelector('#selectGasPeriod').addEventListener('change', (e) => {
    
    let period = e.target;    

    plotView3(period[period.selectedIndex].value);
});

document.querySelector('#floor_area').addEventListener('change', (e) => {
    plotView4();
});

document.querySelector('#selectLRRecords').addEventListener('change', (e) => {
    
    plotView4();
});

