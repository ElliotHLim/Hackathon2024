import { screenStyles } from "../styles/screens";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AppButton } from "../components/AppButton";

interface NameScreenProps {
    navigation: any;
}

export const NameScreen: React.FC<NameScreenProps> = ({ navigation }) => {
    const [name, setName] = useState("");

    return (
        <View style={screenStyles.container}>
            <View style={screenStyles.content}>
                <Text style={screenStyles.headerText}>What's your name?</Text>
                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Samantha"
                    placeholderTextColor="#9CA3AF"
                />
                </View>
                <AppButton 
                    text="Next" 
                    onPress={() => navigation.navigate('Reflect', { name })} 
                    align="right"
                />
            </View>
            </View>
        );
    };
    
    const styles = StyleSheet.create({
        inputContainer: {
            marginBottom: 24,
            borderRadius: 8,
            backgroundColor: 'white',
            // iOS shadow
            shadowColor: '#000',
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            // Android shadow
            elevation: 3,
        },
        input: {
            fontSize: 18,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            fontFamily: 'Satoshi-Regular',
            padding: 16,
        },
    });g