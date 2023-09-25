import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

const Gallery: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [images, setImages] = useState<MediaLibrary.Asset[]>([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Request gallery permission
    requestGalleryPermission();
  }, []);

  useEffect(() => {
    // Load photos when permission is granted
    if (selectedImages.length === 0) {
      loadPhotos();
    }
  }, [selectedImages]);

  const requestGalleryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      console.log("Gallery permission granted");
      loadPhotos();
    } else {
      console.log("Gallery permission denied");
    }
  };

  const loadPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 100, // Number of photos to retrieve (adjust as needed)
      });
      setImages(assets);
    } catch (error) {
      console.error("Error loading photos:", error);
    }
  };

  const toggleImageSelection = (uri: string) => {
    if (selectedImages.includes(uri)) {
      setSelectedImages(selectedImages.filter((imageUri) => imageUri !== uri));
    } else {
      if (selectedImages.length < 5) {
        setSelectedImages([...selectedImages, uri]);
      } else {
        console.log("Maximum limit of 5 images reached.");
      }
    }
  };

  const renderImageItem = ({ item }: { item: MediaLibrary.Asset }) => {
    const isSelected = selectedImages.includes(item.uri);

    return (
      <TouchableOpacity
        style={isSelected ? styles.selectedImage : styles.image}
        onPress={() => toggleImageSelection(item.uri)}
      >
        <Image source={{ uri: item.uri }} style={styles.imagePreview} />
      </TouchableOpacity>
    );
  };

  const submitImagesWithDescription = () => {
    // Here, you can handle the submission of selectedImages and description.
    console.log("Selected Images:", selectedImages);
    console.log("Description:", description);

    // Reset the selectedImages and description state after submission.
    setSelectedImages([]);
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.uri}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />

      <TextInput
        style={styles.descriptionInput}
        placeholder="Add a description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Button
        title="Submit Images"
        onPress={submitImagesWithDescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  image: {
    flex: 1,
    margin: 4,
  },
  selectedImage: {
    flex: 1,
    margin: 4,
    borderWidth: 2,
    borderColor: "blue",
  },
  imagePreview: {
    flex: 1,
    aspectRatio: 1,
  },
  descriptionInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default Gallery;
