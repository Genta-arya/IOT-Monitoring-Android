import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import useFirebaseData from '../service/Hook/useFirebase';
import {initialData} from '../utils/DataObat';

const CircleChart = () => {
  // Mengambil data pill counter menggunakan custom hook berdasarkan initialData
  const pillCounters = initialData.map(item => {
    const {data, loading, error} = useFirebaseData(item.automasi); // Perbaiki path
    return {...item, value: data, loading, error};
  });

  // Cek apakah ada data yang masih loading
  const isLoading = pillCounters.some(item => item.loading);
  const hasError = pillCounters.some(item => item.error);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FF6347" />;
  }

  if (hasError) {
    return (
      <View style={styles.container}>
        <Text>Error in loading data</Text>
      </View>
    );
  }

  const total = pillCounters.reduce((sum, item) => sum + (item.value || 0), 0);

  const getValueSize = value => {
    return ((value || 0) / total) * 100; // Persentase ukuran nilai
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Obat</Text>
      <View style={styles.chartContainer}>
        {pillCounters.map(item => (
          <View key={item.id} style={styles.valueWrapper}>
            <View
              style={[styles.valueContainer, {backgroundColor: item.color}]}>
              <Text style={styles.valueText}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CircleChart;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    borderTopLeftRadius: 40,
    elevation: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '900',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  valueWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  valueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: 60, // Ukuran tetap untuk nilai
    height: 60, // Ukuran tetap untuk nilai
    borderRadius: 50, // Membuat bentuk bulat
    marginBottom: 10,
  },
  valueText: {
    color: '#FF6347',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
    fontWeight: '900',
  },
  valueLabel: {
    color: 'black',

    fontWeight: 'bold',
  },
});
