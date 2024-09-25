import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "orange",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home" : "home"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mobileKey"
        options={{
          title: "Mobile Key",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "key" : "key"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "book" : "book"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "message" : "message"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
