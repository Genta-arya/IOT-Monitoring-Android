import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import paths from '../utils/Path';
import useFirebaseData from '../service/Hook/useFirebase';

const Temperature = () => {
  const {
    data: environmentData,
    loading,
    error,
  } = useFirebaseData(paths.environment.root);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.label}>Suhu</Text>
          <Text style={styles.temperatureValue}>
            {environmentData
              ? `${environmentData.temperature}°C`
              : 'No data available'}
          </Text>
        </View>
        <View style={styles.humidityContainer}>
          <View>
            <Text style={styles.labelhumidity}>Kelembapan</Text>
            <View style={styles.humidityValueContainer}>
              <Text style={styles.humidityValue}>
                {environmentData
                  ? `${environmentData.humidity}%`
                  : 'No data available'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
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
  humidityValueContainer: {
    width: "100%",
   
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  humidityContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FF6347',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#666666',
  },
  labelhumidity: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  temperatureValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  humidityValue: {
    fontSize: 32,
    padding:10,
    borderRadius: 15,
    backgroundColor:"white",
    fontWeight: 'bold',
    color: '#FF6347',
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
