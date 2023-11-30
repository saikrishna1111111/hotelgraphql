var express = require('express');
var router = express.Router();

const app = express();
const PORT = 4000;

app.use(express.json())

const hotels = 
[
  {id:1, name:'The Leela Palace Bangalore', address:'23 Airport Road, Bangalore, India', rating:4.5, phone:'080 2521 1234', email:'reservations@theleela.com', country: 'India', pincode: '560008', latitude: 12.9606, longitude: 77.6484,checkIn: 'From 2:00 PM', checkOut: 'Prior to 12:00 PM'},
  {id:2, name:'Taj MG Road Bengaluru', address:'41/3, Mahatma Gandhi Rd, Yellappa Garden', rating:4.3, phone:'080 6660 4444', email:'reservations.mgroad@tajhotels.com', country: 'India', pincode: '560001', latitude: 12.9733, longitude: 77.6197, checkIn: 'From 1:00 PM', checkOut: 'Prior to 12:00 PM'},
  {id:3, name:'The Chancery Pavilion', address:'#135, Residency Rd, Shanthala Nagar, Ashok Nagar', rating:4.8, phone:'080 4141 4141', email:'reservations.tcp@chanceryhotels.com', country: 'India', pincode: '560025', latitude: 12.9660, longitude: 77.5987, checkIn: 'From 3:00 PM', checkOut: 'Prior to 1:00 PM'},
  {id:4, name:'Vivanta Bengaluru Residency Road', address:'66, Residency Rd, Ashok Nagar', rating:4.6, phone:'080 6660 4545', email:'reservations@tajvinatahotels.com', country: 'India', pincode: '', latitude: 12.9533, longitude: 77.4987, checkIn: 'From 2:00 PM', checkOut: 'Prior to 12:00 PM'},
  {id:5, name:'Taj Yeshwantpur Bengaluru', address:'2275, Tumkur Main Rd, Yeshwanthpur Industrial Area, Phase 1', rating:4.3, phone:'080 6690 0111', email:'yeshwantpur.bengaluru@tajhotels.com', country: 'India', pincode: '560022', latitude: 12.4933, longitude: 77.3987, checkIn: 'From 2:00 PM', checkOut: 'Prior to 12:00 PM'},
  {id:6, name:'Lemon Tree Premier Ulsoor Lake Bengaluru', address:'2/1, St Johns Rd, Hermit Colony, Halasuru, Bengaluru', rating:4.5, phone:'080 4480 2000', email:'hi@lemontreehotels.com', country: 'India', pincode: '560066', latitude: 12.2095, longitude: 77.2045, checkIn: 'From 2:00 PM', checkOut: 'Prior to 12:00 PM'}
]

