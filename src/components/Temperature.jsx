import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import paths from '../utils/Path';
import useFirebaseData from '../service/Hook/useFirebase';
import iconSuhu from '../Asset/suhu.png'; // Update dengan nama file ikon suhu Anda
import iconKelembapan from '../Asset/kelembapan.png'; // Update dengan nama file ikon kelembapan Anda

const Temperature = () => {
  const {
    data: environmentData,

    error,
  } = useFirebaseData(paths.environment.root);

  return (
    <>
      {environmentData?.temperature && environmentData?.humidity && (
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.temperatureContainer}>
              <Image source={iconSuhu} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Suhu</Text>
                <Text style={styles.temperatureValue}>
                  {environmentData
                    ? `${environmentData.temperature}°C`
                    : 'No data available'}
                </Text>
              </View>
            </View>
            <View style={styles.humidityContainer}>
              <Image source={iconKelembapan} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.labelhumidity}>Kelembapan</Text>
                <Text style={styles.humidityValue}>
                  {environmentData
                    ? `${environmentData.humidity}%`
                    : 'No data available'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  temperatureContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  humidityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6283B6',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    width: '100%',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 50,

    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#666666',
  },
  labelhumidity: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  temperatureValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#6283B6',
    textAlign: 'right',
  },
  humidityValue: {
    fontSize: 32,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    fontWeight: '900',
    color: '#6283B6',
    textAlign: 'right',
  },
  loadingText: {
    fontSize: 18,
    color: '#333333',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6347',
  },
});

export default Temperature;
