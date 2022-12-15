import type { NextPage } from "next";
import Form from "../components/form";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { editIcon, hamburgerIcon, cancelIcon } from "../components/svg";
import QueryUserDatabase from "../services/useQuery";
import Cookies from "universal-cookie";
import moment from "moment";
import SingleUser from "../components/singleUser";

const Home: NextPage = () => {
  const cookies = new Cookies();
  const { data: database, refetch, isLoading } = QueryUserDatabase();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<any[]>([]);
  const [toggleClass, setToggleClass] = useState(null);
  const [showBurger, setShowBurger] = useState<boolean>(true);
  const [displayContent, setDisplayContent] = useState("");

  const openModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (isLoading) {
      console.log("...loading");
    } else {
      setUserData(database?.data);
    }
  }, [database?.data, isLoading]);
  const [userDetail, setUserDetails] = useState<any>({});

  const lastObject = userData?.[userData?.length - 1];

  const reversedUserData = [...userData]?.reverse();

  console.log(reversedUserData);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectUser = (
    userId: any,
    userFname: string,
    userLname: string,
    time: any
  ) => {
    setUserDetails({ userId, userFname, userLname, time });
  };

  const editUser = (id: any, fName: string, lName: string) => {
    openModal();
    cookies.set("userid", id);
    cookies.set("userFirst", fName);
    cookies.set("userLast", lName);
  };

  const displayNamesList = () => {
    setShowBurger(!showBurger);
    if (showBurger) {
      setDisplayContent("block");
    } else {
      setDisplayContent("");
    }
  };

  return (
    <div className={styles.container}>
      {showModal && (
        <Form
          setShowModal={setShowModal}
          closeModal={closeModal}
          userid={userDetail?.userId}
          refetch={refetch}
          userDetail={userDetail}
          setUserDetails={setUserDetails}
        />
      )}
      <div className={styles.header}>
        <h1>Users</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.burger} onClick={displayNamesList}>
          {showBurger ? hamburgerIcon : cancelIcon}
        </div>
        {isLoading ? (
          <div className={styles.emptyBox}>
            <h2>No users yet</h2>
            <button type="button" onClick={openModal} data-testid="add-user">
              {" "}
              + Add User
            </button>
          </div>
        ) : (
          <div className={styles.gridContainer}>
            <div
              className={styles.gridItem1}
              style={{ display: displayContent }}
            >
              <div className={styles.userData}>
                {reversedUserData?.map(
                  (datails: {
                    id: React.Key | null | undefined;
                    firstName: string;
                    lastName: string;
                    createdAt: any;
                  }) => {
                    return       (
                      <SingleUser
                        toggleClass={toggleClass}
                        handleSelectUser={handleSelectUser}
                        setToggleClass={setToggleClass}
                        key={datails?.id}
                        userId={datails?.id}
                        firstName={datails?.firstName}
                        lastName={datails?.lastName}
                        createdAt={datails?.createdAt}
                        lastObject={lastObject}
                      />
                    )
                  }
            
                )}
              </div>
              <button
                className={styles.addUser}
                type="button"
                onClick={openModal}
              >
                {" "}
                + Add User
              </button>
            </div>

            <div className={styles.gridItem2}>
              <div className={styles.group2Header}>
                <p>
                  {userDetail?.userFname || lastObject?.firstName}{" "}
                  {userDetail?.userLname || lastObject?.lastName}
                </p>
                <div
                  className={styles.addUser}
                  data-testid="open-edit-modal"
                  onClick={() =>
                    editUser(
                      userDetail?.userId,
                      userDetail?.userFname,
                      userDetail?.userLname
                    )
                  }
                >
                  {" "}
                  <span>{editIcon}</span>Edit
                </div>
              </div>

              <div className={styles.userDescription}>
                <div className={styles.userRow}>
                  <p className={styles.userKey}>First Name</p>
                  <p className={styles.userValue}>
                    {userDetail?.userFname || lastObject?.firstName}
                  </p>
                </div>

                <div className={styles.userRow}>
                  <p className={styles.userKey}>Last Name</p>
                  <p className={styles.userValue}>
                    {userDetail?.userLname || lastObject?.lastName}
                  </p>
                </div>

                <div className={styles.userRow}>
                  <p className={styles.userKey}>Date Added</p>
                  <p className={styles.userValue}>
                    {moment(userDetail?.time).format("MMMM DD, YYYY h:mm A") ||
                      moment(lastObject?.createdAt).format(
                        "MMMM DD, YYYY h:mm A"
                      )}
                  </p>
                </div>

                <div className={styles.userRow}>
                  <p className={styles.userKey}>ID</p>
                  <p className={styles.userValue} id="lastChild">
                    {userDetail?.userId || lastObject?.id}
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
