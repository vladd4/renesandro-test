import styles from './CreativeCardUploader.module.scss';

import { CloudUpload } from 'lucide-react';

export default function CreariveCardUploader() {
  return (
    <div className={styles.root}>
      <div>
        <CloudUpload size={45} />
        <p>Upload drag and drop images here</p>
      </div>
    </div>
  );
}
