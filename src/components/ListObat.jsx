import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  ToastAndroid,
} from 'react-native';
import useFirebaseData from '../service/Hook/useFirebase';
import paths from '../utils/Path';
import database from '../service/Firebase';
import Sound from 'react-native-sound';
import sound_klik from "../Asset/klik.mp3";

// Inisialisasi Sound
Sound.setCategory('Playback');
const ringtone = new Sound(sound_klik, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Failed to load the sound', error);
    return;
  }
});

const ListObat = () => {
  const {
    data: pillCounter1,
    loading: loading1,
    error: error1,
  } = useFirebaseData(paths.pillAutomasi.servo1);
  const {
    data: pillCounter2,
    loading: loading2,
    error: error2,
  } = useFirebaseData(paths.pillAutomasi.servo2);
  const {
    data: pillCounter3,
    loading: loading3,
    error: error3,
  } = useFirebaseData(paths.pillAutomasi.servo3);
  const {
    data: pillCounter4,
    loading: loading4,
    error: error4,
  } = useFirebaseData(paths.pillAutomasi.servo4);

  const updatePillCounter = (path, value) => {
    const ref = database.ref(path);
    ref.once('value', snapshot => {
      const currentValue = snapshot.val() || 0;

      // Cek jika nilai saat ini 0 dan value negatif
      if (currentValue === 0 && value < 0) {
        ToastAndroid.show('Cannot decrease below 0', ToastAndroid.SHORT);
        return;
      }

      ref.set(currentValue + value).catch(error => {
        ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
      });

      // Mainkan ringtone
      if (ringtone) {
        ringtone.play((success) => {
          if (success) {
            console.log('Successfully played the sound');
          } else {
            console.log('Failed to play the sound');
          }
        });
      }
    });
  };

  const handleSwitchChange = (path, value) => {
    const newValue = !value;
    database.ref(path).set(newValue).catch(error => {
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
    });

    // Mainkan ringtone
    if (ringtone) {
      ringtone.play((success) => {
        if (success) {
          console.log('Successfully played the sound');
        } else {
          console.log('Failed to play the sound');
        }
      });
    }
  };

  if (loading1 || loading2 || loading3 || loading4) {
    return (
      <View style={styles.card}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error1 || error2 || error3 || error4) {
    return (
      <View style={styles.card}>
        <Text>
          Error:{' '}
          {error1?.message ||
            error2?.message ||
            error3?.message ||
            error4?.message}
        </Text>
      </View>
    );
  }

  const data = [
    {
      id: '1',
      label: 'Obat A',
      value: pillCounter1,
      path: paths.pillAutomasi.servo1,
      color: '#FF6347',
    }, // Merah
    {
      id: '2',
      label: 'Obat B',
      value: pillCounter2,
      path: paths.pillAutomasi.servo2,
      color: '#FFD700',
    }, // Kuning
    {
      id: '3',
      label: 'Obat C',
      value: pillCounter3,
      path: paths.pillAutomasi.servo3,
      color: '#32CD32',
    }, // Hijau
    {
      id: '4',
      label: 'Obat D',
      value: pillCounter4,
      path: paths.pillAutomasi.servo4,
      color: '#1E90FF',
    }, // Biru
  ];

  const renderItem = ({item}) => (
    <View style={[styles.card, {backgroundColor: item.color}]}>
      <Text style={styles.label}>{item.label}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => updatePillCounter(item.path, -1)}
          activeOpacity={0.7}
          style={[styles.button, item.value <= 0 && styles.buttonDisabled]}
          disabled={item.value <= 0}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{item.value || '0'}</Text>
        <TouchableOpacity
          onPress={() => updatePillCounter(item.path, 1)}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switchContainer}>
     
        <Switch
          value={!!item.value} // Convert to boolean if necessary
          onValueChange={() => handleSwitchChange(item.path, item.value)}
          thumbColor={item.value ? '#FF6347' : '#FFFFFF'}
          trackColor={{ false: '#767577', true: '#FF6347' }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 20, // Jarak antara tombol dan nilai
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FF6347',
    fontSize: 24,
    fontWeight: 'bold',
  },
  switchContainer: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ListObat;
