import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useLayoutEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { f, fourth, l, s, t } from '../assets';
import { Entypo } from '@expo/vector-icons';


const HomeScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1 relative">
            <ImageBackground className='h-full w-screen' source={s}>
                <View className=" px-6 mt-10 justify-center items-center space-x-2">

                    <View className='w-60  mt-1 rounded-full items-center justify-center'>
                        <Text className='text-[#000] text-2xl font-semibold'>Your Guide</Text>
                        <Entypo name="aircraft" size={24} color="black" />
                    </View>

                </View>


                <View className='px-6 mt-8 space-y-3'>
                    <Text className='text-[#000] text-[42px]'>Enjoy the trip with</Text>
                    <Text className='text-[#EF4444] text-[38px] font-bold'>Personal assistant</Text>
                    <Text className='text-[#EF4444] text-base font-semibold'>
                        This app was created to help in your trip. Its totally free, all for you. Enjoy the journey
                    </Text>
                </View>

                {/*
            <View className="w-[400px] h-[400px] absolute -bottom-72 -right-8">
                <Animatable.Image
                    animation={'fadeIn'}
                    easing='ease-in-out'
                    source={l}
                    className='w-28 h-28 object-cover mt-50 rounded-full'
                />
            </View> */}



                <View className='flex-1 relative items-center justify-center'>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Discover")}
                        
                        className='absolute bottom-20 w-44 h-24 border-l-2 border-r-2 border-t-4 border-[#000000] rounded-full items-center justify-center'>
                        <Animatable.View animation={'pulse'} easing='ease-in-out' iterationCount={'infinite'} className='w-40 h-20 items-center justify-center rounded-full bg-[#EF4444]'>
                            <Text className='text-[#000] text-[36px] font-semibold'>Let`s go</Text>
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default HomeScreen