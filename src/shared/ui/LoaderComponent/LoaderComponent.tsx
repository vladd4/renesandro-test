import styles from './Loader.module.scss';

import { Loader } from 'lucide-react';

export default function LoaderComponent() {
  return (
    <div className={styles.root}>
      <Loader size={26} className={styles.svg} />
    </div>
  );
}
