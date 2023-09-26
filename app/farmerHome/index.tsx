import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  PanResponder,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";

const CameraComponent = ({ navigation }: any) => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const cameraRef = useRef<Camera | null>(null);

  const openCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setIsPreviewVisible(false);
    } else {
      console.error("Camera permission not granted");
    }
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo.uri) {
        let newFile = {
          uri: photo.uri,
          type: `test/${photo.uri.split(".")[1]}`,
          name: `test.${photo.uri.split(".")[1]}`,
        };
        if (capturedImages.length < 5) {
          // Add the captured image URI to the list
          setCapturedImages([...capturedImages, newFile.uri]);
          setIsPreviewVisible(true);
        }
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...capturedImages];
    updatedImages.splice(index, 1);
    setCapturedImages(updatedImages);
  };

  const openImagePreview = (index: number) => {
    setCurrentImageIndex(index);
    setIsPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setCurrentImageIndex(-1);
    setIsPreviewVisible(false);
  };

  const handleScroll = (event: any) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / Dimensions.get("window").width);
    setCurrentImageIndex(index);
  };

  const submitDescription = () => {
    // Handle the submission of the description here
    console.log("Description submitted:", description);
    // You can add your logic to handle the submission, e.g., send it to a server.
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        gestureState.dx > 50, // Check if the user swiped right by a certain threshold
      onPanResponderMove: () => {
        navigation.navigate("Home"); // Navigate to the Home screen when swiped right
      },
    })
  ).current;

  useEffect(() => {
    openCamera();
  }, []);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageStack}
        >
          {capturedImages.map((imageUri, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageWrapper}
              onPress={() => openImagePreview(index)}
            >
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
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.cameraButtons}>
          <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
            <Text style={styles.captureButtonText}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      {isPreviewVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isPreviewVisible}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeImagePreview}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            <View style={styles.previewImageStack}>
              {capturedImages.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                />
              ))}

              <TouchableOpacity
                style={styles.addNewImageBtn}
                onPress={closeImagePreview}
              >
                <FontAwesome5 name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.descriptionContainer}>
              <TextInput
                style={styles.descriptionInput}
                placeholder="Add a description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={submitDescription}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  cameraButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: "#195F57",
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
  },
  captureButtonText: {
    fontSize: 20,
    color: "white",
  },
  imageStack: {
    display: "flex",
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imageWrapper: {
    marginHorizontal: 3,
    marginVertical: 20,
    position: "relative",
  },
  capturedImage: {
    width: 50,
    height: 50,
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
    fontSize: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  previewImageStack: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  addNewImageBtn: {
    width: 150,
    height: 200,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  fullScreenImage: {
    width: 200,
    height: 400,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  descriptionInput: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: "#195F57",
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
  submitButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default CameraComponent;
