import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export default function RootLayout() {
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <>
    <StatusBar hidden={true} />
    <Stack screenOptions={{ headerShown: false, autoHideHomeIndicator: true }} >
      <Stack.Screen name="(tabs)" />
    </Stack>
    </>
  );
}