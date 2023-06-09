import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getHotelsDescr, getHotelsPlacesAround, getHotelsReviews, getHotelsPhotos } from '../api/api';
import Hyperlink from 'react-native-hyperlink';
import NetInfo from "@react-native-community/netinfo";

const HotelScreen = ({ route }) => {
    const navigation = useNavigation();
    const data = route?.params?.param;

    let id = data.hotel_id;


    let cityName = data.city_name_en;

    const [placesAround, setPlacesAround] = useState([]);
    const [description, setDescription] = useState('');
    const [showRewievs, setShowReviews] = useState(false);
    const [rewievsData, setReviewsData] = useState([]);
    const [showPhotos, setShowPhotos] = useState(false);
    const [hotelsPhotos, setHotelsPhotos] = useState([]);
    const [internetConnection, setInternetConnection] = useState(true);


useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
          console.log(state.isConnected);
          setInternetConnection(state.isConnected);
        });
        return () => {
          unsubscribe();
        };
      }, []);

    useEffect(() => {
        getHotelsDescr(id).then(item => {
            setDescription(item);

        })

        getHotelsPlacesAround(id).then(item => {
            setPlacesAround(item);

        })


    }, [])

    const hotelsPhotosFunc = () => {
        getHotelsPhotos(id).then(item => {
            setHotelsPhotos(item);
            console.log({ hotelsPhotos })

        })
    }

    const rewiewsFunc = () => {
        getHotelsReviews(id).then(item => {
            setReviewsData(item);

        });
    }

    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <ScrollView className='flex-1 px-4 py-6'>
                <View className='relative bg-white shadow-lg'>
                    {/* PHOTO */}
                    <Image
                        source={
                            {
                                uri:
                                    data?.max_1440_photo_url ? data?.max_1440_photo_url : 'https://images.unsplash.com/photo-1554844453-7ea2a562a6c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob3RvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&w=1000&q=80'
                            }
                        }
                        className='w-full h-72 object-cover rounded-2xl'
                    />

                    <View className='absolute flex-row inset-x-0 top-5 justify-between px-6'>
                        <TouchableOpacity className='w-10 h-10 rounded-md items-center justify-center bg-white' onPress={() => navigation.navigate("Discover")}>
                            <FontAwesome name="chevron-left" size={24} color="#EF4444" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* PHOTO END */}



                {/*ADRESS  */}
                <View className="mt-6">
                    <Text className="text-[#EF4444] text-[24px] font-bold">
                        {data?.hotel_name}

                    </Text>
                    <View className="flex-row items-center space-x-2 mt-2">
                        <FontAwesome name="map-marker" size={25} color="#000" />
                        <Text className="text-[#D58574] text-[20px] font-bold">
                            {data?.address_trans}
                        </Text>
                    </View>
                </View>
                {/*ADRESS END */}


                {/* ICONS */}
                <View className="mt-4 flex-row items-center justify-between">
                    {data?.review_score && (
                        <View className=" flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <FontAwesome name="star" size={24} color="#D58574" />
                            </View>
                            <View>
                                <Text className="text-[#515151]">{data?.review_score}</Text>
                                <Text className="text-[#515151]">Ratings</Text>
                            </View>
                        </View>
                    )}
                    {data?.distance_to_cc && (
                        <View className=" flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <FontAwesome name="road" size={24} color="#D58574" />
                            </View>
                            <View>
                                <Text className="text-[#515151]">{data?.distance_to_cc}</Text>
                                <Text className="text-[#515151]">km to center</Text>
                            </View>
                        </View>
                    )}

                    {data?.price_breakdown.currency && (
                        <View className=" flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <FontAwesome name="money" size={24} color="#D58574" />
                            </View>
                            <View>
                                <Text className="text-[#515151] capitalize">
                                    {Math.floor(data?.price_breakdown.currency)}
                                </Text>

                            </View>
                        </View>
                    )}
                </View>

                {/*ICONS END*/}


                {description && (
                    <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#D58574]">
                        {description}
                    </Text>
                )}

                {hotelsPhotos && (
                    <View>
                        {
                            hotelsPhotos?.map((item, index) => {
                                <View key={index} className='bg-emerald-100 rounded-xl mt-5'>
                                    <Image
                                        source={{
                                            uri: item?.url_1440 ? item?.url_1440 :
                                                'https://www.flaticon.com/free-icon/404-error_8903080'
                                        }}
                                        className='w-full h-72 object-cover rounded-2xl'
                                    />
                                </View>
                            })
                        }
                    </View>
                )}


                {/* oTHER ICONS  */}



                <View className='mt-4'>

                    {data?.min_total_price && (
                        <View className="mb-2 flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <FontAwesome name="money" size={24} color="black" />
                            </View>
                            <View>
                                <Text className="text-[#515151] capitalize">
                                    Minimal price: {data?.min_total_price} {data?.price_breakdown.currency}
                                </Text>

                            </View>
                        </View>
                    )}

                    {data?.hotel_include_breakfast ? (
                        <View className="mb-2 flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <MaterialCommunityIcons name="food-variant" size={24} color="black" />
                            </View>
                            <View>
                                <Text className="text-[#515151] capitalize">
                                    Hotel include breakfast
                                </Text>

                            </View>
                        </View>
                    ) : (
                        <View className="mb-2 flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <MaterialCommunityIcons name="food-variant-off" size={24} color="black" />
                            </View>
                            <View>
                                <Text className="text-[#515151] capitalize">
                                    Hotel not include breakfast
                                </Text>

                            </View>
                        </View>
                    )}
                    {data?.has_free_parking ? (
                        <View className=" flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <FontAwesome5 name="parking" size={24} color="black" />
                            </View>
                            <View>
                                <Text className="text-[#515151] capitalize">
                                    Free Parking
                                </Text>

                            </View>
                        </View>
                    ) : (
                        <View className=" flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <FontAwesome5 name="parking" size={24} color="black" />
                            </View>
                            <View>
                                <Text className="text-[#515151] capitalize">
                                    Free parking: No
                                </Text>

                            </View>
                        </View>
                    )}
                </View>


                {/* oTHER ICONS   end*/}


                {placesAround && (<>
                    <Text className='mt-5 font-bold'>Nearby Places of the hotel:</Text>
                    <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4 ">

                        {placesAround.map((n, index) => (
                            <TouchableOpacity
                                key={index}
                                className="px-2 py-1 rounded-lg bg-red-100"
                            >
                                <Text>{n.landmark_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
                )}


                {/*Last SECTIOn */}


                <View className=" space-y-2 mt-4 bg-red-100 rounded-2xl px-4 py-2 mb-7">

                    <View style={{ marginLeft: 75 }} className=" flex-row items-center space-x-2 ">
                        <MaterialCommunityIcons name="cursor-default-click" size={24} color="black" />
                        <Text className='font-bold text-xl'>Clicable links</Text>
                    </View>

                    {data?.url ? (
                        <View className="items-center flex-row space-x-6">
                            <MaterialCommunityIcons name="web" size={24} color="#000" />
                            <Hyperlink linkDefault={true}>
                                <Text className="text-lg">{data?.url}</Text>
                            </Hyperlink>
                        </View>
                    ) :
                        <View className='items-center flex-row space-x-6'>
                            <MaterialCommunityIcons name="web" size={24} color="#000" />
                            <Text style={{ padding: 3 }} className='text-xl'>Website: The information is out of date</Text>
                        </View>}


                    <View className=" flex-row items-center space-x-2">
                        <TouchableOpacity className="items-center flex-row space-x-6" onPressIn={() => hotelsPhotosFunc()} onPress={() => setShowPhotos(!showPhotos)}>
                            <FontAwesome name="photo" size={24} color="#000" />
                            <Text className="text-xl">
                                Click here to get photos of the hotel
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        showPhotos ? (<>
                            <View>
                                {
                                    internetConnection ? (hotelsPhotos?.map((item, index) => (
                                        <View key={index}>
                                            <View className='bg-emerald-100 rounded-xl mt-5'>
                                                <Image
                                                    source={
                                                        {
                                                            uri:
                                                                item?.url_1440 ? item?.url_1440 : 'https://images.unsplash.com/photo-1554844453-7ea2a562a6c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob3RvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&w=1000&q=80'
                                                        }
                                                    }
                                                    className='w-full h-72 object-cover rounded-2xl'
                                                />
                                            </View>
                                        </View>
                                    ))) : (
                                        <>
                                        <Text>This function is not available without internet acess</Text></>
                                    )
                                    
                                }
                            </View>
                            <TouchableOpacity className=' bg-red-100 rounded-xl mt-4 pt-4 flex-row items-center justify-center' onPress={() => setShowPhotos(!showPhotos)}>
                                <Text className='board board-black mb-4 font-bold'>Close</Text>
                            </TouchableOpacity>
                        </>)
                            : (<>
                            
                            </>)
                    }



                    <View className=" flex-row items-center space-x-2">
                        <TouchableOpacity className="items-center flex-row space-x-6" onPressIn={() => rewiewsFunc()} onPress={() => setShowReviews(!showRewievs)}>
                            <MaterialIcons name="preview" size={24} color="#000" />
                            <Text className="text-xl">
                                Click here to get reviews
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {showRewievs ? (
                        <>
                            {rewievsData ?
                                <View>
                                    {rewievsData?.map((item, index) => (
                                        <View key={index} className='board board-[#000] bg-red-100 rounded-xl mt-5'>
                                            <View className='flex-row pt-2 space-x-2'>
                                                <Image
                                                    source={{
                                                        uri: item?.author?.avatar ? item?.author?.avatar : 'https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg'
                                                    }}
                                                    className='w-12 h-12 object-cover rounded-full' style={{ marginLeft: 10 }} />
                                                <View className='w-[250px] pb-2'>
                                                    <Text className='font-bold'>{item.author.name}</Text>
                                                    <Text className='font-bold'>{item.title}</Text>
                                                    {item?.pros && <Text>Positive: {item.pros}</Text>}
                                                    {item?.cons && <Text>Negative: {item.cons}</Text>}
                                                </View>
                                            </View>
                                        </View>


                                    ))

                                    }
                                </View>
                                : (<View className='board board-[#000] bg-red-100 rounded-xl mt-5'>
                                    <Text className='text-[#000]'>No reviews yet or check your internet acess</Text>

                                </View>)
                            }
                            <TouchableOpacity className='bg-red-100 rounded-xl mt-4 pt-4 flex-row items-center justify-center' onPress={() => setShowReviews(!showRewievs)}>
                                <Text className='mb-4 font-bold'>Close</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HotelScreen