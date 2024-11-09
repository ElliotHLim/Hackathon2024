import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import SpiritualHealthScreen from '../components/SpiritualHealthScreen';
import { Assessment } from '../types';


// create multiple sprituial health screens, each with data from an array
// should scroll right to left, each result screen should be one full screen
const Results = ( {assessment} ) => {
    console.log(assessment);
    const { serviceAndSacrifice, spiritualPractices, emotionalHealth, alignmentWithGodsHeart, community, overall } = assessment;
    console.log(serviceAndSacrifice, spiritualPractices, emotionalHealth, alignmentWithGodsHeart, community, overall);
    return (

        <ScrollView style={styles.container} horizontal pagingEnabled>
                <View style={styles.page} key={0}>
                    <SpiritualHealthScreen category="Service and Sacrifice" score={serviceAndSacrifice} />
                </View>
                <View style={styles.page} key={1}>
                    <SpiritualHealthScreen category="Spiritual Practices" score={spiritualPractices} />
                </View>
                <View style={styles.page} key={2}>
                    <SpiritualHealthScreen category="Emotional Health" score={emotionalHealth} />
                </View>
                <View style={styles.page} key={3}>
                    <SpiritualHealthScreen category="Alignment With God's Heart" score={alignmentWithGodsHeart} />
                </View>
                <View style={styles.page} key={4}>
                    <SpiritualHealthScreen category="Community" score={community} />
                </View>
                <View style={styles.page} key={5}>
                    <SpiritualHealthScreen category="Overall" score={overall} />
                </View>
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