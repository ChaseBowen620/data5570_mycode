import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getMyPosts } from '../services/api';
import PostCard from '../components/PostCard';

const MyPostsScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatePost')}
          style={styles.headerButton}
        >
          <Text style={[styles.headerButtonText, isDarkMode && styles.headerButtonTextDark]}>
            + New
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isDarkMode]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    loadPosts();
    
    // Refresh when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadPosts();
    });
    
    return unsubscribe;
  }, [navigation]);
  
  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getMyPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };
  
  const handlePostPress = (post) => {
    navigation.navigate('PostDetail', { postId: post.PostID });
  };
  
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, isDarkMode && styles.emptyTextDark]}>
        You haven't created any posts yet.
      </Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Text style={styles.createButtonText}>Create Your First Post</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.headerTitleDark]}>
          My Posts
        </Text>
        <Text style={[styles.headerSubtitle, isDarkMode && styles.headerSubtitleDark]}>
          Manage your entrepreneurial ideas
        </Text>
      </View>
      
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={() => handlePostPress(item)} />
        )}
        keyExtractor={(item) => item.PostID.toString()}
        contentContainerStyle={[
          styles.listContent,
          posts.length === 0 && styles.listContentEmpty,
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={!loading ? renderEmpty : null}
      />
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
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000000',
  },
  headerTitleDark: {
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  headerSubtitleDark: {
    color: '#8E8E93',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8E8E93',
    marginBottom: 24,
  },
  emptyTextDark: {
    color: '#8E8E93',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerButton: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerButtonTextDark: {
    color: '#0A84FF',
  },
});

export default MyPostsScreen;

