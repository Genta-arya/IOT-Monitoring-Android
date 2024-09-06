import {View, Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native'; 
import ErrorLottie from './../Asset/Error.json'; 
import Loading from './Loading';

const ErrorConnection = ({onReload, loading}) => {
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
         <StatusBar barStyle="light-content" backgroundColor={'white'} />
      <LottieView source={ErrorLottie} autoPlay loop style={styles.lottie} />
      <Text style={styles.text}>Yahh, Gagal Terhubung ke Server</Text>

      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onReload}>
        <Text style={styles.buttonText}>Coba Lagi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: 20,
  },
  lottie: {
    width: '100%',
    height: '20%',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: 'gray',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6283B6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ErrorConnection;
