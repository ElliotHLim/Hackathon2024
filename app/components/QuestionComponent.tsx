import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { Question } from '../types';

// create a question and answer component. This will be one of many questions in the survey. Make sure the answer is answerable by the user and that the parent component can access the answer. also have a submit button that will submit the answer to the parent component

const QuestionComponent = ({ question, submitAnswer }: { question: Question; submitAnswer: (answer: number) => void }) => {
  const [answer, setAnswer] = useState(50);
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      {/* <TextInput style={styles.input} onChangeText={setAnswer} /> */}
      <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={answer} onValueChange={setAnswer} />
      <Button title="Submit" onPress={() => submitAnswer(answer)} />
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
  question: {
    fontSize: 24,
    fontWeight: 'bold',
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
    width: 200,
    height: 40,
    marginBottom: 20,
  },
});

export default QuestionComponent;