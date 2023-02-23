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
        L.circle([location[1],location[0]],{
            radius:70, color:"red"
        }).addTo(earthquakeLayer)
       // earthquakes.push(L.circleMarker(L.latLng(data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0])),{
        //   radius:10
        //})
    }
    
    console.log(earthquakeLayer)
    earthquakeLayer.addTo(map)
})
