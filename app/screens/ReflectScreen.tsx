import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppButton } from "../components/AppButton";

//styles for container and header text
import { screenStyles } from "../styles/screens";

interface ReflectScreenProps {
    navigation: any;
    route: {
        params: {
            name: string;
        };
    }
}

export const ReflectScreen: React.FC<ReflectScreenProps> = ({ navigation, route }) => {
    const { name } = route.params;

    return (

        <View style={screenStyles.container}>
            <View style={screenStyles.content}>
                <Text style={screenStyles.headerText}>Hi, {name}.</Text>
                <Text style={styles.messageText}>
                  We built this app to help you grow in your self-awareness of your spiritual health.
                </Text>
                <Text style={styles.messageText}>
                  After reflecting on your current faith habits, you can view personalized reports and discern what practices God may be calling you deeper into.
                </Text>
                <View style={styles.backAndNextButtons}>
                <AppButton 
                    text="Back" 
                    onPress={() => navigation.goBack()} 
                    variant="secondary"
                    align="left"
                />
                <AppButton
                    text="I'm ready to reflect"
                    onPress={() => navigation.navigate('Questions')}
                    align="right"
                    variant="primary"
                    showArrow={true}
                />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageText: {
        fontSize: 16,
        marginBottom: 16,
    },
    backAndNextButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
    