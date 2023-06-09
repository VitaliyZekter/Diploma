import axios from "axios";

export const getRestaurants = async (bl_lat, bl_lng, tr_lat, tr_lng) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
            {
                params: {
                    // tr_longitude: tr_lng ? tr_lng : "24.11819100711594",
                    tr_longitude: tr_lng,
                    // tr_latitude: tr_lat ? tr_lat : "49.89747102886987",
                    tr_latitude: tr_lat,
                    bl_longitude: bl_lng,
                    // bl_longitude: bl_lng ? bl_lng : "23.90628007496788",
                    bl_latitude: bl_lat,
                    // bl_latitude: bl_lat ? bl_lat : "49.76790706769921",
                    currency: 'USD',
                    lunit: 'km',
                    lang: 'en_US'
                },
                headers: {
                    'X-RapidAPI-Key': '5d076f39d0mshd8ef81f901f9c35p1761d4jsn4e1ecdf075a6',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            }
        );

        return data;
    }
    catch (error) {
        return null;
    }
}

export const getAttractions = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary`,
            {
                params: {
                    tr_longitude: tr_lng,
                    tr_latitude: tr_lat,
                    bl_longitude: bl_lng,
                    bl_latitude: bl_lat,
                    currency: 'USD',
                    lunit: 'km',
                    lang: 'en_US'
                },
                headers: {
                    'X-RapidAPI-Key': '5d076f39d0mshd8ef81f901f9c35p1761d4jsn4e1ecdf075a6',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            }
        );

        return data;
    }
    catch (error) {
        return null;
    }
}





export const getBookingData = async (bl_lat, bl_lng) => {
    try {
        const { data: { result } } = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
            {
                params: {

                    longitude: `${bl_lng ? bl_lng : "23.90628007496788"}`,
                    filter_by_currency: 'USD',
                    locale: 'en-gb',
                    latitude: `${bl_lat ? bl_lat : "49.76790706769921"}`,
                    order_by: 'review_score',
                    locale: 'en-gb',
                    room_number: '1',
                    units: 'metric',
                    adults_number: '2',
                    checkin_date: '2023-06-23',
                    checkout_date: '2023-06-25',

                    page_number: '0',
                    categories_filter_ids: 'class::2,class::4,free_cancellation::1'
                },
                headers: {
                    'X-RapidAPI-Key': '5d076f39d0mshd8ef81f901f9c35p1761d4jsn4e1ecdf075a6',
                    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                }
            });

       
        return result;
    }
    catch (error) {
        return null;

    }
}

export const getHotelsDescr = async (id) => {
    try {
        const { data } = await axios.get('https://apidojo-booking-v1.p.rapidapi.com/properties/get-description', {
            params: { hotel_ids: `${id}`, languagecode: 'en-us' },
            headers: {
                'X-RapidAPI-Key': '906f0b8034mshe09ae5f09b838d3p187499jsnc0fe546c9961',
                'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
            }
        })

        return data[0].description;
    }
    catch (e) {
        return console.log(e);
    }
}


export const getHotelsPlacesAround = async (id) => {
    try {
        const { data } = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/nearby-places', {
            params: { hotel_id: `${id}`, locale: 'en-gb' },
            headers: {
                'X-RapidAPI-Key': '5d076f39d0mshd8ef81f901f9c35p1761d4jsn4e1ecdf075a6',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        })
        return data.landmarks.populars;
    }
    catch (e) {
        return console.log(e);
    }
}


export const getHotelsReviews = async (id) => {
    try {
        const { data: { result } } = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/reviews', {
            params: {
                sort_type: 'SORT_MOST_RELEVANT',
                locale: 'en-gb',
                hotel_id: `${id}`,
                customer_type: 'solo_traveller,review_category_group_of_friends',
                language_filter: 'en-gb,de,fr'
            },
            headers: {
                'X-RapidAPI-Key': '5d076f39d0mshd8ef81f901f9c35p1761d4jsn4e1ecdf075a6',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        })
        return result;
    }
    catch (e) {
        return console.log(e);
    }
}


export const getHotelsPhotos = async (id) => {
    try {
        const { data } = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/photos', {
            params: { hotel_id: `${id}`, locale: 'en-gb' },
            headers: {
                'X-RapidAPI-Key': '5d076f39d0mshd8ef81f901f9c35p1761d4jsn4e1ecdf075a6',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        })
        return data;
    }
    catch (e) {
        return console.log(e);
    }
}


export const getHotelsDest = async (city) => {
    try {
        const { data } = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/locations', {
            params: { name: `${city}`, locale: 'en-gb' },
            headers: {
                'X-RapidAPI-Key': '5d076f39d0mshd8ef81f901f9c35p1761d4jsn4e1ecdf075a6',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        })
        return data[0].dest_id;
    }
    catch (e) {
        return console.log(e);
    }
}


export const getHotelsData = async (dest) => {
    try {
        const { data: { result } } = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/search', {
            params: {
                checkin_date: '2023-09-27',
                dest_type: 'city',
                units: 'metric',
                checkout_date: '2023-09-28',
                adults_number: '2',
                order_by: 'popularity',
                dest_id: `${dest}`,
                filter_by_currency: 'USD',
                locale: 'en-gb',
                room_number: '1',
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                page_number: '0',
                include_adjacency: 'true'
            },
            headers: {
                'X-RapidAPI-Key': '5d076f39d0mshd8ef81f901f9c35p1761d4jsn4e1ecdf075a6',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        })
        return result;
    }
    catch (e) {
        return console.log(e);
    }
}