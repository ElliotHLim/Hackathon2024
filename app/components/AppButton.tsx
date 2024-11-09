import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface AppButtonProps {
  variant?: "primary" | "secondary"; // primary or secondary button
  onPress: () => void;
  text: string;
  align?: "center" | "right" | "left";
  showArrow?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({ 
  onPress, 
  text = "I want to get started",  // Default text
  align = 'center',  // Default alignment
  variant = 'primary',  // Default variant
  showArrow = false
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        align === 'right' ? styles.alignRight : align === 'left' ? styles.alignLeft : styles.alignCenter,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
      ]} 
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <Text 
          style={[styles.buttonText,
            variant === 'primary' ? styles.primaryText : styles.secondaryText,
          ]
          }>{text}</Text>
        {showArrow && <Text style={styles.arrow}>→</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#658755', // Green
  },
  secondaryButton: {
    backgroundColor: '#E5E7EB',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#374151',
  },
  button: {
    marginTop: 48,
    alignSelf: 'center',
    backgroundColor: '#658755', // Green
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  alignCenter: {
    alignSelf: 'center',
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  alignLeft: {
    alignSelf: 'flex-start',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
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