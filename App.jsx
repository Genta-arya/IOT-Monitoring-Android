import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Temperature from './src/components/Temperature';
import ListObat from './src/components/ListObat';
import TimerLayout from './src/components/TimerLayout';

const App = () => {
  const data = [
    { id: '1', component: <TimerLayout /> },
    { id: '2', component: <Temperature /> },
    { id: '3', component: <ListObat /> },
  ];

  const renderItem = ({ item }) => item.component;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
   
  },
});
