
import { firebase } from '@react-native-firebase/database';


const database = firebase
  .app()
  .database('https://smart-medical-box-berbasis-iot-default-rtdb.asia-southeast1.firebasedatabase.app/');

export default database;
