

import paths from "./Path";


export const initialData = [
  {
    id: '1',
    label: 'Obat A',
    value: null, 
    automasi: paths.pillCounter1,
    path: paths.pillAutomasi.servo1,
    serv: paths.servo1,
    color: '#1E90FF',
  },
  {
    id: '2',
    label: 'Obat B',
    value: null, 
    automasi: paths.pillCounter2,
    path: paths.pillAutomasi.servo2,
    serv: paths.servo2,
    color: '#FFD700',
  },
  {
    id: '3',
    label: 'Obat C',
    value: null, 
    automasi: paths.pillCounter3,
    path: paths.pillAutomasi.servo3,
    serv: paths.servo3,
    color: '#FF6347',
  },
  {
    id: '4',
    label: 'Obat D',
    value: null, 
    path: paths.pillAutomasi.servo4,
    automasi: paths.pillCounter4,
    serv: paths.servo4,
    color: '#32CD32',
  },
];
