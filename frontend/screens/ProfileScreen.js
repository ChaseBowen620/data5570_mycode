import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { toggleTheme } from '../store/themeSlice';
import Button from '../components/Button';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            navigation.replace('Auth');
          },
        },
      ]
    );
  };
  
  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.avatar, isDarkMode && styles.avatarDark]}>
            <Text style={[styles.avatarText, isDarkMode && styles.avatarTextDark]}>
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </Text>
          </View>
          <Text style={[styles.name, isDarkMode && styles.nameDark]}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text style={[styles.email, isDarkMode && styles.emailDark]}>
            {user?.email}
          </Text>
          {user?.ANumber && (
            <Text style={[styles.anumber, isDarkMode && styles.anumberDark]}>
              A-Number: {user.ANumber}
            </Text>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>
            Settings
          </Text>
          
          <TouchableOpacity
            style={[styles.settingItem, isDarkMode && styles.settingItemDark]}
            onPress={() => dispatch(toggleTheme())}
          >
            <Text style={[styles.settingLabel, isDarkMode && styles.settingLabelDark]}>
              Dark Mode
            </Text>
            <View style={[styles.toggle, isDarkMode && styles.toggleActive]}>
              <View style={[styles.toggleCircle, isDarkMode && styles.toggleCircleActive]} />
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            style={styles.logoutButton}
          />
        </View>
        
        <Text style={[styles.version, isDarkMode && styles.versionDark]}>
          SideHUSTLE v1.0.0
        </Text>
      </View>
    </View>
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
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarDark: {
    backgroundColor: '#0A84FF',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  avatarTextDark: {
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000000',
  },
  nameDark: {
    color: '#FFFFFF',
  },
  email: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 4,
  },
  emailDark: {
    color: '#8E8E93',
  },
  anumber: {
    fontSize: 14,
    color: '#8E8E93',
  },
  anumberDark: {
    color: '#8E8E93',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  sectionTitleDark: {
    color: '#FFFFFF',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
  },
  settingItemDark: {
    backgroundColor: '#1C1C1E',
  },
  settingLabel: {
    fontSize: 16,
    color: '#000000',
  },
  settingLabelDark: {
    color: '#FFFFFF',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#007AFF',
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  logoutButton: {
    borderColor: '#FF3B30',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 20,
  },
  versionDark: {
    color: '#8E8E93',
  },
});

export default ProfileScreen;


