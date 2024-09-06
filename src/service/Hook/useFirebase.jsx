import {useEffect, useState, useCallback} from 'react';
import database from '../Firebase';
import useLoading from '../../utils/Zustand';

const useFirebaseData = path => {
  const [data, setData] = useState(null);
  const {loading, setLoading} = useLoading();
  const [error, setError] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0); // untuk trigger reload

  const reload = useCallback(() => {
    setLoading(true);
    setData(null);
    setReloadTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    const connectionTimeout = setTimeout(() => {
      if (data === null) {
        setConnectionError(true);
      }
      setLoading(false);
    }, 2000);

    const reference = database.ref(path);

    const onValueChange = snapshot => {
    
        setData(snapshot.val());

        setLoading(false);
        setConnectionError(false);
        clearTimeout(connectionTimeout);
      } 

      if (data === null) {
        setConnectionError(true);
      }
    
   

    const onError = error => {
      console.log(error);
      setError(error);
      setLoading(false);
      clearTimeout(connectionTimeout);
    };

    reference.on('value', onValueChange, onError);

    return () => {
      reference.off('value', onValueChange);
      clearTimeout(connectionTimeout);
    };
  }, [path, reloadTrigger]);

  return {data, loading, error, connectionError, reload};
};

export default useFirebaseData;
