import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Users</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.emptyBox}>
          <h2>No users yet</h2>
          <button> + Add User</button>
        </div>
      </div>
    </div>
  );
}
