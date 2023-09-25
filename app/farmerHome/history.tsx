import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

const HistoryTab = ({ capturedImages }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.historyText}>Image History</Text>
      <FlatList
        data={capturedImages}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.historyImage} />
        )}
        keyExtractor={(item) => item}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  historyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  historyImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default HistoryTab;
