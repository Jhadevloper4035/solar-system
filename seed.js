const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err) {
    if (err) {
        console.log("MongoDB Connection Error: " + err);
        process.exit(1);
    } else {
        console.log("MongoDB Connection Successful — Starting seed...");
        seedData();
    }
});

var Schema = mongoose.Schema;
var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});
var planetModel = mongoose.model('planets', dataSchema);

const planets = [
    {
        id: 0,
        name: "Sun",
        description: "The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, radiating energy primarily as visible light, ultraviolet light, and infrared radiation. It accounts for about 99.86% of the total mass of the Solar System.",
        image: "https://nineplanets.org/wp-content/uploads/2020/03/sun.png",
        velocity: "N/A",
        distance: "0 km"
    },
    {
        id: 1,
        name: "Mercury",
        description: "Mercury is the smallest planet in our Solar System and the closest to the Sun. It has no atmosphere to retain heat, so temperatures swing from -180°C at night to 430°C during the day. A year on Mercury lasts just 88 Earth days.",
        image: "https://nineplanets.org/wp-content/uploads/2020/03/mercury.png",
        velocity: "47.87 km/s",
        distance: "57.9 million km"
    },
    {
        id: 2,
        name: "Venus",
        description: "Venus is the second planet from the Sun and the hottest in our Solar System, with surface temperatures around 465°C due to its thick CO2 atmosphere. It rotates in the opposite direction to most planets and is often visible as the morning star or evening star.",
        image: "https://nineplanets.org/wp-content/uploads/2020/03/venus.png",
        velocity: "35.02 km/s",
        distance: "108.2 million km"
    },
    {
        id: 3,
        name: "Earth",
        description: "Earth is the third planet from the Sun and the only known planet to harbor life. It has one natural satellite, the Moon. About 71% of Earth's surface is covered with water. Earth's atmosphere protects life by absorbing ultraviolet solar radiation and regulating temperature.",
        image: "https://nineplanets.org/wp-content/uploads/2020/03/earth.png",
        velocity: "29.78 km/s",
        distance: "149.6 million km"
    },
    {
        id: 4,
        name: "Mars",
        description: "Mars is the fourth planet from the Sun, often called the Red Planet due to its reddish appearance caused by iron oxide on its surface. It has two small moons, Phobos and Deimos. Mars has the tallest volcano in the Solar System, Olympus Mons, standing 21 km high.",
        image: "https://nineplanets.org/wp-content/uploads/2020/03/mars.png",
        velocity: "24.07 km/s",
        distance: "227.9 million km"
    },
    {
        id: 5,
        name: "Jupiter",
        description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than twice that of all the other planets combined. Its Great Red Spot is a giant storm that has persisted for hundreds of years. Jupiter has 95 known moons.",
        image: "https://nineplanets.org/wp-content/uploads/2020/03/jupiter.png",
        velocity: "13.07 km/s",
        distance: "778.5 million km"
    },
    {
        id: 6,
        name: "Saturn",
        description: "Saturn is the sixth planet from the Sun and the second largest. It is famous for its stunning ring system made of ice and rock. Saturn is a gas giant and has 146 known moons, including Titan which has a thick atmosphere and lakes of liquid methane.",
        image: "https://nineplanets.org/wp-content/uploads/2020/03/saturn.png",
        velocity: "9.69 km/s",
        distance: "1.43 billion km"
    },
    {
        id: 7,
        name: "Uranus",
        description: "Uranus is the seventh planet from the Sun and rotates on its side with an axial tilt of 98 degrees. It is an ice giant with a blue-green color due to methane in its atmosphere. Uranus has 13 known rings and 28 known moons. A year on Uranus lasts 84 Earth years.",
        image: "https://nineplanets.org/wp-content/uploads/2020/03/uranus.png",
        velocity: "6.81 km/s",
        distance: "2.87 billion km"
    },
    {
        id: 8,
        name: "Neptune",
        description: "Neptune is the eighth and farthest known planet from the Sun. It is an ice giant with the strongest winds in the Solar System, reaching speeds of 2,100 km/h. Neptune has 16 known moons, with Triton being the largest. A year on Neptune equals 165 Earth years.",
        image: "https://nineplanets.org/wp-content/uploads/2020/03/neptune.png",
        velocity: "5.43 km/s",
        distance: "4.5 billion km"
    }
];

async function seedData() {
    try {
        await planetModel.deleteMany({});
        console.log("Cleared existing planet data.");

        await planetModel.insertMany(planets);
        console.log(`Successfully seeded ${planets.length} records (Sun + 8 planets).`);

        const count = await planetModel.countDocuments();
        console.log(`Verified: ${count} documents in the 'planets' collection.`);

        mongoose.connection.close();
        console.log("Connection closed. Seed complete!");
    } catch (err) {
        console.error("Seed failed: " + err);
        mongoose.connection.close();
        process.exit(1);
    }
}