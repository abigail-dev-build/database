import React from 'react';
import styles from '../styles/Home.module.scss';

type Props = {
  children: JSX.Element
}

function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
       <div className={styles.header}>
        <h1>Users</h1>
      </div>
      <div className={styles.main}>

{children}
      </div>

    </div>
  )
}

export default Layout;
