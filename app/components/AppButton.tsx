import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface AppButtonProps {
  onPress: () => void;
  text: string;
  align?: "center" | "right";
}

export const AppButton: React.FC<AppButtonProps> = ({ 
  onPress, 
  text = "I want to get started",  // Default text
  align = 'center'  // Default alignment
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        align === 'right' ? styles.alignRight : styles.alignCenter
      ]} 
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{text}</Text>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 48,
    alignSelf: 'center',
    backgroundColor: '#658755', // Green
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alignCenter: {
    alignSelf: 'center',
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Satoshi-Regular',
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  arrow: {
    fontSize: 18,
    color: 'white',
    marginLeft: 8,
  },
});