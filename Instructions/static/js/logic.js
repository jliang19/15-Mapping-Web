var map = L.map('map').setView([37.7, -122.4], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(function(data){
    console.log(data)
    var earthquakeLayer = new L.layerGroup()
    for(var i=0; i<data.features.length;i++){
        var earthquake = data.features[i]
        var location = earthquake.geometry.coordinates
        var circle = L.circle([location[1],location[0]],{
            color:getColor(location[2]*4)
        })
        circle.setRadius (location[2]*1500)
        circle.addTo(earthquakeLayer)
       // earthquakes.push(L.circleMarker(L.latLng(data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0])),{
        //   radius:10
        //})
    }
    
    console.log(earthquakeLayer)
    earthquakeLayer.addTo(map)
})
var legend = L.control({
    position:"bottomright"
})

function getColor(magnitude){
    console.log (magnitude)
    if (magnitude>60) return "green"
    if (magnitude>50) return "yellow"
    if (magnitude>40) return "orange"
    if (magnitude>30) return "red"
    return "blue"
}

legend.onAdd=()=>{
    let div = L.DomUtil.create("div")
    const levels = [
        0,30, 40, 50, 60
    ]
    var colors = [
        "blue", "red", "orange", "yellow", "green"
    ]
    levels.forEach((level, i)=>{
div.innerHTML+=" <div style = 'background:"+colors[i]+";height:10px;width:10px;'></div>"+" "+level + "<br>"
console.log(level)
    })
    console.log(div)
    return div
}
legend.addTo(map)