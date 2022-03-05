import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

import styles from './Error.module.css';
export default function Error() {
  return (
    <div className={styles.container}>
      <Alert severity="error" className={styles.alert}>
        <AlertTitle>Network Error</AlertTitle>
        Please check your connection
      </Alert>
    </div>
  );
}
