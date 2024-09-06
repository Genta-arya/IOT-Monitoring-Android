import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native'; // Import LottieView

// Ganti 'animation.json' dengan nama file JSON animasi Lottie kamu
import loadingAnimation from './../Asset/loading.json'; 

const Loading = () => {
  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={"white"}/>
      <LottieView
        source={loadingAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});
