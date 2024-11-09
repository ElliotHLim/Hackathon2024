import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuestionComponent from '../components/QuestionComponent';
import { Category, Question, Result, Assessment } from '../types';
import { questions } from '../data/QuestionList';

const createResult = (question: Question, answer: number): Result => {
    // submit answer to backend
    const result: Result = {
        question: question,
        score: answer,
    };

    return result;
}

// create a question screen that will display one question at a time. The user should be able to answer the question and submit the answer. The parent component should be able to access the answer
const QuestionScreen = ({ questionsFinished }: { questionsFinished: (results: Assessment) => any }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [results, setResults] = useState<Result[]>([]);

    useEffect(() => {
        if (results.length === questions.length) {
            const score = results.reduce((acc, result) => acc + result.score, 0) / results.length;
            const categoryScores = {
                [Category.serviceAndSacrifice]: 0,
                [Category.spiritualPractices]: 0,
                [Category.emotionalHealth]: 0,
                [Category.alignmentWithGodsHeart]: 0,
                [Category.community]: 0,
            };
            
            results.forEach(result => {
                categoryScores[result.question.category] += result.score;
            });
            categoryScores[Category.serviceAndSacrifice] /= questions.filter(
                question => question.category === Category.serviceAndSacrifice
            ).length;

            const res: Assessment = {
                results: results,
                date: new Date().toISOString(),
                serviceAndSacrifice: categoryScores[Category.serviceAndSacrifice],
                spiritualPractices: categoryScores[Category.spiritualPractices],
                emotionalHealth: categoryScores[Category.emotionalHealth],
                alignmentWithGodsHeart: categoryScores[Category.alignmentWithGodsHeart],
                community: categoryScores[Category.community],
                overall: score,
            };
            
            questionsFinished(res);
        }
    }, [results]);


    const handleNextQuestion = (answer: number) => {
        setResults([...results, createResult(questions[currentQuestionIndex], answer)]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
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