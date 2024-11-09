import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const dateStr = "2024-11-09T20:54:07.077Z";
const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
};

const createNiceDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', options);
}

async function getPastResults() {
    console.log('Getting past results');
    const db = FIRESTORE_DB;
    const resultsRef = collection(db, 'assessments');
    const resultsSnapshot = await getDocs(resultsRef);
    const resultsList = resultsSnapshot.docs.filter(doc => doc.data().userId === getAuth().currentUser.uid).map(doc => doc.data());
    return resultsList;
}

const PastResults = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const resultsList = await getPastResults();
            setResults(resultsList);
        };

        fetchResults();
    }, []);

    // a list of the past results, with the date and overall score
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Past Results</Text>
            {results.map(result => (
                console.log(result),
                <View key={result.results.date}>
                    <Text style={styles.text}>Date: {createNiceDate(result.results.date)}</Text>
                    <Text style={styles.text}>Overall Score: {result.results.overall}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontFamily: 'Satoshi-Regular',
        color: '#111827',
        marginBottom: 24,
    },
    text: {
        fontSize: 18,
        fontFamily: 'Satoshi-Regular',
        color: '#111827',
    },
});

export default PastResults;