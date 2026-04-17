import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colors from '../utils/colors';

export default function Button({ title, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 rounded-xl shadow-lg"
    >
      <Text className="text-white text-lg font-bold text-center">{title}</Text>
    </TouchableOpacity>
  );
}