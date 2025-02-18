import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { DeviceMotion } from "expo-sensors";

export default function Index() {
  const [rotation, setRotation] = useState({
    alpha: 0, // Rotation around Z-axis (yaw)
    timestamp: 0
  });
  const [prevRotation, setPrevRotation] = useState(rotation)

  const screenWidth = Dimensions.get("window").width; // Screen width
  const rectWidth = screenWidth / 360;
  const screenHeight = Dimensions.get("window").height; // Screen width
  const rectHeight = screenHeight / 360;

  useEffect(() => {
    // Subscribe to DeviceMotion updates
    const subscription = DeviceMotion.addListener((data) => {
      const { rotation, interval, rotationRate } = data;

      //console.log(rotationRate.alpha)

      if (rotation) {
        setRotation({
          alpha: (rotation.alpha * 180) / Math.PI,
          timestamp: rotation.timestamp
        });
      }
    });

    //DeviceMotion.setUpdateInterval(5)

    // Unsubscribe on component unmount
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (prevRotation.alpha == rotation.alpha) {
      
    }
    const a = (rotation.alpha + 360) % 360;
    const b = (prevRotation.alpha + 360) % 360
    const d = a - b;
    const t = rotation.timestamp - prevRotation.timestamp;
    console.log(t)
    setPrevRotation(rotation);
  }, [rotation])

  return (
    <View style={styles.container}>
      <View
          style={{
            position: "absolute",
            left: 100,
            top: (rotation.alpha + 360) % 360 / 360 * screenHeight - rectHeight * 5/2, // Position based on yaw angle
            height: rectWidth * 10,
            width: 30, // Full height of the screen
            backgroundColor: "red",
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});