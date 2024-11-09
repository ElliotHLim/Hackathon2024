import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WelcomeMessage } from "../components/WelcomeMessage";
import { AppButton } from "../components/AppButton";

interface WelcomeScreenProps {
  appName?: string;  // Made optional with default value in component
  navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ appName = "Waypoint", navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome.</Text>
        <WelcomeMessage appName={appName} />
        <AppButton 
          text="I want to get started" 
          onPress={() => navigation.navigate('Name')} 
          align="center"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 72,
    justifyContent: 'center',
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  welcomeText: {
    fontSize: 48,
    fontFamily: 'Satoshi-Regular',
    fontWeight: '600',
    color: '#111827',
    textAlign: 'left',
  },
});