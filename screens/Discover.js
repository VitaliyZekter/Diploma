import { View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react';
import { useLayoutEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { NotFound } from '../assets';
import MenuContainer from '../components/MenuContainer';
import { ScrollView } from 'react-native';
import { Hotels, Restaurants, Attractions } from '../assets';

import ItemCarDontainer from '../components/ItemCarDontainer';
import { getPlacesData,  getHotelsDest, getHotelsData } from '../api/api';
import HotelsContainer from '../components/HotelsContainer';
import { Fontisto } from '@expo/vector-icons';




const Discover = () => {

    const [type, setType] = useState('hotels');
    const [isLoading, setisLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [hotelsData, setHotelsData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);
    const [city, setCity] = useState('Lviv')
    const [dest, setDest] = useState('-1045268');

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() => {
        setisLoading(true);
        if (type != 'hotels') {

            getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
                setMainData([]);
                setTimeout(() => {
                    setisLoading(false);
                }, 3000)
                setMainData(data);
            })

        }
        // if (type == 'hotels') {

        // getHotelsDest(city).then(result => {
        //     setInterval(() => {
        //         setisLoading(false);
        //     }, 3000)
        //     setDest(result);


        // })





        // getHotelsData(dest).then(res => {
        //     setInterval(() => {

        //     }, 3000)
        //     setHotelsData(res);
        // });

        // getHotelsData(dest).then(result =>{
        //     setInterval(() => {

        //     }, 3000)
        //     setHotelsData(result);
        // })

        /********************************************************************** */
        // getBookingData(bl_lat, bl_lng).then(result => {
        //     setInterval(() => {
        //         setisLoading(false);

        //     }, 3000)
        //     setHotelsData([]);
        //     setHotelsData(result);

        // })



    }

        // }
        , [bl_lat, bl_lng, tr_lat, tr_lng, type]);

    useEffect(() => {
        getHotelsDest(city).then(result => {
            setTimeout(() => {
                // setisLoading(false);
            }, 3000)
            setDest(result);
        })
    }, [city])


    useEffect(() => {
        getHotelsData(dest).then(res => {
            setTimeout(() => {
                setisLoading(false);
                setHotelsData(res);
            }, 3000)
            
        });


    }, [dest])




    // console.log({city});
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
                        setType('hotels');
                        console.log(details?.geometry?.viewport);
                        setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                        setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                        setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                        setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                        setCity(data.structured_formatting.main_text);
                        console.log(data.structured_formatting.main_text);

                    }}
                    query={{
                        key: 'AIzaSyBSzTrERdrp242C6FmtqZ-fAO2x2VKLTfc',
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

                {isLoading ? (<ActivityIndicator size="large" color="#00ff04" />) : (<>
                    <View className='px-4 mt-8 flex-row items-center justify-evenly flex-wrap'>
                        {type != 'hotels' && mainData?.length > 0 ?
                            <>
                                {mainData?.map((data, index) => (
                                    <ItemCarDontainer key={index}
                                        imageSrc={data?.photo?.images?.medium?.url ? data?.photo?.images?.medium?.url : 'https://cdn-icons-png.flaticon.com/128/8281/8281994.png'}
                                        title={data.name}
                                        location={data?.location_string}
                                        data={data}
                                        isLoading={isLoading}
                                    />
                                ))}


                            </> : (<>
                                {type == 'hotels' ? <>
                                    {hotelsData?.map((data, index) =>
                                    (
                                        <HotelsContainer
                                            key={index}
                                            imageSrc={data?.max_1440_photo_url}
                                            title={data.hotel_name}
                                            location={data?.city_trans}
                                            data={data}
                                        />
                                    ))
                                    }
                                </> : (
                                    <>
                                        <View className='w-full h-[400px] items-center space-y-8 justify-center'>
                                            <Image source={NotFound} className='w-32 h-32 object-cover'></Image>
                                            <Text className='text-2xl text-[#EF4444] font-semibold' >Wait few seconds. If the loading takes more than 10 seconds, then we don't have any information about this place. Or please check your connection.</Text>
                                        </View>
                                    </>)}

                            </>)}
                    </View>
                </>)}

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
                    key={'hoteels'}
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