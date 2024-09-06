import React, { useEffect, useState } from 'react';
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
import database from '../service/Firebase';
import Sound from 'react-native-sound';
import sound_klik from "../Asset/klik.mp3";
import { initialData } from '../utils/DataObat';
import paths from '../utils/Path';

Sound.setCategory('Playback');
const ringtone = new Sound(sound_klik, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Failed to load the sound', error);
    return;
  }
});

const ListObat = () => {
  const [data, setData] = useState(initialData);

  const { data: pillCounter1, loading: loading1, error: error1 } = useFirebaseData(paths.pillAutomasi.servo1);
  const { data: pillCounter2, loading: loading2, error: error2 } = useFirebaseData(paths.pillAutomasi.servo2);
  const { data: pillCounter3, loading: loading3, error: error3 } = useFirebaseData(paths.pillAutomasi.servo3);
  const { data: pillCounter4, loading: loading4, error: error4 } = useFirebaseData(paths.pillAutomasi.servo4);

  const { data: servo1Status } = useFirebaseData(paths.servo1);
  const { data: servo2Status } = useFirebaseData(paths.servo2);
  const { data: servo3Status } = useFirebaseData(paths.servo3);
  const { data: servo4Status } = useFirebaseData(paths.servo4);

  useEffect(() => {
    if (!loading1 && !loading2 && !loading3 && !loading4) {
      setData(prevData => prevData.map(item => {
        switch (item.path) {
          case paths.pillAutomasi.servo1:
            return { ...item, value: pillCounter1 };
          case paths.pillAutomasi.servo2:
            return { ...item, value: pillCounter2 };
          case paths.pillAutomasi.servo3:
            return { ...item, value: pillCounter3 };
          case paths.pillAutomasi.servo4:
            return { ...item, value: pillCounter4 };
          default:
            return item;
        }
      }));
    }
  }, [pillCounter1, pillCounter2, pillCounter3, pillCounter4, loading1, loading2, loading3, loading4]);

  useEffect(() => {
    setData(prevData => prevData.map(item => {
      switch (item.serv) {
        case paths.servo1:
          return { ...item, servoStatus: servo1Status };
        case paths.servo2:
          return { ...item, servoStatus: servo2Status };
        case paths.servo3:
          return { ...item, servoStatus: servo3Status };
        case paths.servo4:
          return { ...item, servoStatus: servo4Status };
        default:
          return item;
      }
    }));
  }, [servo1Status, servo2Status, servo3Status, servo4Status]);

  const updatePillCounter = (path, value) => {
    const ref = database.ref(path);
    ref.once('value', snapshot => {
      const currentValue = snapshot.val() || 0;

      if (currentValue + value < 0) {
        ToastAndroid.show('Cannot decrease below 0', ToastAndroid.SHORT);
        return;
      }

      if (currentValue + value > 25) {
        ToastAndroid.show('Cannot exceed maximum value of 25', ToastAndroid.SHORT);
        return;
      }

      ref.set(currentValue + value).catch(error => {
        ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
      });

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

  const handleSwitchChange = (path, currentStatus) => {
    const newStatus = !currentStatus;
    database.ref(path).set(newStatus).catch(error => {
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
    });

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





  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
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
          style={[styles.button, item.value >= 25 && styles.buttonDisabled]}
          disabled={item.value >= 25}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          value={!!item.servoStatus} 
          onValueChange={() => handleSwitchChange(item.serv, item.servoStatus)}
          thumbColor={item.servoStatus ? 'yellow' : 'white'}
          trackColor={{ false: '#767577', true: '#767577' }}
      
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
    backgroundColor: 'white',
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  value: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginHorizontal: 20, 
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
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ListObat;
