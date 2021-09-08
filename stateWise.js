// file reading 

let info_daily = []

let myChart1, myChart2, myChart3
    // AN,AP,AR,AS,BR,CH,CT,DN,DD,DL,GA,GJ,HR,HP,JK,JH,KA,KL,LA,LD,MP,MH,MN,ML,MZ,NL,OR,PY,PB,RJ,SK,TN,TG,TR,UP,UT,WB,UN
let tag_daily = {
    AN: 4,
    AP: 5,
    AR: 6,
    AS: 7,
    BR: 8,
    CH: 9,
    CT: 10,
    DN: 11,

    DL: 13,
    GA: 14,
    GJ: 15,
    HR: 16,
    HP: 17,
    JK: 18,
    JH: 19,
    KA: 20,
    KL: 21,
    LA: 22,
    LD: 23,
    MP: 24,
    MH: 25,
    MN: 26,
    ML: 27,
    MZ: 28,
    NL: 29,
    OR: 30,
    PY: 31,
    PB: 32,
    RJ: 33,
    SK: 34,
    TN: 35,

    TR: 37,
    UP: 38,
    UT: 39,
    WB: 40,
    TS: 41,


    dateYMD: 1,

    confirmed: 'Confirmed',
    recovered: 'Recovered',
    deceased: 'Deceased'
}

let current_stateCode = 'AN'

$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "https://data.covid19india.org/csv/latest/state_wise_daily.csv",
        dataType: "text",
        success: function(data) {
            processDailyData(data)
            manipDailyData()
        }
    });

});

function processDailyData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (let i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        // console.log(data)

        // if (data[0].charAt(0) != "[") {
        lines.push(data)
            // }

        // lines.push(data)
        // if (data.length == headers.length) {

        //     var tarr = [];
        //     for (var j = 0; j < headers.length; j++) {
        //         tarr.push(headers[j] + ":" + data[j]);
        //     }
        //     lines.push(tarr);
        // }
    }
    info_daily = lines
        // console.log(info[33][7])
        // console.log(info)
        // alert(lines);
}






















let info = []

let indexInfo = {
    state: 0,
    confirmed: 1,
    recovered: 2,
    deaths: 3,
    active: 4,
    lastUpdatedTime: 5,
    stateCode: 7
}

// file reading

$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "https://data.covid19india.org/csv/latest/state_wise.csv",
        dataType: "text",
        success: function(data) {
            processData(data)
            manipData()
        }
    });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (let i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        // console.log(data)

        if (data[0].charAt(0) != "[") {
            lines.push(data)
        }

        // lines.push(data)
        // if (data.length == headers.length) {

        //     var tarr = [];
        //     for (var j = 0; j < headers.length; j++) {
        //         tarr.push(headers[j] + ":" + data[j]);
        //     }
        //     lines.push(tarr);
        // }
    }
    info = lines
        // console.log(info[33][7])
        // console.log(info)
        // alert(lines);
}














// adding js 
let manipData = () => {
    let container = document.getElementById("stat-analysis")

    let node = (id, stateName, stateLastUpdateMonth, stateConfirmed, stateActive, stateRecovered, stateDeceased) => {
        return `<div id="${id}" class="history-item">
                                        <div class="history-icon">
                                            <span class="history-hex"></span>
                                            <img src="./img/stListIcon.svg" />
                                        </div>
                                        <div class="history-text">
                                            <h5>${stateName}</h5>
                                            <span>${stateLastUpdateMonth}<br></span>
                                            <span class="history-text-analysis-data" style="color: #ff063a;">Confirmed: ${stateConfirmed}</span>
                                            <span class="history-text-analysis-data" style="color: #007bff;">Active: ${stateActive}</span>
                                            <span class="history-text-analysis-data" style="color: #28a745">Recovered: ${stateRecovered}</span>
                                            <span class="history-text-analysis-data" style="color: #ffc107;">Deceased: ${stateDeceased}</span>
                                            <!-- <span class="history-text-analysis-data">Tested: 5.5Cr</span> -->
                                            <span class="history-text-analysis-data">Vaccine Dose Administered: 6.3Cr</span>
                                        </div>
                                    </div>`
    }



    for (let i = 1; i < info.length; i++) {
        let stateCode = info[i][indexInfo.stateCode]
        if (stateCode === undefined || info[i][indexInfo.state] === 'State Unassigned') {
            continue;
        }

        let test = node(info[i][indexInfo.stateCode], info[i][indexInfo.state], info[i][indexInfo.lastUpdatedTime], info[i][indexInfo.confirmed], info[i][indexInfo.active], info[i][indexInfo.recovered], info[i][indexInfo.deaths])
        container.insertAdjacentHTML('beforeend', test)

    }

    for (let i = 1; i < info.length; i++) {
        let stateCode = info[i][indexInfo.stateCode]
        if (stateCode === undefined || info[i][indexInfo.state] === 'State Unassigned') {
            continue;
        }
        document.getElementById(info[i][indexInfo.stateCode]).addEventListener('click', function() {
            current_stateCode = info[i][indexInfo.stateCode]
            myChart1.destroy()
            myChart2.destroy()
            myChart3.destroy()
            let container = document.getElementById('chart-set')
            container.innerHTML = ''
            manipDailyData()
        })
    }

}




