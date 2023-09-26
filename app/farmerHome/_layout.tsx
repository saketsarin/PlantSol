import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, View } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabsOptions = {
    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
  };

  const galleryOptions = {
    title: "Gallery",
    tabBarIcon: ({ color }: any) => <TabBarIcon name="image" color={color} />,
  };

  const indexOptions = {
    tabBarLabel: () => (
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: Colors[colorScheme ?? "light"].tint,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <FontAwesome name="camera" size={28} color="white" />
      </View>
    ),
    tabBarButton: (props: any) => <Pressable {...props} />,
  };

  const historyOptions = {
    title: "History",
    tabBarIcon: ({ color }: any) => <TabBarIcon name="history" color={color} />,
  };

  return (
    <Tabs screenOptions={tabsOptions}>
      <Tabs.Screen name="gallery" options={galleryOptions} />
      <Tabs.Screen name="index" options={indexOptions} />
      <Tabs.Screen name="history" options={historyOptions} />
    </Tabs>
  );
}
