import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import SpiritualHealthScreen from '../components/SpiritualHealthScreen';


// create multiple sprituial health screens, each with data from an array

type ResultsResponse = {
    title: string;
    score: number;
};

type ResultsResponseCollection = {
    results: ResultsResponse[];
    date: string;
}

// dummy data
const dummyResults: ResultsResponse[] = [
    {
        title: 'Spiritual Health',
        score: 60,
    },
    {
        title: 'Physical Health',
        score: 80,
    },
    {
        title: 'Mental Health',
        score: 70,
    },
];

// should scroll right to left, each result screen should be one full screen
const Results = ({ results = dummyResults }: ResultsResponseCollection) => {
    return (

        <ScrollView style={styles.container} horizontal pagingEnabled>
            {results.map((result, index) => (
                <View style={styles.page} key={index}>
                    <SpiritualHealthScreen score={result.score} title={result.title} />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    page: {
        width: Dimensions.get('window').width,
    },
});


export default Results;