let manipDailyData = () => {

    let container = document.getElementById('chart-set')

    let canvas1 = `<div class="history-chart-item">
                                        <canvas id="myChartConfirmed" style="width: 100%; height: 285px;"></canvas>
                                    </div>`

    container.insertAdjacentHTML('beforeend', canvas1)

    let ctx1 = document.getElementById('myChartConfirmed').getContext('2d');

    let displayData1 = []

    for (i = 0; i < info_daily.length; i++) {
        if (info_daily[i][2] === tag_daily.confirmed && info_daily[i][tag_daily[current_stateCode]] >= 0) {
            displayData1.push({
                x: info_daily[i][tag_daily.dateYMD],
                y: info_daily[i][tag_daily[current_stateCode]]
            })
        }
    }

    myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'CONFIRMED',
                data: displayData1,
                backgroundColor: [
                    'rgba(255, 6, 58, 0.2)'
                    // 'rgba(255, 99, 132, 0.2)',
                    // 'rgba(54, 162, 235, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 6, 58, 1)'
                    // 'rgba(255, 99, 132, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,

                },
                x: {
                    ticks: {
                        callback: function(value, index, values) {
                            return '';
                        }
                    }

                },

            },
            plugins: {
                // legend: {
                //     display: false
                // }
                tooltip: {
                    mode: 'nearest',
                    intersect: false
                }


            }
        }
    });

















    let canvas2 = `<div class="history-chart-item">
                                        <canvas id="myChartRecovered" style="width: 95%; height: 285px;"></canvas>
                                    </div>`

    container.insertAdjacentHTML('beforeend', canvas2)

    let ctx2 = document.getElementById('myChartRecovered').getContext('2d');

    let displayData2 = []

    for (i = 0; i < info_daily.length; i++) {
        if (info_daily[i][2] === tag_daily.recovered && info_daily[i][tag_daily[current_stateCode]] >= 0) {
            displayData2.push({
                x: info_daily[i][tag_daily.dateYMD],
                y: info_daily[i][tag_daily[current_stateCode]]
            })
        }
    }

    myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'RECOVERED',
                data: displayData2,
                backgroundColor: [
                    'rgba(0, 123, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(0, 123, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,

                },
                x: {
                    ticks: {
                        callback: function(value, index, values) {
                            return '';
                        }
                    }

                },

            },
            plugins: {
                // legend: {
                //     display: false
                // }
                tooltip: {
                    mode: 'nearest',
                    intersect: false
                }


            }
        }
    });



















    let canvas3 = `<div class="history-chart-item">
                                        <canvas id="myChartDeceased" style="width: 95%; height: 285px;"></canvas>
                                    </div>`

    container.insertAdjacentHTML('beforeend', canvas3)

    let ctx3 = document.getElementById('myChartDeceased').getContext('2d');

    let displayData3 = []

    for (i = 0; i < info_daily.length; i++) {
        if (info_daily[i][2] === tag_daily.deceased && info_daily[i][tag_daily[current_stateCode]] >= 0) {
            displayData3.push({
                x: info_daily[i][tag_daily.dateYMD],
                y: info_daily[i][tag_daily[current_stateCode]]
            })
        }
    }

    myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'DECEASED',
                data: displayData3,
                backgroundColor: [
                    'rgba(255, 193, 7, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 193, 7, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,

                },
                x: {
                    ticks: {
                        callback: function(value, index, values) {
                            return '';
                        }
                    }

                },

            },
            plugins: {
                // legend: {
                //     display: false
                // }
                tooltip: {
                    mode: 'nearest',
                    intersect: false
                }


            }
        }
    });




}