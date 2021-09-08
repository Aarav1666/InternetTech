let map
let info = []
let mapIDColor = {
    red: 'd303e6084a87e09c',
    blue: '54c48f3a4b07ffa8',
    green: 'f43ff2d46aa8036b',
    yellow: 'd7f1d4c12f0e80f8'
}
let markerColors = {
    red: '#ff063a',
    blue: '#007bff',
    green: '#28a745',
    yellow: '#ffc107'
}
let minZoomLevel = 4.25
const myLatLng = { lat: 23.5937, lng: 78.9629 }
const tags = {
    state: 'State',
    confirmed: 'Confirmed',
    recovered: 'Recovered',
    deaths: 'Deaths',
    active: 'Active',
    state_code: 'State_code'
}
const tagIndex = {
    state: 0,
    confirmed: 1,
    recovered: 2,
    deaths: 3,
    active: 4,
    state_code: 7
}
const centerLatLng = {
    AN: { lat: 11.7401, lng: 92.6586 },
    AP: { lat: 15.9129, lng: 79.7400 },
    AR: { lat: 28.2180, lng: 94.7278 },
    AS: { lat: 26.2006, lng: 92.9376 },
    BR: { lat: 25.0961, lng: 85.3131 },
    CH: { lat: 30.7333, lng: 76.7794 },
    CT: { lat: 21.2787, lng: 81.8661 },
    DN: { lat: 20.1809, lng: 73.0161 },
    DL: { lat: 28.7041, lng: 77.1025 },
    GA: { lat: 15.2993, lng: 74.1240 },
    GJ: { lat: 22.2587, lng: 71.1924 },
    HR: { lat: 29.0588, lng: 76.0856 },
    HP: { lat: 31.1048, lng: 77.1734 },
    JK: { lat: 33.2778, lng: 75.3412 },
    JH: { lat: 23.6102, lng: 85.2799 },
    KA: { lat: 15.3173, lng: 75.7139 },
    KL: { lat: 10.8505, lng: 76.2711 },
    LA: { lat: 10.5593, lng: 72.6358 },
    LD: { lat: 34.2268, lng: 77.5619 },
    MP: { lat: 22.9734, lng: 78.6569 },
    MH: { lat: 19.7515, lng: 75.7139 },
    MN: { lat: 24.6637, lng: 93.9063 },
    ML: { lat: 25.4670, lng: 91.3662 },
    MZ: { lat: 23.1645, lng: 92.9376 },
    NL: { lat: 26.1584, lng: 94.5624 },
    OR: { lat: 20.9517, lng: 85.0985 },
    PY: { lat: 11.9416, lng: 79.8083 },
    PB: { lat: 31.1471, lng: 75.3412 },
    RJ: { lat: 27.0238, lng: 74.2179 },
    SK: { lat: 27.5330, lng: 88.5122 },
    UT: { lat: 30.0668, lng: 79.0193 },
    TN: { lat: 11.1271, lng: 78.6569 },
    TR: { lat: 23.9408, lng: 91.9882 },
    UP: { lat: 26.8467, lng: 80.9462 },
    WB: { lat: 22.9868, lng: 87.8550 },
    TS: { lat: 18.1124, lng: 79.0193 }
    
    
}
function initMap() {
    

    

    // const svgMarker = {
    //     path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    //     fillColor: "blue",
    //     fillOpacity: 0.6,
    //     strokeWeight: 0,
    //     rotation: 0,
    //     scale: 2,
    //     anchor: new google.maps.Point(15, 30),
    // };


    map = new google.maps.Map(document.getElementById("home_map_india"), {
        center: { lat: 23.5937, lng: 78.9629 },
        zoom: minZoomLevel,
        draggable: false,
        zoomControl: false,
        draggableCursor: 'pointer',
        mapId: mapIDColor.red,
        useStaticMap: false
    });

    



    // TODO: on-time api data retrieval
    // TODO: color change of map on hovering of list items
    // TODO: get data from api
    // TODO: manipulate data according to requirment
    // TODO: manage radius in accordance with magnitude



}




































