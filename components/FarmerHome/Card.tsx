import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const Card = ({ post }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: post.profilePicture }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
      </View>
      <Text style={styles.cropName}>{post.cropName}</Text>
      {isExpanded && <Text style={styles.description}>{post.description}</Text>}
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.toggleText}>
          {isExpanded ? "Show Less" : "Show More"}
        </Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageStack}
          onScroll={(event) => {
            const xOffset = event.nativeEvent.contentOffset.x;
            const index = Math.round(
              xOffset / (styles.image.width + styles.image.marginRight)
            );
            setCurrentImageIndex(index);
          }}
          pagingEnabled
        >
          {post.images.map((imageUri: string, index: number) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={styles.image}
            />
          ))}
        </ScrollView>
        <View style={styles.navigationDots}>
          {post.images.map((_image: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentImageIndex === index ? "#195F57" : "lightgray",
                },
              ]}
              onPress={() => handleImageChange(index)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
  },
  location: {
    color: "gray",
  },
  cropName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  toggleText: {
    color: "#195F57",
    textDecorationLine: "underline",
    marginBottom: 8,
  },
  content: {
    marginBottom: 8,
  },
  imageStack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 275,
    height: 275,
    marginRight: 8,
    borderRadius: 8,
  },
  navigationDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Card;
