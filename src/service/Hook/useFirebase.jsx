import { useEffect, useState } from 'react';
import database from '../Firebase';
import useLoading from '../../utils/Zustand';
import { set } from '@react-native-firebase/database';

const useFirebaseData = (path) => {
  const [data, setData] = useState(null);
  const { loading, setLoading } = useLoading(); 
  const [error, setError] = useState(null);

  useEffect(() => {
   
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const reference = database.ref(path);

    const onValueChange = (snapshot) => {
      setData(snapshot.val());
      
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 1000 milliseconds = 1 second
    };

    const onError = (error) => {
      setError(error);
      // Add a delay of 1 second before setting loading to false
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 1000 milliseconds = 1 second
    };

    reference.on('value', onValueChange, onError);

    // Cleanup listener on unmount
    return () => reference.off('value', onValueChange);
  }, [path, setLoading]); // Add setLoading as a dependency

  return { data, loading, error };
};

export default useFirebaseData;
