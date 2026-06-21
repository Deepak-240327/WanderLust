require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./Models/listing.js');
const Review = require('./Models/review.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const MongoDb_url = 'mongodb://127.0.0.1:27017/WanderLust';

const owners = ['6a36aa011a853bbb24a04f8b', '6a36aa1d1a853bbb24a04f92', '6a36aa2f1a853bbb24a04f99'];

const sampleData = [
  { title: 'Cozy Beachfront Cottage', location: 'Malibu', country: 'United States', price: 1500, description: 'Enjoy the sound of waves right at your doorstep.' },
  { title: 'Modern City Apartment', location: 'New York', country: 'United States', price: 2000, description: 'A sleek apartment in the heart of downtown with skyline views.' },
  { title: 'Rustic Mountain Cabin', location: 'Aspen', country: 'United States', price: 1200, description: 'Getaway from it all in this remote cabin surrounded by nature.' },
  { title: 'Luxury Pool Villa', location: 'Bali', country: 'Indonesia', price: 3000, description: 'Private pool, dedicated staff, and tropical vibes.' },
  { title: 'Historic Castle Room', location: 'Edinburgh', country: 'United Kingdom', price: 800, description: 'Live like royalty in a modernized medieval castle.' },
  { title: 'Desert Glamping Tent', location: 'Wadi Rum', country: 'Jordan', price: 400, description: 'Sleep under the stars in a luxurious desert camp.' },
  { title: 'Ski Chalet', location: 'Chamonix', country: 'France', price: 2500, description: 'Ski-in, ski-out chalet with a hot tub and mountain views.' },
  { title: 'Tropical Treehouse', location: 'Tulum', country: 'Mexico', price: 600, description: 'Immerse yourself in the jungle canopy in this eco-friendly treehouse.' },
  { title: 'Lakeside Retreat', location: 'Lake Como', country: 'Italy', price: 2200, description: 'Wake up to the serene views of Lake Como.' },
  { title: 'Urban Loft', location: 'Berlin', country: 'Germany', price: 900, description: 'Industrial style loft in the trendy Kreuzberg neighborhood.' },
  { title: 'Secluded Beach House', location: 'Fiji', country: 'Fiji', price: 4500, description: 'Your own private beach awaits at this exclusive property.' },
  { title: 'Charming Countryside Estate', location: 'Tuscany', country: 'Italy', price: 1800, description: 'Vineyard views and rustic Italian charm.' },
  { title: 'Modern Glass House', location: 'Kyoto', country: 'Japan', price: 1500, description: 'A minimalist masterpiece seamlessly blending with the surrounding forest.' },
  { title: 'Houseboat on the Canals', location: 'Amsterdam', country: 'Netherlands', price: 700, description: 'Experience the city from the water in a traditional houseboat.' },
  { title: 'Penthouse Suite', location: 'Dubai', country: 'United Arab Emirates', price: 5000, description: 'Unparalleled luxury and panoramic views of the city skyline.' },
  { title: 'Eco-Lodge in the Rainforest', location: 'Costa Rica', country: 'Costa Rica', price: 550, description: 'Sustainable living without sacrificing comfort.' },
  { title: 'Traditional Ryokan', location: 'Hakone', country: 'Japan', price: 1100, description: 'Authentic Japanese inn experience with hot springs.' },
  { title: 'Cliffside Santorini Villa', location: 'Santorini', country: 'Greece', price: 2800, description: 'Iconic white and blue architecture overlooking the caldera.' },
  { title: 'Boutique Hotel Room', location: 'Paris', country: 'France', price: 1300, description: 'Romantic stay in the heart of Paris, near the Eiffel Tower.' },
  { title: 'Farmhouse Stay', location: 'Provence', country: 'France', price: 950, description: 'Fields of lavender and fresh local produce.' },
  { title: 'Safari Lodge', location: 'Kruger National Park', country: 'South Africa', price: 3500, description: 'Luxury tents with wildlife viewing directly from your deck.' },
  { title: 'Overwater Bungalow', location: 'Bora Bora', country: 'French Polynesia', price: 4000, description: 'Crystal clear waters and ultimate privacy.' },
  { title: 'Historic Riad', location: 'Marrakech', country: 'Morocco', price: 650, description: 'Beautiful courtyard, tilework, and a tranquil atmosphere.' },
  { title: 'Snowy A-Frame Cabin', location: 'Lapland', country: 'Finland', price: 850, description: 'Cozy up by the fire and watch the Northern Lights.' },
  { title: 'Vineyard Cottage', location: 'Napa Valley', country: 'United States', price: 1400, description: 'Stay right among the vines in wine country.' },
  { title: 'Private Island Resort', location: 'Maldives', country: 'Maldives', price: 8000, description: 'The pinnacle of exclusivity and luxury.' },
  { title: 'Art Deco Apartment', location: 'Miami', country: 'United States', price: 1000, description: 'Vibrant colors and retro style near South Beach.' },
  { title: 'Converted Barn', location: 'Cotswolds', country: 'United Kingdom', price: 750, description: 'Charming blend of historic features and modern amenities.' },
  { title: 'Log Cabin in the Woods', location: 'Banff', country: 'Canada', price: 1100, description: 'Perfect basecamp for exploring the Canadian Rockies.' },
  { title: 'Spacious Family Home', location: 'Orlando', country: 'United States', price: 1600, description: 'Close to theme parks with a large private pool.' }
];

const photoIds = [
  "1550133730-69b89dac8715", "1501785888041-af3ef285b4f4", "1518684079-3c830d14ea17", 
  "1564013799919-ab600027ffc6", "1497361463185-1f919d75bc0c", "1476514525535-07fb3b4ae5f1",
  "1521401815894-c91361139414", "1439066615861-d1af74d74000", "1464822759023-fea0923eb423",
  "1502672260266-1c15e8e344e7", "1449844908441-8829872d2607", "1533633310-90a6f05988e4",
  "1510798831971-661eb04b3739", "1506130080646-608b8b80b2d6", "1452626011400-98335f60cd8d",
  "1469796466635-455ef12d08a5", "1494526585095-c41746248156", "1553503159-86641b369528",
  "1522708323590-d24dbb6b0267", "1493246507139-91e8fad9978e", "1504280084323-0105ef50b4ec",
  "1568084680786-5d4f13fb4ab4", "1501117715107-6cb942eb121f", "1449844908441-8829872d2607",
  "1510798831971-661eb04b3739", "1472224371017-082071815c5a", "1480796927426-f609979314bd",
  "1521401815894-c91361139414", "1519972063684-25e1430f0fbf", "1445019980597-93fa8acb246c"
];

const reviewsTexts = [
  "Absolutely breathtaking views and perfect location!",
  "Great stay, very comfortable and the host was accommodating.",
  "Highly recommended! The place was spotless and exactly as described.",
  "Good value for money. We enjoyed our time here.",
  "Amazing experience. Will definitely come back again.",
  "Beautiful decor and very cozy. Perfect for a weekend getaway.",
  "Nice place, but the WiFi was a bit slow.",
  "Fantastic amenities and great location.",
  "We had a wonderful time. The place is magical.",
  "Very clean and well maintained. Loved every moment."
];

async function seedDB() {
    try {
        await mongoose.connect(MongoDb_url);
        console.log("Connected to MongoDB.");
        
        console.log("Clearing existing listings and reviews...");
        await Listing.deleteMany({});
        await Review.deleteMany({});
        
        for (let i = 0; i < sampleData.length; i++) {
            console.log(`Uploading image ${i+1}/${sampleData.length}...`);
            const photoUrl = `https://loremflickr.com/800/600/resort,hotel,villa?lock=${i+1}`;
            
            let uploadedImage;
            try {
                uploadedImage = await cloudinary.uploader.upload(photoUrl, {
                    folder: 'WanderLust'
                });
            } catch (err) {
                console.error("Cloudinary upload failed for", photoUrl, err);
                // Fallback in case upload fails
                uploadedImage = {
                    secure_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
                    public_id: "WanderLust/fallback_image"
                };
            }

            const listingOwner = owners[Math.floor(Math.random() * owners.length)];
            
            const listing = new Listing({
                ...sampleData[i],
                image: {
                    url: uploadedImage.secure_url,
                    filename: uploadedImage.public_id
                },
                owner: listingOwner
            });
            
            const numReviews = Math.floor(Math.random() * 3) + 2; // 2 to 4 reviews
            for(let j = 0; j < numReviews; j++) {
                const reviewAuthor = owners[Math.floor(Math.random() * owners.length)];
                const reviewText = reviewsTexts[Math.floor(Math.random() * reviewsTexts.length)];
                const reviewRating = Math.floor(Math.random() * 5) + 1; // 1 to 5
                
                const review = new Review({
                    comment: reviewText,
                    rating: reviewRating,
                    author: reviewAuthor
                });
                await review.save();
                listing.review.push(review._id);
            }
            
            await listing.save();
            console.log(`Listing '${listing.title}' created with ${numReviews} reviews.`);
        }
        
        console.log("Database seeded successfully!");
    } catch (err) {
        console.error("Error seeding DB:", err);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();
