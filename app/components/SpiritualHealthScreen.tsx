import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Circle from './Circle';
import ColorHash from 'color-hash';
import { Result } from '../types';

interface SpiritualHealthScreenProps {
  category: string;
  score: number;
}

const SpiritualHealthScreen = ({category, score}: SpiritualHealthScreenProps) => { // default score for demo
  var colorHash = new ColorHash({lightness: 0.3, hue: {min: 180, max: 280}});
  console.log('category', category, 'score', score);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <Circle score={score} color={category ? colorHash.hex(category) : undefined}/>
      <Text style={styles.subtitle}>Your spiritual health score</Text>
      <Text style={styles.arrow}>⌄</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,   
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  arrow: {
    fontSize: 30,
    marginTop: 20,
  },
});

export default SpiritualHealthScreen;
