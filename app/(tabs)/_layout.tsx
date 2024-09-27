import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        headerShown: false,
        tabBarStyle: {
          borderWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          height: 84,
          borderTopColor: "#232533",
        },
      }}
    >
      <Tabs.Screen
        name="home"
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
