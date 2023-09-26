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
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
            {/* Heading */}
            <Text style={styles.logoTxt}>PlantSol</Text>

            <View style={styles.loginContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.loginHeading}>Login</Text>
                </View>

                {/* Phone no. input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone no.</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPhone(text)}
                        value={phone}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Password input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>

                {/* Confirm Password input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        secureTextEntry={true}
                    />
                </View>

                {/* Login button */}
                <View style={styles.loginBtnContainer}>

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => handleLogin("farmer")}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
        marginTop: 30,
    },

    loginContainer: {
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        padding: 40,
    },

    headingContainer: {
        justifyContent: "flex-start",
    },

    loginHeading: {
        textAlign: "left",
        fontSize: 30,
        fontFamily: "Aleo",
        marginBottom: 30,
    },

    loginBtnContainer: {
        position: "absolute",
        bottom: 0, // Adjust as needed
        left: 0,
        right: 0,
        alignItems: "center",
    },

    loginBtn: {
        backgroundColor: "#748F08",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        // marginBottom: 20,
        width: 150,
    },

    buttonText: {
        color: "white",
        fontFamily: "Aleo",
        fontSize: 16,
        textAlign: "center",
    },

    inputContainer: {
        marginBottom: 35,
        width: "100%",
    },

    label: {
        fontSize: 16,
        fontFamily: "Aleo",
        marginBottom: 5,
    },

    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});