const tariffDetails = [
   {id:1, hotelId:1, roomType: 'Deluxe', tariff:12000},
   {id:2, hotelId:1, roomType: 'Executive', tariff:15000},
   {id:3, hotelId:1, roomType: 'Business Suite', tariff:22000},
   {id:4, hotelId:2, roomType: 'Deluxe', tariff:11966},
   {id:5, hotelId:2, roomType: 'Executive Pool Facing', tariff:14996},
   {id:6, hotelId:2, roomType: 'Business Suite', tariff:21985},
   {id:7, hotelId:3, roomType: 'Deluxe', tariff:12500},
   {id:8, hotelId:3, roomType: 'Executive Pool Facing', tariff:16000},
   {id:9, hotelId:3, roomType: 'Business Suite', tariff:21985},
   {id:10, hotelId:4, roomType: 'Deluxe', tariff:11966},
   {id:11, hotelId:4, roomType: 'Executive Pool Facing', tariff:14996},
   {id:12, hotelId:4, roomType: 'Business Suite', tariff:21985},
   {id:13, hotelId:5, roomType: 'Deluxe', tariff:11966},
   {id:14, hotelId:5, roomType: 'Executive Pool Facing', tariff:17996},
   {id:15, hotelId:5, roomType: 'Business Suite', tariff:23785},
   {id:16, hotelId:6, roomType: 'Deluxe', tariff:12968},
   {id:17, hotelId:6, roomType: 'Executive Pool Facing', tariff:14996},
   {id:18, hotelId:6, roomType: 'Business Suite', tariff:21985},
 ]

 const reviewDetails = [
   {id:1, hotelId:1, reviewer: 'Oliver', rating:4.6, comments: 'Great welcoming staff'},
   {id:2, hotelId:1, reviewer: 'Jack', rating:4.4, comments: 'Clean Swimming Pool'},
   {id:3, hotelId:1, reviewer: 'Noah', rating:4.7, comments: 'Great restaurant'},
   {id:4, hotelId:2, reviewer: 'Thomas', rating:4.4, comments: 'Nice Garden'},
   {id:5, hotelId:2, reviewer: 'Lucas', rating:4.8, comments: 'Clean Bathroom'},
   {id:6, hotelId:2, reviewer: 'Noah', rating:4.7, comments: 'Good ambience'}
 ]

 const amentiesDetails = 
 [
   {id:1, hotelId:1, wifi: true, roomService: true, laundry: true, locker: true, swimmingPool: true, giftShops: false},
   {id:2, hotelId:2, wifi: true, roomService: true, laundry: true, locker: false, swimmingPool: true, giftShops: false},
   {id:3, hotelId:3, wifi: true, roomService: true, laundry: true, locker: false, swimmingPool: true, giftShops: true},
   {id:4, hotelId:4, wifi: true, roomService: true, laundry: true, locker: true, swimmingPool: true, giftShops: false},
   {id:5, hotelId:5, wifi: true, roomService: true, laundry: true, locker: false, swimmingPool: true, giftShops: false},
   {id:6, hotelId:6, wifi: true, roomService: true, laundry: true, locker: true, swimmingPool: true, giftShops: true},
 ]

router.get('/', function(req, res, next) {
  res.send('This is a REST API');
});

router.get('/hotels', function(req, res, next) {
  res.json({hotels});
});

router.get('/hotels/:id', function(req, res, next) {
  const hotel = hotels.find(x => x.id == req.params.id)
  res.json({hotel});
});

router.get('/hotels/:lat/:lng', function(req, res, next) {
  const filteredHotels = hotels.filter(x => x.latitude == req.params.lat && x.longitude == req.params.lng )
  console.log(filteredHotels)
  res.json({hotels: filteredHotels});
});

router.get('/tariff/:hotelId', function(req, res) {
  const tariff = tariffDetails.filter(x => x.hotelId == req.params.hotelId)
  res.json({tariff});
});

router.get('/reviews/:hotelId', function(req, res) {
  const reviews = reviewDetails.filter(x => x.hotelId == req.params.hotelId)
  res.json({reviews});
});

router.get('/amenities/:hotelId', function(req, res) {
  const amenities = amentiesDetails.find(x => x.hotelId == req.params.hotelId)
  res.json({amenities});
});

router.post('/hotels', function(req, res) {
  const hotelId = hotels.length + 1
  const amentityId = amentiesDetails.length + 1
  const body = req.body.hotel
  const hotel = {
    id: hotelId,
    name: body.name,
    address: body.address,
    rating: parseFloat(body.rating),
    phone: body.phone,
    email: body.email,
    country: body.country,
    pincode: body.pincode,
    latitude: parseFloat(body.latitude),
    longitude: parseFloat(body.longitude),
    checkIn: body.checkIn,
    checkOut: body.checkOut
  }
  const amenities = {
    id: amentityId,
    hotelId: hotelId,
    wifi: body.wifi || false,
    roomService: body.roomService || false,
    laundry: body.laundry || false,
    locker: body.locker || false,
    swimmingPool: body.swimmingPool || false,
    giftShops: body.giftShops || false
  }
  hotels.push(hotel)  
  console.log(hotels)
  amentiesDetails.push(amenities)

  body.sai.map((value,index)=>{
    const tarifinput={
      id:tariffDetails.length+1,
      hotelId:hotels.length,
      roomType:value[0],
      tariff:Number(value[1])
    }
    tariffDetails.push(tarifinput)
  })
  res.json({hotel});
});


app.use("/api",router);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

module.exports = router;
