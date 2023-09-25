import { router } from "expo-router";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ExpertHomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expert Home Screen</Text>
      <Button
        title="View Profile"
        onPress={() => navigation.navigate("ExpertProfile")}
      />
      <Button
        title="View Tasks"
        onPress={() => navigation.navigate("ExpertTasks")}
      />
      <Button title="Logout" onPress={() => router.replace("/parentLogin")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ExpertHomeScreen;
