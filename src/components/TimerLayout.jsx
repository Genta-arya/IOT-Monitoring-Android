import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import useFirebaseData from '../service/Hook/useFirebase';
import database from '../service/Firebase';
import paths from '../utils/Path';

const TimerLayout = () => {
  const {
    data: hour,
    loading: loadingHour,
    error: errorHour,
  } = useFirebaseData(paths.time.hour);

  const {
    data: minute,
    loading: loadingMinute,
    error: errorMinute,
  } = useFirebaseData(paths.time.minute);

  const {
    data: isAlarmActive,
    loading: loadingAlarm,
    error: errorAlarm,
  } = useFirebaseData(paths.pillAutomasi.set);

  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [pickerType, setPickerType] = useState('hour');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [alarmActive, setAlarmActive] = useState(isAlarmActive);

  useEffect(() => {
    if (hour !== null && minute !== null) {
      const currentDate = new Date();
      currentDate.setHours(hour);
      currentDate.setMinutes(minute);
      setSelectedDate(currentDate);
    }
  }, [hour, minute]);

  useEffect(() => {
    setAlarmActive(isAlarmActive);
  }, [isAlarmActive]);

  if (loadingHour || loadingMinute || loadingAlarm) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (errorHour || errorMinute || errorAlarm) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Error:{' '}
          {errorHour?.message || errorMinute?.message || errorAlarm?.message}
        </Text>
      </View>
    );
  }

  const showDatePicker = type => {
    setPickerType(type);
    setPickerVisibility(true);
  };

  const handleConfirm = (event, date) => {
    setPickerVisibility(false);
    if (event.type === 'set' && date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();

      if (pickerType === 'hour') {
        if (hours >= 0 && hours <= 23) {
          database.ref(paths.time.hour).set(hours);
        } else {
          alert('Invalid hour. Please enter a value between 0 and 23.');
        }
      } else if (pickerType === 'minute') {
        if (minutes >= 0 && minutes <= 59) {
          database.ref(paths.time.minute).set(minutes);
        } else {
          alert('Invalid minute. Please enter a value between 0 and 59.');
        }
      }
    }
  };

  const handleSwitchChange = () => {
    const newValue = !alarmActive;
    setAlarmActive(newValue);
    database.ref(paths.pillAutomasi.set).set(newValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <TouchableOpacity onPress={() => showDatePicker('hour')}>
          <Text style={styles.timeText}>{`${
            hour !== null ? (hour < 10 ? `0${hour}` : hour) : '00'
          }`}</Text>
        </TouchableOpacity>
        <Text style={styles.colon}>:</Text>
        <TouchableOpacity onPress={() => showDatePicker('minute')}>
          <Text style={styles.timeText}>{`${
            minute !== null ? (minute < 10 ? `0${minute}` : minute) : '00'
          }`}</Text>
        </TouchableOpacity>
      </View>

      {isPickerVisible && (
        <DateTimePicker
          mode="time"
          is24Hour
          value={selectedDate}
          onChange={handleConfirm}
          display="clock"
          themeVariant="dark"
        />
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Alarm</Text>
        <Switch
          value={alarmActive}
          onValueChange={handleSwitchChange}
          thumbColor={alarmActive ? 'yellow' : 'white'}
          trackColor={{false: '#767577', true: '#767577'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6347',
    padding: 20,
  },
  timerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  colon: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FF6347',
    marginHorizontal: 10,
  },
  switchContainer: {
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default TimerLayout;
