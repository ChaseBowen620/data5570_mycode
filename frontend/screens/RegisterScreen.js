import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/authSlice';
import Button from '../components/Button';
import Input from '../components/Input';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    ANumber: '',
    first_name: '',
    last_name: '',
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('MainTabs');
    }
  }, [isAuthenticated, navigation]);
  
  useEffect(() => {
    if (error) {
      setErrors({ general: error });
    }
  }, [error]);
  
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null });
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }
    
    if (!formData.ANumber.trim()) {
      newErrors.ANumber = 'A-Number is required';
    }
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleRegister = () => {
    if (validate()) {
      dispatch(clearError());
      const { passwordConfirm, ...registerData } = formData;
      dispatch(register(registerData));
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, isDarkMode && styles.containerDark]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={[styles.title, isDarkMode && styles.titleDark]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
            Join SideHUSTLE to share your ideas
          </Text>
          
          {errors.general && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.general}</Text>
            </View>
          )}
          
          <Input
            label="Username"
            value={formData.username}
            onChangeText={(text) => handleChange('username', text)}
            placeholder="Choose a username"
            autoCapitalize="none"
            error={errors.username}
          />
          
          <Input
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          
          <Input
            label="A-Number"
            value={formData.ANumber}
            onChangeText={(text) => handleChange('ANumber', text)}
            placeholder="Enter your A-Number"
            autoCapitalize="none"
            error={errors.ANumber}
          />
          
          <Input
            label="First Name"
            value={formData.first_name}
            onChangeText={(text) => handleChange('first_name', text)}
            placeholder="Enter your first name"
            error={errors.first_name}
          />
          
          <Input
            label="Last Name"
            value={formData.last_name}
            onChangeText={(text) => handleChange('last_name', text)}
            placeholder="Enter your last name"
            error={errors.last_name}
          />
          
          <Input
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
          />
          
          <Input
            label="Confirm Password"
            value={formData.passwordConfirm}
            onChangeText={(text) => handleChange('passwordConfirm', text)}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.passwordConfirm}
          />
          
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={isLoading}
            style={styles.button}
          />
          
          <View style={styles.footer}>
            <Text style={[styles.footerText, isDarkMode && styles.footerTextDark]}>
              Already have an account?{' '}
            </Text>
            <Text
              style={[styles.link, isDarkMode && styles.linkDark]}
              onPress={() => navigation.navigate('Login')}
            >
              Sign In
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 24,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000000',
  },
  titleDark: {
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: '#8E8E93',
  },
  subtitleDark: {
    color: '#8E8E93',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  button: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  footerTextDark: {
    color: '#8E8E93',
  },
  link: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  linkDark: {
    color: '#0A84FF',
  },
});

export default RegisterScreen;


