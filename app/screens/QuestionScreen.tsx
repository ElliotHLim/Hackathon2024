import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuestionComponent from '../components/QuestionComponent';
import { Category, Question, Result, Results } from '../types';
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
const QuestionScreen = ({ questionsFinished }: { questionsFinished: (results: Results) => any }) => {
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

        const [results, setResults] = useState<Result[]>([]);

        const handleNextQuestion = (answer: number) => {
            // submitAnswer(questions[currentQuestionIndex], answer);
            setResults([...results, { question: questions[currentQuestionIndex], score: answer }]);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                const categoryScores = {
                    [Category.serviceAndSacrifice]: 0,
                    [Category.spiritualPractices]: 0,
                    [Category.emotionalHealth]: 0,
                    [Category.alignmentWithGodsHeart]: 0,
                    [Category.community]: 0,
                }
                results.forEach(result => {
                    categoryScores[result.question.category] += result.score;
                });
                categoryScores[Category.serviceAndSacrifice] /= questions.filter(question => question.category === Category.serviceAndSacrifice).length;
                const res: Results = {
                    results: results,
                    date: new Date().toISOString(),
                    serviceAndSacrifice: categoryScores[Category.serviceAndSacrifice],
                    spiritualPractices: categoryScores[Category.spiritualPractices],
                    emotionalHealth: categoryScores[Category.emotionalHealth],
                    alignmentWithGodsHeart: categoryScores[Category.alignmentWithGodsHeart],
                    community: categoryScores[Category.community],
                };
                questionsFinished(
                    res
                );
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