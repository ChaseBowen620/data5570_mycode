import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const Button = ({ title, onPress, variant = 'primary', loading = false, disabled = false, style }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  const getButtonStyle = () => {
    if (variant === 'secondary') {
      return [
        styles.button,
        styles.secondaryButton,
        isDarkMode && styles.secondaryButtonDark,
        disabled && styles.buttonDisabled,
        style,
      ];
    }
    return [
      styles.button,
      styles.primaryButton,
      isDarkMode && styles.primaryButtonDark,
      disabled && styles.buttonDisabled,
      style,
    ];
  };
  
  const getTextStyle = () => {
    if (variant === 'secondary') {
      return [
        styles.buttonText,
        styles.secondaryButtonText,
        isDarkMode && styles.secondaryButtonTextDark,
      ];
    }
    return [
      styles.buttonText,
      styles.primaryButtonText,
    ];
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : '#007AFF'} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonDark: {
    backgroundColor: '#0A84FF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonDark: {
    borderColor: '#0A84FF',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  secondaryButtonTextDark: {
    color: '#0A84FF',
  },
});

export default Button;


