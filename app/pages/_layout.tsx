import { Tabs } from "expo-router";
export default function Layout() {
   return (
    <Tabs>
      <Tabs.Screen name="teacherCRUD/index" options={{ title: "liste" }} /> 
      <Tabs.Screen name="settings" options={{ title: "paramettres" }} /> 
    </Tabs>
  );
}