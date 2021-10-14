const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '615c52e3715fd500463302ba',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    "url": "https://res.cloudinary.com/dfhkr3xwc/image/upload/v1633958955/YelpCamp/um0fjujvpoiixefpltw3.jpg",
                    "filename": "YelpCamp/um0fjujvpoiixefpltw3"
                },
                {
                    "url": "https://res.cloudinary.com/dfhkr3xwc/image/upload/v1633958955/YelpCamp/xyui2klqe8xtnt1yfldz.jpg",
                    "filename": "YelpCamp/xyui2klqe8xtnt1yfldz"
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt suscipit eveniet fugiat iste, ratione vitae blanditiis adipisci accusantium laborum libero, nesciunt inventore delectus quo. Hic magnam nesciunt maiores quia dolor.',
            price: price,
            "geometry" : { 
                "type" : "Point", 
                "coordinates" : [ 121.63333, 25.03333 ] 
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})