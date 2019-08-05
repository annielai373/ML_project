
document.querySelector('#selectContinental').addEventListener('change', (e) => {
    let model = document.querySelector('#selectModel');
    let period = document.querySelector('#selectPeriod');

    plotView1(model[model.selectedIndex].value, e.target[e.target.selectedIndex].value, period[period.selectedIndex].value);
});

document.querySelector('#selectModel').addEventListener('change', (e) => {
    
    let continental = document.querySelector('#selectContinental');
    let model = e.target;
    let period = document.querySelector('#selectPeriod');
    

    plotView1(model[model.selectedIndex].value, continental[continental.selectedIndex].value, period[period.selectedIndex].value);
});

document.querySelector('#selectPeriod').addEventListener('change', (e) => {
    
    let continental = document.querySelector('#selectContinental');
    let model = document.querySelector('#selectModel');;
    let period = e.target;    

    plotView1(model[model.selectedIndex].value, continental[continental.selectedIndex].value, period[period.selectedIndex].value);
});