// styling related to page

let isClickedStat = {
    confirmed: false,
    active: false,
    recovered: false,
    deceased: false
}

let dom = {
    confirmed: document.getElementById("progress-confirmed"),
    active: document.getElementById("progress-active"),
    recovered: document.getElementById("progress-recovered"),
    deceased: document.getElementById("progress-deceased")
}

let setClickTrue = (element) => {
    
    Object.keys(isClickedStat).forEach((e) => {
        isClickedStat[e]=false
    })

    isClickedStat[element] = true    
}


let setStatDom = () => {


    isClickedStat.confirmed ?
        dom.confirmed.style.background = `rgba(255, 6, 58, 0.2)` :
        dom.confirmed.style.background = `rgba(255, 6, 58, 0.05)`

    
    isClickedStat.active ?
        dom.active.style.background = `rgba(40, 167, 69, 0.2)` :
        dom.active.style.background = `rgba(40, 167, 69, 0.05)`

    
    isClickedStat.recovered ?
        dom.recovered.style.background = `rgba(0, 123, 255, 0.2)` :
        dom.recovered.style.background = `rgba(0, 123, 255, 0.05)`

    
    isClickedStat.deceased ?
        dom.deceased.style.background = `rgba(255, 193, 7, 0.2)` :
        dom.deceased.style.background = `rgba(255, 193, 7, 0.05)`

}





dom.confirmed.addEventListener('click', () => {
    setClickTrue('confirmed')
    setStatDom()
    map = new google.maps.Map(document.getElementById("home_map_india"), {
        center: { lat: 23.5937, lng: 78.9629 },
        zoom: minZoomLevel,
        draggable: false,
        zoomControl: false,
        draggableCursor: 'pointer',
        mapId: mapIDColor.red,
        useStaticMap: false
    });
    confirmedDataMarkers()
})
dom.confirmed.addEventListener('mouseenter', () => {
    if (!isClickedStat.confirmed) {
        
        dom.confirmed.style.background = `rgba(255, 6, 58, 0.2)`
    }
})
dom.confirmed.addEventListener('mouseleave', () => {
    if (!isClickedStat.confirmed) {

        dom.confirmed.style.background = `rgba(255, 6, 58, 0.05)`
    }
})




dom.active.addEventListener('click', () => {
    setClickTrue('active')
    setStatDom()
    map = new google.maps.Map(document.getElementById("home_map_india"), {
        center: { lat: 23.5937, lng: 78.9629 },
        zoom: minZoomLevel,
        draggable: false,
        zoomControl: false,
        draggableCursor: 'pointer',
        mapId: mapIDColor.green,
        useStaticMap:false
    });
    activeDataMarkers()
})
dom.active.addEventListener('mouseenter', () => {
    if (!isClickedStat.active) {

        dom.active.style.background = `rgba(40, 167, 69, 0.2)`
    }
})
dom.active.addEventListener('mouseleave', () => {
    if (!isClickedStat.active) {

        dom.active.style.background = `rgba(40, 167, 69, 0.05)`
    }
})





dom.recovered.addEventListener('click', () => {
    setClickTrue('recovered')
    setStatDom()
    map = new google.maps.Map(document.getElementById("home_map_india"), {
        center: { lat: 23.5937, lng: 78.9629 },
        zoom: minZoomLevel,
        draggable: false,
        zoomControl: false,
        draggableCursor: 'pointer',
        mapId: mapIDColor.blue,
        useStaticMap: false
    });
    recoveredDataMarkers()
})
dom.recovered.addEventListener('mouseenter', () => {
    if (!isClickedStat.recovered) {

        dom.recovered.style.background = `rgba(0, 123, 255, 0.2)`
    }
})
dom.recovered.addEventListener('mouseleave', () => {
    if (!isClickedStat.recovered) {

        dom.recovered.style.background = `rgba(0, 123, 255, 0.05)`
    }
})





