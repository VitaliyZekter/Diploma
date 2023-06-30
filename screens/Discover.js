import { View, Text, SafeAreaView, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react';
import { useLayoutEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';

import MenuContainer from '../components/MenuContainer';
import { ScrollView } from 'react-native';
import { Hotels, Restaurants, Attractions } from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCarDontainer from '../components/ItemCarDontainer';
import { getRestaurants, getHotelsDest, getHotelsData, getAttractions } from '../api/api';
import HotelsContainer from '../components/HotelsContainer';
import { Fontisto } from '@expo/vector-icons';




const Discover = () => {

    const [type, setType] = useState('hotels');
    const [isLoading, setisLoading] = useState(false);
    // const [mainData, setMainData] = useState([]);
    const [restorauntData, setRestorauntData] = useState([]);
    const [attractionsData, setAttractionsData] = useState([]);

    const [hotelsData, setHotelsData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);
    const [city, setCity] = useState('');
    // const [city, setCity] = useState('Lviv')
    const [dest, setDest] = useState('');
    // const [dest, setDest] = useState('-1045268');
    const HOTELS_KEY = 'hotels';
    const DEST_KEY = 'dest';
    const RESTAURANTS_KEY = 'restaurants';
    const ATTRACTIONS_KEY = 'attractions';

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);



    useEffect(() => {
        setisLoading(true);
     

        getRestaurants(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
            storeDataRestaurants(data);
            getDataRestaurants();

            setTimeout(() => {
                setisLoading(false);
            }, 3000)

        })
        
        getAttractions(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
            storeDataAttractions(data);
            getDataAttractions();
            setTimeout(() => {
                setisLoading(false);
            }, 3000)
        })
      
    }, [dest]);


    useEffect(() => {
        getHotelsDest(city).then(result => {
            // AsyncStorage.clear();
            storeDataDest(result);
            getData(DEST_KEY);
            setTimeout(() => {
                setisLoading(false);
            }, 6000)
        })
    }, [city])


    useEffect(() => {
        setisLoading(true);
        getHotelsData(dest).then(res => {
            storeDataHotels(HOTELS_KEY, res);
            getDataHotels(HOTELS_KEY);
            setTimeout(() => {
                setisLoading(false);

            }, 5000)
        });

    }, [dest])





    const storeDataAttractions = async (value) => {
        try {
            if (value) {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem(ATTRACTIONS_KEY, jsonValue);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getDataAttractions = async () => {
        try {

            const jsonValue = await AsyncStorage.getItem(ATTRACTIONS_KEY);
            setAttractionsData(JSON.parse(jsonValue));

        } catch (e) {
            console.log(e);
        }
    }


    const storeDataRestaurants = async (value) => {
        try {
            if (value) {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem(RESTAURANTS_KEY, jsonValue);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getDataRestaurants = async () => {
        try {

            const jsonValue = await AsyncStorage.getItem(RESTAURANTS_KEY);
            setRestorauntData(JSON.parse(jsonValue));


          
        } catch (e) {
            console.log(e);
        }
    }

    const storeDataHotels = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.log(e);
        }
    }


    const getDataHotels = async (key) => {
        try {

            const jsonValue = await AsyncStorage.getItem(key);
            setHotelsData(JSON.parse(jsonValue));

        } catch (e) {
            console.log(e);
        }
    }

    const storeDataDest = async (value) => {
        try {
            if (value) {
                await AsyncStorage.setItem(DEST_KEY, value)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                console.log({ value });
                setDest(value);
            }
        } catch (e) {
            console.log(e);
        }
    }




    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <View className='flex-row items-center justify-between mt-10 px-8'>
                <View>
                    <Text className='text-[40px] text-[#EF4444] font-bold'>Let's start</Text>
                    <Text className='text-[#EF4444] text-[36px]'>your journey</Text>
                </View>
                <Fontisto name="paper-plane" size={44} color="black" />
            </View>

            <View className='border border-black flex-row items-center  mx-4 rounded-xl py-1 px-4 shadow-lg mt-4'>
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: 'geometry' }}
                    placeholder='Search'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // setType('hotels');
                        console.log(details?.geometry?.viewport);
                        setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                        setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                        setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                        setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                        setCity(data.structured_formatting.main_text);
                        // console.log(data.structured_formatting.main_text);

                    }}
                    query={{
                        key: 'AIzaSyanqneXpxXAQpa97JxII89j5Crb4k2KdPw',
                        language: 'en',
                    }}
                />
            </View>
            <ScrollView>


                <View>
                    <View className='flex-row items-center justify-between px-4 mt-8'>
                        <Text className='text-[#EF4444] text-[28px] font-bold'>Results:</Text>
                    </View>
                </View>

              

                {isLoading ? (<ActivityIndicator size="large" color="#00ff04" />) :
                    <>
                        <View className='px-4 mt-8 flex-row items-center justify-evenly flex-wrap'>
                            {type == 'attractions' && (
                                <>
                                    {attractionsData ? (
                                        attractionsData?.map((data, index) => (
                                            <ItemCarDontainer key={index}
                                                imageSrc={data?.photo?.images?.medium?.url}
                                                title={data.name}
                                                location={data?.location_string}
                                                data={data}
                                                isLoading={isLoading}
                                            />
                                        ))) :
                                        (
                                            <Text>Bad connection or we do not have info about it</Text>
                                        )}
                                </>
                            )}
                        </View>

                        <View className='px-4 mt-8 flex-row items-center justify-evenly flex-wrap'>
                            {type == 'restaurants' && (
                                <>
                                    {restorauntData ? (restorauntData?.map((data, index) => (
                                        <ItemCarDontainer key={index}
                                            imageSrc={data?.photo?.images?.medium?.url}
                                            title={data.name}
                                            location={data?.location_string}
                                            data={data}
                                            isLoading={isLoading}
                                        />
                                    ))) :
                                        (
                                            <Text>Bad connection or we do not have info about it</Text>
                                        )
                                    }
                                </>
                            )}
                        </View>


                        <View className='px-4 mt-8 flex-row items-center justify-evenly flex-wrap'>
                            {type == 'hotels' && (
                                <>
                                    {hotelsData ? (hotelsData?.map((data, index) =>
                                    (
                                        <HotelsContainer
                                            key={index}
                                            imageSrc={data?.max_1440_photo_url}
                                            title={data.hotel_name}
                                            location={data?.city_trans}
                                            data={data}
                                            isLoading={isLoading}
                                        />
                                    )))
                                        : (
                                            <Text>Bad connection or we do not have info about it</Text>
                                        )
                                    }
                                </>
                            )}
                        </View>
                    </>
                }
            </ScrollView>
            <View style={{ paddingTop: 2 }} className='bg-[#EF4444] flex-row items-center justify-between px-8 rounded-t-2xl'>
                <MenuContainer
                    key={'attractions'}
                    title='Attractions'
                    imageSrc={Attractions}
                    type={type}
                    setType={setType}
                />
                <MenuContainer
                    key={'hotels'}
                    title='Hotels'
                    imageSrc={Hotels}
                    type={type}
                    setType={setType}
                />
                <MenuContainer
                    key={'restaurants'}
                    title='Restaurants'
                    imageSrc={Restaurants}
                    type={type}
                    setType={setType}
                />
            </View>

        </SafeAreaView>
    )
}

export default Discover
