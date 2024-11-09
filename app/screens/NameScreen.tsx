import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AppButton } from "../components/AppButton";

interface NameScreenProps {
    navigation: any;
}

export const NameScreen: React.FC<NameScreenProps> = ({ navigation }) => {
    const [name, setName] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.headerText}>What's your name?</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Samantha"
                    placeholderTextColor="#9CA3AF"
                />
                <AppButton 
                    text="Next" 
                    onPress={() => console.log('Next pressed')} 
                    align="right"
                />
            </View>
            </View>
        );
    };
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
        },
        content: {
            flex: 1,
            paddingHorizontal: 24,
            paddingVertical: 72,
            justifyContent: "center",
            maxWidth: 480,
            alignSelf: "center",
            width: "100%",
        },
        headerText: {
            fontSize: 36,
            fontFamily: "Satoshi-Regular",
            color: "111827",
            marginBottom: 24,
        },
        input: {
            fontSize: 18,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 8,
            fontFamily: 'Satoshi-Regular',
            padding: 16,
            marginBottom: 24,
        },
    });