dom.deceased.addEventListener('click', () => {
    setClickTrue('deceased')
    setStatDom()
    map = new google.maps.Map(document.getElementById("home_map_india"), {
        center: { lat: 23.5937, lng: 78.9629 },
        zoom: minZoomLevel,
        draggable: false,
        zoomControl: false,
        draggableCursor: 'pointer',
        mapId: mapIDColor.yellow,
        useStaticMap: false
    });
    deceasedDataMarkers()
})
dom.deceased.addEventListener('mouseenter', () => {
    if (!isClickedStat.deceased) {

        dom.deceased.style.background = `rgba(255, 193, 7, 0.2)`
    }
})
dom.deceased.addEventListener('mouseleave', () => {
    if (!isClickedStat.deceased) {

        dom.deceased.style.background = `rgba(255, 193, 7, 0.05)`
    }
})

























let confirmedDataMarkers = () => {
    
    // state-code && connfirmed && lat-long
    for (let i = 1; i < info.length; i++){
        let stateCode = info[i][tagIndex.state_code]
        if (stateCode === undefined) {
            continue;
        }
        stateCode = stateCode.split(':').pop()
        let curConfirmed = info[i][tagIndex.confirmed]
        curConfirmed = curConfirmed.split(':').pop()
        curConfirmed = parseInt(curConfirmed)
        console.log(i)
        curConfirmed /= 18

        // curConfirmed /= 6460680
        // curConfirmed *= 100
        // curConfirmed *= 9999
        // console.log(curConfirmed)
        let cityCircle = new google.maps.Circle({
            strokeColor: markerColors.red,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: markerColors.red,
            fillOpacity: 0.5,
            map,
            center: centerLatLng[stateCode],
            radius: curConfirmed, // range starts from 10000 to 100000 for growing circle and follows
        });


        google.maps.event.addListener(cityCircle, 'mouseover', function () {
            cityCircle.setOptions({
                fillOpacity: 0
            })
        });
        google.maps.event.addListener(cityCircle, 'mouseout', function () {
            cityCircle.setOptions({
                fillOpacity: 0.5
            })
        });


    }




    // const cityCircle = new google.maps.Circle({
    //     strokeColor: markerColors.red,
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: markerColors.red,
    //     fillOpacity: 0,
    //     map,
    //     center: centerLatLng.AP,
    //     radius: 100000, // range starts from 10000 to 100000 for growing circle and follows
    // });


    // google.maps.event.addListener(cityCircle, 'mouseover', function () {
    //     cityCircle.setOptions({
    //         fillOpacity: 0.5
    //     })
    // });
    // google.maps.event.addListener(cityCircle, 'mouseout', function () {
    //     cityCircle.setOptions({
    //         fillOpacity: 0
    //     })
    // });
}


let activeDataMarkers = () => {


    // state-code && connfirmed && lat-long
    for (let i = 1; i < info.length; i++) {
        let stateCode = info[i][tagIndex.state_code]
        if (stateCode === undefined) {
            continue;
        }
        stateCode = stateCode.split(':').pop()
        let curConfirmed = info[i][tagIndex.active]
        curConfirmed = curConfirmed.split(':').pop()
        curConfirmed = parseInt(curConfirmed)
        console.log(i)
        curConfirmed *= 2

        // curConfirmed /= 6460680
        // curConfirmed *= 100
        // curConfirmed *= 9999
        // console.log(curConfirmed)
        let cityCircle = new google.maps.Circle({
            strokeColor: markerColors.green,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: markerColors.green,
            fillOpacity: 0.5,
            map,
            center: centerLatLng[stateCode],
            radius: curConfirmed, // range starts from 10000 to 100000 for growing circle and follows
        });


        google.maps.event.addListener(cityCircle, 'mouseover', function () {
            cityCircle.setOptions({
                fillOpacity: 0
            })
        });
        google.maps.event.addListener(cityCircle, 'mouseout', function () {
            cityCircle.setOptions({
                fillOpacity: 0.5
            })
        });


    }

}

