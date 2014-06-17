/**
 * Created by storskel on 08.04.2014.
 */

angular.module("leafletApp", [])
    .controller("leafletController", function($scope, $http){
        var map = L.map('map').setView([59.92474, 10.72266], 13);

        L.tileLayer(
            'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}',
            {
                attribution: "Data fra Kartverket og SSB"
            }
        ).addTo(map);

        function onEachFeature(feature, layer) {
            // does this feature have a property named popupContent?
            if (feature.properties && feature.properties.name) {
                layer.bindPopup(feature.properties.name);
            }
        }

        for (var i = 0; i < grunnkretser.features.length; i++) {
            var feature = grunnkretser.features[i];
            L.geoJson(feature, {
                onEachFeature: onEachFeature
            }).addTo(map);
        }

        var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }

        map.on('click', onMapClick);

        function setView(concept, husholdningstype, tid) {
            $http.get("http://data.ssb.no/api/v0/dataset/56928.json?lang=no", {cache:true})
                .success(function(jsonStat){
                    var ds = JSONstat(jsonStat).Dataset(0),
                        title = ds.Dimension("ContentsCode").Category(concept).label,
                        bydeler = ds.Dimension( "Region" ).id;


                    var data = ds.Data( { "ContentsCode": concept, "Tid": tid, "HusholdType": husholdningstype } );
                    console.log(data);
                });
        }

        setView("InntSkatt", "0000", "2012");
    });