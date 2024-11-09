import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Circle = ({ score = 75, color = "#000" }) => { // default score for demo
    return (
      <AnimatedCircularProgress
        size={150}
        width={15}
        fill={score} // this controls the fill percentage
        tintColor={color}
        backgroundColor="#f5f5f5"
        rotation={0}
        lineCap="round"
      />
    )
}

export default Circle;