import React from "react";
import Cookies from "universal-cookie";
import styles from "../styles/Home.module.scss";
import { userIcon, forwardIcon } from "./svg";

type Props = {
  firstName: string;
  key: string;
  lastName: string;
  createdAt: any;
  userId: any;
  handleSelectUser: (
    userId: any,
    userFname: string,
    userLname: string,
    time: any
  ) => void;
  toggleClass: any;
  setToggleClass: React.Dispatch<React.SetStateAction<any>>;
};

const SingleUser = ({
  toggleClass,
  handleSelectUser,
  setToggleClass,
  firstName,
  key,
  lastName,
  createdAt,
  userId,
}: Props) => {

  const cookies = new Cookies();
  const selectSingleUser = () => {
    setToggleClass(userId)
    cookies.set('singleIdUser', userId);
  }

  return (
    <div
      data-testid="user"
      onMouseDown={selectSingleUser}
      style={{
        backgroundColor: toggleClass === userId ? "#EAEAEA" : "",
        borderRadius: toggleClass ? "4px" : "",
        padding: toggleClass ? "0px 14px 10px 14px" : "",
      }}
      className={styles.user}
      key={key}
      onClick={() => handleSelectUser(userId, firstName, lastName, createdAt)}
    >
      <div className={styles.groupName}>
        <div className={styles.icon}>{userIcon}</div>
        <p className={styles.name}>{`${firstName} ${lastName}`}</p>
      </div>
      <div className={styles.arrow}>{forwardIcon}</div>
    </div>
  );
};

export default SingleUser;
