import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const PostCard = ({ post, onPress }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getCategoryColor = (category) => {
    const colors = {
      tech: '#007AFF',
      healthcare: '#34C759',
      finance: '#FF9500',
      education: '#AF52DE',
      retail: '#FF2D55',
      food: '#FF9500',
      sustainability: '#32D74B',
      other: '#8E8E93',
    };
    return colors[category] || colors.other;
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isDarkMode && styles.cardDark,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.categoryContainer}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(post.Category) }]}>
            <Text style={styles.categoryText}>{post.Category}</Text>
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
      
      <Text
        style={[styles.description, isDarkMode && styles.descriptionDark]}
        numberOfLines={3}
      >
        {post.Description}
      </Text>
      
      {post.Author && (
        <View style={styles.authorContainer}>
          <Text style={[styles.author, isDarkMode && styles.authorDark]}>
            By {post.Author.first_name} {post.Author.last_name}
          </Text>
        </View>
      )}
      
      {post.FundingNeeds && (
        <View style={styles.fundingContainer}>
          <Text style={[styles.fundingLabel, isDarkMode && styles.fundingLabelDark]}>
            Funding: ${parseFloat(post.FundingNeeds).toLocaleString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1C1C1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  draftBadge: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
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
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000000',
  },
  titleDark: {
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#3A3A3C',
    marginBottom: 12,
  },
  descriptionDark: {
    color: '#EBEBF5',
  },
  authorContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  authorContainerDark: {
    borderTopColor: '#38383A',
  },
  author: {
    fontSize: 12,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  authorDark: {
    color: '#8E8E93',
  },
  fundingContainer: {
    marginTop: 8,
  },
  fundingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  fundingLabelDark: {
    color: '#0A84FF',
  },
});

export default PostCard;


