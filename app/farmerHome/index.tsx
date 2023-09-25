import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ExpoCamera from "expo-camera";

const Camera = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const openCamera = async () => {
    const { status } = await ExpoCamera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setIsVisible(false);
      const data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!data.canceled) {
        let newFile = {
          uri: data.assets[0].uri,
          type: `test/${data.assets[0].uri.split(".")[1]}`,
          name: `test.${data.assets[0].uri.split(".")[1]}`,
        };
        if (capturedImages.length < 5) {
          // Add the captured image URI to the list
          setCapturedImages([...capturedImages, newFile.uri]);
        }
      }
    } else {
      console.error("Camera permission not granted");
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = capturedImages.filter((_, i) => i !== index);
    setCapturedImages(updatedImages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {capturedImages.map((imageUri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image
              source={{ uri: imageUri }}
              style={styles.capturedImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {capturedImages.length >= 5 ? (
        <Text style={styles.limitReachedText}>You have reached the maximum limit of 5 images.</Text>
      ) : (
        <TouchableOpacity
          style={styles.rect5}
          onPress={() => {
            openCamera();
          }}
        >
          <Text style={styles.takeAPicture}>Capture Image</Text>
        </TouchableOpacity>
      )}

      <View>
        {/* Add a text input for descriptions */}
        <TextInput
          style={styles.descriptionInput}
          placeholder="Add a description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        {/* Add a button to submit the description */}
        <Button
          title="Submit Description"
          onPress={() => {
            // Handle the description submission here
            console.log("Description:", description);
            setDescription("");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageWrapper: {
    margin: 10,
    position: "relative",
  },
  capturedImage: {
    width: 100,
    height: 100,
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  removeText: {
    color: "white",
  },
  rect5: {
    width: 201,
    height: 43,
    backgroundColor: "#195F57",
    borderRadius: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  takeAPicture: {
    fontFamily: "Aleo",
    color: "rgba(255,255,255,1)",
    fontSize: 14,
  },
  descriptionInput: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  limitReachedText: {
    color: "red",
    fontSize: 16,
  },
});

export default Camera;
