import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { createPost, publishPost } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';

const CATEGORIES = [
  { label: 'Technology', value: 'tech' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Finance', value: 'finance' },
  { label: 'Education', value: 'education' },
  { label: 'Retail', value: 'retail' },
  { label: 'Food & Beverage', value: 'food' },
  { label: 'Sustainability', value: 'sustainability' },
  { label: 'Other', value: 'other' },
];

const CreatePostScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Category: '',
    TargetMarket: '',
    BusinessModel: '',
    FundingNeeds: '',
    Status: 'draft',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null });
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.Title.trim()) {
      newErrors.Title = 'Title is required';
    }
    
    if (!formData.Description.trim()) {
      newErrors.Description = 'Description is required';
    }
    
    if (!formData.Category) {
      newErrors.Category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSave = async (publish = false) => {
    if (!validate()) return;
    
    try {
      setLoading(true);
      const postData = {
        ...formData,
        FundingNeeds: formData.FundingNeeds ? parseFloat(formData.FundingNeeds) : null,
        Status: publish ? 'published' : 'draft',
      };
      
      const post = await createPost(postData);
      
      if (publish) {
        await publishPost(post.PostID);
      }
      
      Alert.alert(
        'Success',
        publish ? 'Post created and published!' : 'Post saved as draft!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create post');
    } finally {
      setLoading(false);
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
            Share Your Idea
          </Text>
          
          <Input
            label="Title *"
            value={formData.Title}
            onChangeText={(text) => handleChange('Title', text)}
            placeholder="Enter a catchy title for your idea"
            error={errors.Title}
          />
          
          <View style={styles.pickerContainer}>
            <Text style={[styles.label, isDarkMode && styles.labelDark]}>
              Category *
            </Text>
            <RNPickerSelect
              onValueChange={(value) => handleChange('Category', value)}
              items={CATEGORIES}
              placeholder={{ label: 'Select a category', value: null }}
              style={{
                inputIOS: [
                  styles.picker,
                  isDarkMode && styles.pickerDark,
                  errors.Category && styles.pickerError,
                ],
                inputAndroid: [
                  styles.picker,
                  isDarkMode && styles.pickerDark,
                  errors.Category && styles.pickerError,
                ],
              }}
              value={formData.Category}
            />
            {errors.Category && (
              <Text style={styles.errorText}>{errors.Category}</Text>
            )}
          </View>
          
          <Input
            label="Description *"
            value={formData.Description}
            onChangeText={(text) => handleChange('Description', text)}
            placeholder="Describe your entrepreneurial idea in detail"
            multiline
            error={errors.Description}
          />
          
          <Input
            label="Target Market"
            value={formData.TargetMarket}
            onChangeText={(text) => handleChange('TargetMarket', text)}
            placeholder="Who is your target audience?"
            multiline
          />
          
          <Input
            label="Business Model"
            value={formData.BusinessModel}
            onChangeText={(text) => handleChange('BusinessModel', text)}
            placeholder="How will your business generate revenue?"
            multiline
          />
          
          <Input
            label="Funding Needs ($)"
            value={formData.FundingNeeds}
            onChangeText={(text) => handleChange('FundingNeeds', text.replace(/[^0-9.]/g, ''))}
            placeholder="Enter funding amount if needed"
            keyboardType="numeric"
          />
          
          <View style={styles.buttonContainer}>
            <Button
              title="Save as Draft"
              onPress={() => handleSave(false)}
              variant="secondary"
              loading={loading}
              style={styles.button}
            />
            <Button
              title="Publish"
              onPress={() => handleSave(true)}
              loading={loading}
              style={styles.button}
            />
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
    padding: 20,
    paddingTop: 60,
  },
  content: {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#000000',
  },
  titleDark: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  labelDark: {
    color: '#FFFFFF',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  pickerDark: {
    backgroundColor: '#1C1C1E',
    borderColor: '#38383A',
    color: '#FFFFFF',
  },
  pickerError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
  },
});

export default CreatePostScreen;


