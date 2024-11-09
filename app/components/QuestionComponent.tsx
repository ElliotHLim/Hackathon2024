import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { Question } from '../types';
import { AppButton } from './AppButton';

// create a question and answer component. This will be one of many questions in the survey. Make sure the answer is answerable by the user and that the parent component can access the answer. also have a submit button that will submit the answer to the parent component

const QuestionComponent = ({ question, submitAnswer }: { question: Question; submitAnswer: (answer: number) => void }) => {
  const [answer, setAnswer] = useState(50);
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      <View style={styles.disagreeAgree}>
        <Text>DISAGREE</Text>
        <Text>AGREE</Text>
      </View>
      {/* <TextInput style={styles.input} onChangeText={setAnswer} /> */}
      <Slider 
        minimumTrackTintColor="#587C87"  // The filled part (green in your app's theme)
        maximumTrackTintColor="#E5E7EB"  // The unfilled part (light gray)
        thumbTintColor="#587C87"         // The circular thumb
        style={styles.slider} 
        minimumValue={0} 
        maximumValue={100} 
        step={1} 
        value={answer} 
        onValueChange={setAnswer} />
      <AppButton 
        text="Submit"
        onPress={() => submitAnswer(answer)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  question: {
    fontSize: 20,
    fontFamily: 'Satoshi-Regular',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  disagreeAgree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default QuestionComponent;