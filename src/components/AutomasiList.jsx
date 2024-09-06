import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import useFirebaseData from '../service/Hook/useFirebase';
import {initialData} from '../utils/DataObat';

const CircleChart = () => {
  const pillCounters = initialData.map(item => {
    const {data, loading, error} = useFirebaseData(item.automasi);
    return {...item, value: data, loading, error};
  });

  const isLoading = pillCounters.some(item => item.loading);
  const hasError = pillCounters.some(item => item.error);
  const allDataEmpty = pillCounters.every(item => !item.value);
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

  return (
    <>
      {!allDataEmpty && (
        <View style={styles.container}>
          <Text style={styles.title}>Total Obat</Text>
          <View style={styles.chartContainer}>
            {pillCounters.map(item => (
              <View key={item.id} style={styles.valueWrapper}>
                <View
                  style={[
                    styles.valueContainer,
                    {backgroundColor: item.color},
                  ]}>
                  <Text style={styles.valueText}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </>
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
    
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    color: 'gray',
    paddingBottom: 14,
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
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  valueText: {
    color: 'white',
  fontSize: 30,
    padding: 10,
    borderRadius: 100,
    fontWeight: '900',
  },
  valueLabel: {
    color: 'black',

    fontWeight: 'bold',
  },
});
