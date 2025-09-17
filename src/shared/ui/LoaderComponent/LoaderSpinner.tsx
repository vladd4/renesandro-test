import styles from './Loader.module.scss';

import { Loader2 } from 'lucide-react';

export default function LoaderSpinner() {
  return <Loader2 size={20} className={styles.spin} />;
}
