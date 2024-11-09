import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuestionComponent from '../components/QuestionComponent';
import { Question, Result } from '../types';
import { questions } from '../data/QuestionList';

const submitAnswer = (question: Question, answer: number) => {
    // submit answer to backend
    const result: Result = {
        question: question,
        score: answer,
    };

    console.log("Result: " + result.question.question + " " + result.score);
}

// create a question screen that will display one question at a time. The user should be able to answer the question and submit the answer. The parent component should be able to access the answer
const QuestionScreen = ({ questionsFinished }: { questionsFinished: () => any }) => {
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

        const handleNextQuestion = (answer: number) => {
            submitAnswer(questions[currentQuestionIndex], answer);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                questionsFinished();
            }
        };

        return (
            <View style={styles.container}>
            <QuestionComponent question={questions[currentQuestionIndex]} submitAnswer={handleNextQuestion} />
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
});

export default QuestionScreen;