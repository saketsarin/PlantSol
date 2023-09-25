import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  Linking,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (userType: any) => {
    // Simulate different login/home states based on userType
    if (userType === "farmer") {
      // Navigate to the farmer home screen
      router.replace("/farmerHome");
    } else if (userType === "expert") {
      // Navigate to the expert home screen
      router.replace("/expertHome");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoTxt}>PlantSol</Text>

      <Image
        source={require("../assets/images/icon.png")}
        style={styles.image}
      />

      {/* User type buttons */}
      <View style={styles.loginBtnsContainer}>
        <TouchableOpacity
          style={styles.userTypeBtn}
          onPress={() => handleLogin("farmer")}
        >
          <FontAwesome5 name="user" size={22} color="#748F08" />
          <Text style={[styles.buttonText, styles.userTypeText]}>Farmer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userTypeBtn}
          onPress={() => handleLogin("expert")}
        >
          <FontAwesome5 name="user" size={22} color="#748F08" />
          <Text style={[styles.buttonText, styles.userTypeText]}>Expert</Text>
        </TouchableOpacity>
      </View>

      {/* Use other login ID */}
      <Text style={styles.otherLoginText}>Use other login ID</Text>

      {/* Login with other methods */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => alert("Clicked!")}>
          <FontAwesome5 name="facebook" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Clicked!")}>
          <FontAwesome5 name="twitter" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Clicked!")}>
          <FontAwesome5 name="google" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Create an Account */}
      <TouchableOpacity style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Create an account</Text>
      </TouchableOpacity>

      {/* Trouble Accessing Account */}
      <Text style={styles.troubleText}>
        Having trouble accessing your account?{" "}
        <Text
          style={styles.helpLink}
          onPress={() => Linking.openURL("https://www.google.com")}
        >
          Access the help portal.
        </Text>
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logoTxt: {
    color: "#748F08",
    textAlign: "center",
    fontSize: 60,
    fontFamily: "Combo",
    textTransform: "uppercase",
    marginTop: 40,
    marginBottom: 30,
  },

  image: {
    width: 300,
    height: 275,
    marginBottom: 30,
  },

  loginBtnsContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },

  smartIDBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#567DF41A",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    width: 150,
  },

  loginBtn: {
    backgroundColor: "#748F08",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    width: 150,
  },

  buttonText: {
    color: "white",
    fontFamily: "Aleo",
    fontSize: 16,
  },

  smartIDText: {
    color: "#748F08",
  },

  otherLoginText: {
    fontSize: 12,
    fontFamily: "Aleo",
    fontWeight: "bold",
    marginBottom: 20,
  },

  iconContainer: {
    flexDirection: "row",
    gap: 60,
    marginBottom: 30,
  },

  createAccountButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
  },

  createAccountText: {
    fontSize: 18,
    color: "#1B1D28",
    fontFamily: "Aleo",
    fontWeight: "bold",
  },

  troubleText: {
    fontSize: 10,
    fontFamily: "Aleo",
  },

  helpLink: {
    color: "blue",
    textDecorationLine: "underline",
  },

  userTypeBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#567DF41A",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    width: 150,
  },

  userTypeText: {
    color: "#748F08",
  },
});
