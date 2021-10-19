mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .addTo(map);

const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(campground.geometry.coordinates)
    .setHTML(`<h6>${campground.title}</h6>`)
    .addTo(map);