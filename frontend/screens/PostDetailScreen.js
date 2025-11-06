import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { getPost, deletePost, publishPost } from '../services/api';
import Button from '../components/Button';

const PostDetailScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  const { user } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isAuthor = post && user && (post.Author?.id === user.id || post.Author?.username === user.username);
  
  useEffect(() => {
    loadPost();
  }, [postId]);
  
  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await getPost(postId);
      setPost(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load post');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };
  
  const handlePublish = async () => {
    console.log('Publish button clicked!', {
      postId,
      postStatus: post?.Status,
      isAuthor,
      user: user?.id,
      postAuthor: post?.Author?.id,
    });
    
    Alert.alert(
      'Publish Post',
      'Are you sure you want to publish this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Publish',
          onPress: async () => {
            try {
              console.log('Publish confirmed, calling publishPost with ID:', postId);
              setActionLoading(true);
              await publishPost(postId);
              console.log('Publish successful, reloading post...');
              await loadPost();
              Alert.alert('Success', 'Post published!');
            } catch (error) {
              console.error('Publish error:', error);
              const errorMessage = error.message || 'Failed to publish post';
              Alert.alert('Error', errorMessage);
            } finally {
              setActionLoading(false);
            }
          },
        },
      ]
    );
  };
  
  const handleDelete = async () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setActionLoading(true);
              await deletePost(postId);
              Alert.alert('Success', 'Post deleted');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete post');
            } finally {
              setActionLoading(false);
            }
          },
        },
      ]
    );
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  if (loading || !post) {
    return (
      <View style={[styles.container, styles.center, isDarkMode && styles.containerDark]}>
        <Text style={[styles.loadingText, isDarkMode && styles.loadingTextDark]}>
          Loading...
        </Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.categoryContainer}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: '#007AFF' },
              ]}
            >
              <Text style={styles.categoryText}>
                {post.Category.toUpperCase()}
              </Text>
            </View>
            {post.Status === 'draft' && (
              <View style={styles.draftBadge}>
                <Text style={styles.draftText}>Draft</Text>
              </View>
            )}
          </View>
          <Text style={[styles.date, isDarkMode && styles.dateDark]}>
            {formatDate(post.CreatedAt)}
          </Text>
        </View>
        
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>
          {post.Title}
        </Text>
        
        {post.Author && (
          <Text style={[styles.author, isDarkMode && styles.authorDark]}>
            By {post.Author.first_name} {post.Author.last_name}
          </Text>
        )}
        
        <Text style={[styles.description, isDarkMode && styles.descriptionDark]}>
          {post.Description}
        </Text>
        
        {post.TargetMarket && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>
              Target Market
            </Text>
            <Text style={[styles.sectionText, isDarkMode && styles.sectionTextDark]}>
              {post.TargetMarket}
            </Text>
          </View>
        )}
        
        {post.BusinessModel && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>
              Business Model
            </Text>
            <Text style={[styles.sectionText, isDarkMode && styles.sectionTextDark]}>
              {post.BusinessModel}
            </Text>
          </View>
        )}
        
        {post.FundingNeeds && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>
              Funding Needs
            </Text>
            <Text style={[styles.fundingAmount, isDarkMode && styles.fundingAmountDark]}>
              ${parseFloat(post.FundingNeeds).toLocaleString()}
            </Text>
          </View>
        )}
        
        {isAuthor && (
          <View style={styles.actions}>
            {post.Status === 'draft' && (
              <Button
                title="Publish Post"
                onPress={handlePublish}
                loading={actionLoading}
                style={styles.actionButton}
              />
            )}
            <Button
              title="Delete Post"
              onPress={handleDelete}
              variant="secondary"
              loading={actionLoading}
              style={[styles.actionButton, styles.deleteButton]}
            />
          </View>
        )}
      </View>
    </ScrollView>
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  draftBadge: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  draftText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#8E8E93',
  },
  dateDark: {
    color: '#8E8E93',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000000',
  },
  titleDark: {
    color: '#FFFFFF',
  },
  author: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  authorDark: {
    color: '#8E8E93',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    color: '#3A3A3C',
  },
  descriptionDark: {
    color: '#EBEBF5',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  sectionTitleDark: {
    color: '#FFFFFF',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3A3A3C',
  },
  sectionTextDark: {
    color: '#EBEBF5',
  },
  fundingAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  fundingAmountDark: {
    color: '#0A84FF',
  },
  actions: {
    marginTop: 32,
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
  deleteButton: {
    borderColor: '#FF3B30',
  },
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  loadingTextDark: {
    color: '#8E8E93',
  },
});

export default PostDetailScreen;

