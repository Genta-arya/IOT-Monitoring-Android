import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Temperature from './src/components/Temperature';
import ListObat from './src/components/ListObat';
import TimerLayout from './src/components/TimerLayout';
import AutomasiList from './src/components/AutomasiList';
import icon from './src/Asset/icon.png';
import useLoading from './src/utils/Zustand';
import Loading from './src/components/Loading';
import useFirebaseData from './src/service/Hook/useFirebase';
import ErrorConnection from './src/components/ErrorConnection';

const App = () => {
  const { loading, reload, connectionError , data:datas } = useFirebaseData();

  const data = [
    { id: '1', component: <TimerLayout /> },
    { id: '2', component: <Temperature /> },
    { id: '4', component: <AutomasiList /> },
    { id: '3', component: <ListObat /> },
  ];

  const renderItem = ({ item }) => item.component;

  if (connectionError ) {
    return <ErrorConnection error={connectionError} loading={loading} onReload={reload} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#6283B6'} />
      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            ListHeaderComponent={
              <View style={styles.header}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <View>
                    <Image source={icon} style={{ width: 50, height: 50 }} />
                  </View>
                  <View>
                    <Text style={styles.appTitle}>SMCC APP</Text>
                    <Text style={styles.subtitle}>
                      Smart Medical Container Controller
                    </Text>
                  </View>
                </View>
              </View>
            }
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            
         
            onRefresh={reload}
            refreshing={loading} 
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  flatListContent: {
    flexGrow: 1,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#6283B6',
    alignItems: 'flex-start', 
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'left', 
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'left', 
  },
});