let recoveredDataMarkers = () => {


    // state-code && connfirmed && lat-long
    for (let i = 1; i < info.length; i++) {
        let stateCode = info[i][tagIndex.state_code]
        if (stateCode === undefined) {
            continue;
        }
        stateCode = stateCode.split(':').pop()
        let curConfirmed = info[i][tagIndex.recovered]
        curConfirmed = curConfirmed.split(':').pop()
        curConfirmed = parseInt(curConfirmed)
        console.log(i)
        curConfirmed /= 18

        // curConfirmed /= 6460680
        // curConfirmed *= 100
        // curConfirmed *= 9999
        // console.log(curConfirmed)
        let cityCircle = new google.maps.Circle({
            strokeColor: markerColors.blue,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: markerColors.blue,
            fillOpacity: 0.5,
            map,
            center: centerLatLng[stateCode],
            radius: curConfirmed, // range starts from 10000 to 100000 for growing circle and follows
        });


        google.maps.event.addListener(cityCircle, 'mouseover', function () {
            cityCircle.setOptions({
                fillOpacity: 0
            })
        });
        google.maps.event.addListener(cityCircle, 'mouseout', function () {
            cityCircle.setOptions({
                fillOpacity: 0.5
            })
        });


    }

}

let deceasedDataMarkers = () => {

    // state-code && connfirmed && lat-long
    for (let i = 1; i < info.length; i++) {
        let stateCode = info[i][tagIndex.state_code]
        if (stateCode === undefined) {
            continue;
        }
        stateCode = stateCode.split(':').pop()
        let curConfirmed = info[i][tagIndex.deaths]
        curConfirmed = curConfirmed.split(':').pop()
        curConfirmed = parseInt(curConfirmed)
        console.log(i)
        curConfirmed *= 2

        // curConfirmed /= 6460680
        // curConfirmed *= 100
        // curConfirmed *= 9999
        // console.log(curConfirmed)
        let cityCircle = new google.maps.Circle({
            strokeColor: markerColors.yellow,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: markerColors.yellow,
            fillOpacity: 0.5,
            map,
            center: centerLatLng[stateCode],
            radius: curConfirmed, // range starts from 10000 to 100000 for growing circle and follows
        });


        google.maps.event.addListener(cityCircle, 'mouseover', function () {
            cityCircle.setOptions({
                fillOpacity: 0
            })
        });
        google.maps.event.addListener(cityCircle, 'mouseout', function () {
            cityCircle.setOptions({
                fillOpacity: 0.5
            })
        });


    }

}

























// file reading 

$(document).ready(function () {
    
    $.ajax({
        type: "GET",
        url: "https://data.covid19india.org/csv/latest/state_wise.csv",
        dataType: "text",
        success: function (data) { processData(data) }
    });

    // $.ajax({
    //     type: "GET",
    //     url: `https://maps.googleapis.com/maps/api/geocode/json?address=CA&key=AIzaSyB4bqsRzFTq6DQ8G71vjc4YiNpMvEPpDIA`,
    //     dataType: "json",
    //     success: function (data) { console.log(data) }
    // })
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
    console.log(info)
    // alert(lines);
}















// data manipulation

// let confirmedDataMarkers = () => {

//     const cityCircle = new google.maps.Circle({
//         strokeColor: markerColors.red,
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: markerColors.red,
//         fillOpacity: 0,
//         map,
//         center: myLatLng,
//         radius: 100000, // range starts from 10000 to 100000 for growing circle and follows
//     });


//     google.maps.event.addListener(cityCircle, 'mouseover', function () {
//         cityCircle.setOptions({
//             fillOpacity: 0.5
//         })
//     });
//     google.maps.event.addListener(cityCircle, 'mouseout', function () {
//         cityCircle.setOptions({
//             fillOpacity: 0
//         })
//     });
// }