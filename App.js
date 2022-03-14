import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import JobsScreen from "./src/screens/JobsScreen";

export default function App() {
  return (
    <View>
      <JobsScreen></JobsScreen>
    </View>
  );
}

