const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

// Replace "your_database" with the name of your MongoDB database

const uri = process.env.MONGODB_URI


app.use(bodyParser.json())

// Sample data for zones
const zones = [
  {
    _id: new ObjectId(),
    division: 'Konkan',
    zone_name: 'Coastal Konkan',
    region: 'Konkan',
    latitude: 18.925,
    longitude: 72.8258,
    tier1_cities: [
      { name: 'Mumbai', latitude: 19.076, longitude: 72.8777 },
      { name: 'Bandra', latitude: 19.0607, longitude: 72.8367, city: 'Mumbai' },
      {
        name: 'Andheri',
        latitude: 19.1197,
        longitude: 72.8464,
        city: 'Mumbai',
      },
      { name: 'Colaba', latitude: 18.9154, longitude: 72.8258, city: 'Mumbai' },
      { name: 'Dadar', latitude: 19.019, longitude: 72.8429, city: 'Mumbai' },
      { name: 'Malad', latitude: 19.1862, longitude: 72.8486, city: 'Mumbai' },
      { name: 'Powai', latitude: 19.1238, longitude: 72.9073, city: 'Mumbai' },
      {
        name: 'Goregaon',
        latitude: 19.1646,
        longitude: 72.8493,
        city: 'Mumbai',
      },
      { name: 'Worli', latitude: 19.0074, longitude: 72.8168, city: 'Mumbai' },
      {
        name: 'Chembur',
        latitude: 19.0557,
        longitude: 72.8975,
        city: 'Mumbai',
      },
      {
        name: 'Lower Parel',
        latitude: 18.9958,
        longitude: 72.83,
        city: 'Mumbai',
      },
      { name: 'Navi Mumbai', latitude: 19.033, longitude: 73.0297 },
      {
        name: 'Vashi',
        latitude: 19.0757,
        longitude: 72.9986,
        city: 'Navi Mumbai',
      },
      {
        name: 'Nerul',
        latitude: 19.033,
        longitude: 73.0181,
        city: 'Navi Mumbai',
      },
      {
        name: 'Kharghar',
        latitude: 19.0258,
        longitude: 73.059,
        city: 'Navi Mumbai',
      },
      {
        name: 'Belapur',
        latitude: 19.0183,
        longitude: 73.0405,
        city: 'Navi Mumbai',
      },
      {
        name: 'Airoli',
        latitude: 19.158,
        longitude: 72.9998,
        city: 'Navi Mumbai',
      },
      {
        name: 'CBD Belapur',
        latitude: 19.0163,
        longitude: 73.0395,
        city: 'Navi Mumbai',
      },
      {
        name: 'Kopar Khairane',
        latitude: 19.1068,
        longitude: 73.0119,
        city: 'Navi Mumbai',
      },
      {
        name: 'Panvel',
        latitude: 18.9886,
        longitude: 73.1101,
        city: 'Navi Mumbai',
      },
      {
        name: 'Ghansoli',
        latitude: 19.1231,
        longitude: 72.999,
        city: 'Navi Mumbai',
      },
      {
        name: 'Sanpada',
        latitude: 19.0686,
        longitude: 73.0157,
        city: 'Navi Mumbai',
      },
      { name: 'Thane', latitude: 19.1943, longitude: 72.9709, city: 'Thane' },
      {
        name: 'Thane East',
        latitude: 19.1989,
        longitude: 72.9632,
        city: 'Thane',
      },
      {
        name: 'Vartak Nagar',
        latitude: 19.2113,
        longitude: 72.9726,
        city: 'Thane',
      },
      {
        name: 'Majiwada',
        latitude: 19.2056,
        longitude: 72.9717,
        city: 'Thane',
      },
      {
        name: 'Hiranandani Estate',
        latitude: 19.2497,
        longitude: 72.9621,
        city: 'Thane',
      },
      {
        name: 'Ghodbunder Road',
        latitude: 19.2448,
        longitude: 72.9661,
        city: 'Thane',
      },
      {
        name: 'Kasarvadavali',
        latitude: 19.2517,
        longitude: 72.9989,
        city: 'Thane',
      },
      { name: 'Kalwa', latitude: 19.1939, longitude: 72.9985, city: 'Thane' },
      { name: 'Naupada', latitude: 19.1978, longitude: 72.9727, city: 'Thane' },
      { name: 'Kolshet', latitude: 19.2372, longitude: 72.9626, city: 'Thane' },
      {
        name: 'Badlapur',
        latitude: 19.1552,
        longitude: 73.2655,
        city: 'Thane',
      },
    ],
    tier2_cities: [
      { name: 'Raigad (Panvel)', latitude: 18.9886, longitude: 73.1101 },
    ],
    tier3_cities: [
      { name: 'Alibaug', latitude: 18.6414, longitude: 72.8722 },
      { name: 'Khopoli', latitude: 18.7832, longitude: 73.3452 },
      { name: 'Dahanu', latitude: 19.9844, longitude: 72.7437 },
    ],
  },
  {
    _id: new ObjectId(),
    division: 'Konkan',
    zone_name: 'Inland Konkan',
    region: 'Konkan',
    latitude: 19.5,
    longitude: 73.5,
    tier1_cities: [
      { name: 'Ratnagiri', latitude: 16.9944, longitude: 73.3002 },
    ],
    tier2_cities: [
      { name: 'Sindhudurg (Kudal)', latitude: 16.9957, longitude: 73.6184 },
    ],
    tier3_cities: [
      { name: 'Satara (Karad)', latitude: 17.2865, longitude: 74.1861 },
      { name: 'Kolhapur (Ichalkaranji)', latitude: 16.705, longitude: 74.2433 },
    ],
  },
  {
    _id: new ObjectId(),
    division: 'Western Maharashtra',
    zone_name: 'Pune Division',
    region: 'Desh',
    latitude: 18.5196,
    longitude: 73.8,
    tier1_cities: [
      { name: 'Pune', latitude: 18.5204, longitude: 73.8567 },
      { name: 'Hinjewadi', latitude: 18.5971, longitude: 73.7182 },
      { name: 'Hadapsar', latitude: 18.5204, longitude: 73.9271 },
      { name: 'Kothrud', latitude: 18.5036, longitude: 73.8077 },
      { name: 'Viman Nagar', latitude: 18.5675, longitude: 73.9142 },
      { name: 'Koregaon Park', latitude: 18.5371, longitude: 73.8936 },
      { name: 'Shivaji Nagar', latitude: 18.5308, longitude: 73.8475 },
      { name: 'Deccan Gymkhana', latitude: 18.5157, longitude: 73.8406 },
      { name: 'Camp (Pune Cantonment)', latitude: 18.5175, longitude: 73.8766 },
      { name: 'Aundh', latitude: 18.561, longitude: 73.8107 },
      { name: 'Baner', latitude: 18.5642, longitude: 73.7762 },
      { name: 'Magarpatta City', latitude: 18.5224, longitude: 73.9334 },
    ],
    tier2_cities: [{ name: 'Nashik', latitude: 20.0059, longitude: 73.791 }],
    tier3_cities: [
      { name: 'Solapur', latitude: 17.6599, longitude: 75.9064 },
      { name: 'Ahmednagar', latitude: 19.0913, longitude: 74.7496 },
      { name: 'Sangli (Miraj)', latitude: 16.8494, longitude: 74.607 },
    ],
  },
  {
    _id: new ObjectId(),
    division: 'Western Maharashtra',
    zone_name: 'Northern Maharashtra',
    latitude: 20,
    longitude: 74,
    tier1_cities: [
      { id: 'Jalgaon', name: 'Jalgaon' },
      { id: 'Mahabal', name: 'Mahabal' },
      { id: 'Mehunbare', name: 'Mehunbare' },
      { id: 'Ambap', name: 'Ambap' },
      { id: 'Bhadgaon', name: 'Bhadgaon' },
      { id: 'Paldhi', name: 'Paldhi' },
      { id: 'Nimbhora', name: 'Nimbhora' },
      { id: 'Chalisgaon', name: 'Chalisgaon' },
      { id: 'Bhusawal', name: 'Bhusawal' },
      { id: 'Yawal', name: 'Yawal' },
      { id: 'Erandol', name: 'Erandol' },
    ],
    tier2_cities: [{ id: 'Dhule', name: 'Dhule' }],
    tier3_cities: [
      { id: 'Nandurbar', name: 'Nandurbar' },
      { id: 'Malegaon', name: 'Malegaon' },
    ],
    city_coordinates: {
      Jalgaon: { latitude: 21.0029, longitude: 75.566 },
      Mahabal: { latitude: 21.0107, longitude: 75.5601 },
      Mehunbare: { latitude: 20.9949, longitude: 75.5734 },
      Ambap: { latitude: 20.9903, longitude: 75.5761 },
      Bhadgaon: { latitude: 21.0054, longitude: 75.5651 },
      Paldhi: { latitude: 21.0146, longitude: 75.5645 },
      Nimbhora: { latitude: 21.0056, longitude: 75.577 },
      Chalisgaon: { latitude: 20.4625, longitude: 74.9966 },
      Bhusawal: { latitude: 21.0455, longitude: 75.7851 },
      Yawal: { latitude: 21.0511, longitude: 75.7474 },
      Erandol: { latitude: 20.9294, longitude: 75.3169 },
      Dhule: { latitude: 20.9042, longitude: 74.774 },
      Nandurbar: { latitude: 21.3669, longitude: 74.2405 },
      Malegaon: { latitude: 20.5537, longitude: 74.5258 },
    },
  },
  {
    _id: new ObjectId(),
    division: 'Marathwada',
    zone_name: 'Marathwada Plateau',
    latitude: 19.975,
    longitude: 75.3377,
    tier1_cities: [{ id: 'Aurangabad', name: 'Aurangabad' }],
    tier2_cities: [{ id: 'Jalna', name: 'Jalna' }],
    tier3_cities: [
      { id: 'Parbhani', name: 'Parbhani' },
      { id: 'Beed', name: 'Beed' },
    ],
    city_coordinates: {
      Aurangabad: { latitude: 19.8762, longitude: 75.3433 },
      Jalna: { latitude: 19.8395, longitude: 75.888 },
      Parbhani: { latitude: 19.2703, longitude: 76.7767 },
      Beed: { latitude: 18.9888, longitude: 75.7605 },
    },
  },
  {
    _id: new ObjectId(),
    division: 'Marathwada',
    zone_name: 'Marathwada Plains',
    latitude: 18.5,
    longitude: 76,
    tier1_cities: [{ name: 'Nanded', latitude: 19.1383, longitude: 77.321 }],
    tier2_cities: [{ name: 'Latur', latitude: 18.4088, longitude: 76.5604 }],
    tier3_cities: [
      { name: 'Osmanabad', latitude: 18.1866, longitude: 76.0419 },
      { name: 'Hingoli', latitude: 19.7192, longitude: 77.1472 },
    ],
  },
  {
    _id: new ObjectId(),
    division: 'Vidarbha',
    zone_name: 'Nagpur Region',
    latitude: 21.17,
    longitude: 78.87,
    tier1_cities: [{ name: 'Nagpur', latitude: 21.1458, longitude: 79.0882 }],
    tier2_cities: [{ name: 'Wardha', latitude: 20.7447, longitude: 78.6022 }],
    tier3_cities: [
      { name: 'Chandrapur', latitude: 19.9595, longitude: 79.2961 },
      { name: 'Gondia', latitude: 21.4602, longitude: 80.1927 },
      { name: 'Bhandara', latitude: 21.1669, longitude: 79.6517 },
    ],
  },
  {
    _id: new ObjectId(),
    region: 'Vidarbha',
    zone_name: 'Amravati ',
    division: 'Amravati Division',
    latitude: 20,
    longitude: 77.78,
    tier1_cities: [
      {
        name: 'Amravati',
        latitude: 20.9374,
        longitude: 77.7796,
      },
      {
        name: 'Chandur Railway',
        latitude: 20.7399,
        longitude: 77.5496,
      },
      {
        name: 'Shirala',
        latitude: 21.1737,
        longitude: 77.5543,
      },
      {
        name: 'Walgaon',
        latitude: 21.2706,
        longitude: 77.5533,
      },
      {
        name: 'Kholapur',
        latitude: 21.2717,
        longitude: 77.5762,
      },
    ],
    tier2_cities: [
      {
        name: 'Paratwada',
        latitude: 21.1983,
        longitude: 77.5161,
      },
      {
        name: 'Chikhaldara',
        latitude: 21.1404,
        longitude: 77.5225,
      },
      {
        name: 'Dharni',
        latitude: 21.3241,
        longitude: 77.0219,
      },
      {
        name: 'Achalpur',
        latitude: 21.2576,
        longitude: 77.5135,
      },
      {
        name: 'Hiwarkhed',
        latitude: 21.0266,
        longitude: 77.5558,
      },
      {
        name: 'Rithpur',
        latitude: 20.8084,
        longitude: 77.5324,
      },
      {
        name: 'Shendurjana Ghat',
        latitude: 20.8766,
        longitude: 77.5381,
      },
      {
        name: 'Badnera',
        latitude: 21.1639,
        longitude: 77.3072,
      },
      {
        name: 'Daryapur',
        latitude: 20.9205,
        longitude: 77.3181,
      },
      {
        name: 'Chandurbazar',
        latitude: 20.7582,
        longitude: 77.5398,
      },
      {
        name: 'Teosa',
        latitude: 20.8629,
        longitude: 77.4631,
      },
      {
        name: 'Dhamangaon Railway',
        latitude: 20.8775,
        longitude: 77.6994,
      },
      {
        name: 'Akola',
        latitude: 20.7077,
        longitude: 77.0186,
      },
    ],
    tier3_cities: [
      {
        name: 'Morshi',
        latitude: 20.4799,
        longitude: 78.0097,
      },
      {
        name: 'Nandgaon Khandeshwar',
        latitude: 20.5539,
        longitude: 77.9288,
      },
      {
        name: 'Warud',
        latitude: 20.2633,
        longitude: 77.3037,
      },
      {
        name: 'Anjangaon',
        latitude: 21.1603,
        longitude: 77.3048,
      },
      {
        name: 'Yavatmal',
        latitude: 20.3934,
        longitude: 78.1331,
      },
      {
        name: 'Washim',
        latitude: 20.1122,
        longitude: 77.1411,
      },
      {
        name: 'Buldhana',
        latitude: 20.5459,
        longitude: 76.1803,
      },
    ],
  },
  // {
  //   _id: new ObjectId(),
  //   division: 'Khandesh (if separate zone)',
  //   zone_name: 'North-West Maharashtra',
  //   latitude: 20.9642,
  //   longitude: 75.7764,
  //   tier1_cities: [{ name: 'Dhule', latitude: 20.9023, longitude: 74.7742 }],
  //   tier2_cities: [{ name: 'Jalgaon', latitude: 21.0077, longitude: 75.5626 }],
  //   tier3_cities: [
  //     { name: 'Nandurbar', latitude: 21.3669, longitude: 74.2405 },
  //   ],
  // },
]

