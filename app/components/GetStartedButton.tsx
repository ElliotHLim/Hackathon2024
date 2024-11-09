import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface GetStartedButtonProps {
  onPress: () => void;
}

export const GetStartedButton: React.FC<GetStartedButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>I want to get started</Text>
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
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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