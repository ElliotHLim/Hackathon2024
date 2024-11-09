import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface WelcomeMessageProps {
  appName: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ appName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        We're glad you're here. {appName} is an app designed to help you track
        your spiritual health.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  message: {
    fontSize: 20,
    color: '#374151',
    lineHeight: 28,
    textAlign: 'left',
  },
});