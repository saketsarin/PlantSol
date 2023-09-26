import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Card from "../../components/FarmerHome/Card";

const SocialMediaFeed = () => {
  const feedData = [
    {
      id: 1,
      profilePicture: "https://random.imagecdn.app/200/200",
      username: "JohnDoe",
      location: "New York, NY",
      cropName: "Beautiful Sunflowers",
      description: "Visited a sunflower field today. 🌻",
      images: [
        "https://random.imagecdn.app/500/500",
        "https://random.imagecdn.app/500/500",
        "https://random.imagecdn.app/500/500",
        ,
      ],
    },
    {
      id: 2,
      profilePicture: "https://example.com/profile.jpg",
      username: "JohnDoe",
      location: "New York, NY",
      cropName: "Beautiful Sunflowers",
      description: "Visited a sunflower field today. 🌻",
      images: [
        "https://example.com/image1.jpg",
        "https://random.imagecdn.app/500/500",
        "https://random.imagecdn.app/500/500",
        ,
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {feedData.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginHorizontal: 5,
    marginVertical: 20,
  },
});

export default SocialMediaFeed;
