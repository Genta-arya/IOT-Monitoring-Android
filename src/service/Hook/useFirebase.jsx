import { useEffect, useState } from 'react';
import database from '../Firebase';

const useFirebaseData = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const reference = database.ref(path);

    console.log(path)

    const onValueChange = (snapshot) => {
      setData(snapshot.val());
      setLoading(false);
    };

    const onError = (error) => {
      setError(error);
      setLoading(false);
    };

    reference.on('value', onValueChange, onError);

  
    return () => reference.off('value', onValueChange);
  }, [path]);

  return { data, loading, error };
};

export default useFirebaseData;
