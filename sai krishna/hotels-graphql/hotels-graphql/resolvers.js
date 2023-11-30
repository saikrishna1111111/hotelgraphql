var axios = require('axios');
const apiUrl = 'http://localhost:3000/api'
const resolvers =  {
    Query: {
      hotels: async (_, {lat,lng}) => {
            let response;
            if(lat && lng){
                response = await axios.get(`${apiUrl}/hotels/${lat}/${lng}`);
            } else {
                response = await axios.get(`${apiUrl}/hotels`);
            }
            return response.data.hotels
      },
      hotel: async (_, {id}) => {
          let response = await axios.get(`${apiUrl}/hotels/${id}`);
          return response.data.hotel
      }
    },
    Mutation : {
        addHotel: async(parent,args,context,info) => {
            console.log(args)
             let re=await axios.post("http://localhost:3000/api/hotels", args )
            return true
        }
    },
    Hotel: {
        tariff: async({id}) => {
            let response = await axios.get(`${apiUrl}/tariff/${id}`);
            return response.data.tariff
        },
        amenities : async({id}) => {
            let response = await axios.get(`${apiUrl}/amenities/${id}`);
            return response.data.amenities
        },
        reviews : async({id}) => {
            let response = await axios.get(`${apiUrl}/reviews/${id}`);
            console.log(response.data.reviews || [])
            return response.data.reviews || []
        }
    }
  };

  module.exports = resolvers;