// Haversine formula to calculate distance between two points (latitude, longitude)
function calculateDistance(userLat, userLong, cityLat, cityLong) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(cityLat - userLat)
  const dLon = deg2rad(cityLong - userLong)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userLat)) *
      Math.cos(deg2rad(cityLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

app.get('/get-zone-tier', async (req, res) => {
  const { latitude, longitude } = req.query

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Missing latitude or longitude' })
  }

  try {
    let closestZone = null
    let minDistance = Infinity
    let closestCity = null
    let closestTier = null
    let closestArea = null

    // Iterate through zones and find the closest one
    for (const zone of zones) {
      const distance = calculateDistance(
        latitude,
        longitude,
        zone.latitude,
        zone.longitude
      )
      if (distance < minDistance) {
        minDistance = distance
        closestZone = zone
      }
    }

    if (!closestZone) {
      return res
        .status(404)
        .json({ message: 'No zone found for provided location' })
    }

    // Function to find the closest city within a tier
    function findClosestCity(cities, tier) {
      for (const city of cities) {
        const distance = calculateDistance(
          latitude,
          longitude,
          city.latitude,
          city.longitude
        )
        if (distance < minDistance) {
          minDistance = distance
          closestCity = city.city || closestZone.zone_name // Use zone_name if city is not defined
          closestTier = tier
          closestArea = city.name
        }
      }
    }

    // Find closest city in tier 1
    findClosestCity(closestZone.tier1_cities, 'Tier 1')

    // Find closest city in tier 2
    if (!closestCity) {
      findClosestCity(closestZone.tier2_cities, 'Tier 2')
    }

    // Find closest city in tier 3
    if (!closestCity) {
      findClosestCity(closestZone.tier3_cities, 'Tier 3')
    }

    // Correct city names for Mumbai and Thane areas
    if (closestZone.zone_name === 'Coastal Konkan') {
      if (closestArea && closestArea.includes('Mumbai')) {
        closestCity = 'Mumbai'
      } else if (closestArea && closestArea.includes('Thane')) {
        closestCity = 'Thane'
      } else if (closestArea && closestArea.includes('Navi Mumbai')) {
        closestCity = 'Navi Mumbai'
      }
    } else if (closestZone.zone_name === 'Pune Division') {
      closestCity = 'Pune'
    } else if (closestZone.zone_name === 'Western Maharashtra') {
      closestCity = 'Jalgaon'
    } else if (closestZone.zone_name === 'Amravati') {
      closestCity = 'Amravati'
    }

    const response = {
      zone_name: closestZone.zone_name,
      region: closestZone.region || 'Unknown',
      tier: closestTier,
      city: closestCity || 'Unknown',
      area: closestArea || 'Unknown',
    }

    res.json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
