import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const MenuContainer = ({ title, imageSrc, type, setType }) => {
    const handlePress = () => {
        setType(title.toLowerCase());
    }
    return (
      
        <TouchableOpacity className='items-center justify-between space-y-2' onPress={handlePress}>
            <View className={`w-12 h-12 p-2 items-center justify-center shadow-sm rounded-full ${type === title.toLowerCase() ? 'bg-white' : ''}`}>
                <Image
                    className='w-full h-full object-contain'
                    source={imageSrc}
                />
            </View>
        </TouchableOpacity>
    )
}

export default MenuContainer