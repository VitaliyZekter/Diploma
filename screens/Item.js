import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Hyperlink from 'react-native-hyperlink';


const Item = ({ route }) => {
    const navigation = useNavigation();

    const data = route?.params?.param;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);


    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <ScrollView className='flex-1 px-4 py-6'>
                <View className='relative bg-white shadow-lg'>
                    <Image
                        source={
                            {
                                uri:
                                    data?.photo?.images?.large?.url ? data?.photo?.images?.large?.url : 'https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000'
                            }
                        }
                        className='w-full h-80 object-cover rounded-2xl'
                    />

                    <View className='absolute flex-row inset-x-0 top-5 justify-between px-6'>
                        <TouchableOpacity className='w-10 h-10 rounded-md items-center justify-center bg-white' onPress={() => navigation.navigate("Discover")}>
                            <FontAwesome name="chevron-left" size={24} color="#EF4444" />
                        </TouchableOpacity>



                    </View>

                    <View className='absolute flex-row inset-x-0 bottom-5 justify-between px-6'>
                        <View className='flex-row space-x-2 items-center'>

                            <Text className='text-[32px]  font-bold text-gray-100'>
                                {data?.price}
                            </Text>
                        </View>
                    </View>


                </View>
                <View className="mt-6">
                    <Text className="text-[#EF4444] text-[24px] font-bold">
                        {data?.name}
                    </Text>
                    <View className="flex-row items-center space-x-2 mt-2">
                        <FontAwesome name="map-marker" size={25} color="black" />
                        <Text className="text-[#D58574] text-[20px] font-bold">
                            {data?.location_string}
                        </Text>
                    </View>
                </View>

                <View className="mt-4 flex-row items-center justify-between">
                    {data?.rating && (
                        <View className=" flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <FontAwesome name="star" size={24} color="#D58574" />
                            </View>
                            <View>
                                <Text className="text-[#515151]">{data?.rating}</Text>
                                <Text className="text-[#515151]">Ratings</Text>
                            </View>
                        </View>
                    )}


                    {data?.price_level && (
                        <View className=" flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <MaterialIcons name="attach-money" size={24} color="black" />
                            </View>
                            <View>
                                <Text className="text-[#515151]">{data?.price_level}</Text>
                                <Text className="text-[#515151]">Price Level</Text>
                            </View>
                        </View>
                    )}

                    {data?.bearing && (
                        <View className=" flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <FontAwesome5 name="map-signs" size={24} color="black" />
                            </View>
                            <View>
                                <Text className="text-[#515151] capitalize">
                                    {data?.bearing}
                                </Text>
                                <Text className="text-[#515151]">Bearing</Text>
                            </View>
                        </View>
                    )}
                </View>

                {data?.description && (
                    <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#D58574]">
                        {data?.description}
                    </Text>
                )}

                {data?.open_now_text && (
                    <View className="mt-4 flex-row items-center space-x-2">
                        <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                            <FontAwesome name="check-circle" size={24} color="black" />
                        </View>
                        <View>
                            <Text className="text-[#515151]">{data.open_now_text}</Text>
                        </View>
                    </View>
                )}

                {data?.cuisine && (
                    <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
                        {data?.cuisine.map((n) => (
                            <TouchableOpacity
                                key={n.key}
                                className="px-2 py-1 rounded-md bg-emerald-100"
                            >
                                <Text>{n.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <View className=" space-y-2 mt-4 bg-red-100 rounded-2xl px-4 py-2">
                    {data?.phone ? (
                        <TouchableOpacity >
                            <View className="items-center flex-row space-x-6">
                                <FontAwesome name="phone" size={24} color="#000" />
                                <Text className="text-lg" onPress={() => { Linking.openURL(`tel:${data.phone}`); }}>{data?.phone}</Text>
                            </View>
                        </TouchableOpacity>
                    ) :
                        <View className='items-center flex-row space-x-6'>
                            <FontAwesome name="phone" size={24} color="#000" />
                            <Text style={{ padding: 3 }} className='text-xl'>Phone: The information is out of date</Text>
                        </View>}

                    {data?.email ? (
                        <View className="items-center flex-row space-x-6">
                            <FontAwesome name="envelope" size={24} color="#000" />
                            <Text onPress={() => Linking.openURL(`mailto:${data?.email}`) } className="text-lg">{data?.email}</Text>
                        </View>
                    ) :
                        <View className='items-center flex-row space-x-6'>
                            <FontAwesome name="envelope" size={24} color="#000" />
                            <Text style={{ padding: 3 }} className='text-xl'>Email: The information is out of date</Text>
                        </View>}

                    {data?.website ? (
                        <View className="items-center flex-row space-x-6">
                            <MaterialCommunityIcons name="web" size={24} color="#000" />
                            <Hyperlink linkDefault={true}>
                                <Text className="text-lg">{data?.website}</Text>
                            </Hyperlink>
                        </View>
                    ) :
                        <View className='items-center flex-row space-x-6'>
                            <MaterialCommunityIcons name="web" size={24} color="#000" />
                            <Text style={{ padding: 3 }} className='text-xl'>Website: The information is out of date</Text>
                        </View>}


                    {data?.address ? (
                        <View style={{ marginBottom: 10, padding: 4 }} className=" items-center flex-row space-x-6">
                            <FontAwesome name="map-pin" size={24} color="#000" />
                            <Text className="text-lg" style={{ paddingLeft: 8, paddingBottom: 10 }}>{data?.address}</Text>
                        </View>
                    ) :
                        <View className='items-center flex-row space-x-6'>
                            <FontAwesome name="map-pin" size={24} color="#000" />
                            <Text style={{ padding: 3 }} className="text-lg">Adress: The information is out of date</Text>
                        </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Item