import type { NextPage } from "next";
import Form from "../components/form";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import { editIcon, hamburgerIcon, cancelIcon } from "../components/svg";
import QueryUserDatabase from "../services/useQuery";
import Cookies from "universal-cookie";
import moment from "moment";
import SingleUser from "../components/singleUser";
import Layout from "../components/layout";

const Home: NextPage = () => {
  const cookies = new Cookies();
  const { data: database, refetch, isLoading } = QueryUserDatabase();
  const [showModal, setShowModal] = useState(false);
  const [toggleClass, setToggleClass] = useState(null);
  const [showBurger, setShowBurger] = useState<boolean>(true);
  const [displayContent, setDisplayContent] = useState("");
  const [userDetail, setUserDetails] = useState<any>({});

  const lastObject = database?.data?.[database?.data?.length - 1];

  useEffect(() => {
    if (lastObject) {
      setUserDetails({
        userId: lastObject.id,
        userFname: lastObject.firstName,
        userLname: lastObject.lastName,
        time: lastObject.createdAt,
      });
    }
  }, [lastObject]);

  const openAddUserModal = () => {
    setShowModal(!showModal);
    setUserDetails({});
  };

  if (isLoading)
    return (
      <Layout>
        <div className={styles.emptyBox}>
          <h2>No users yet</h2>
          <button
            type="button"
            onClick={openAddUserModal}
            data-testid="add-user"
          >
            {" "}
            + Add User
          </button>
        </div>
      </Layout>
    );

  const reversedUserData = [...database?.data]?.reverse();

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectUser = (
    userId: string,
    userFname: string,
    userLname: string,
    time: string
  ) => {
    setUserDetails({ userId, userFname, userLname, time });
  };

  const editUser = (id: string, fName: string, lName: string) => {
    setShowModal(!showModal);
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
    <Layout>
      <>
        <div className={styles.burger} onClick={displayNamesList}>
          {showBurger ? hamburgerIcon : cancelIcon}
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem1} style={{ display: displayContent }}>
            <div className={styles.userData}>
              {reversedUserData?.map(
                (datails: {
                  id: string;
                  firstName: string;
                  lastName: string;
                  createdAt: string;
                }) => {
                  return (
                    <SingleUser
                      toggleClass={toggleClass}
                      handleSelectUser={handleSelectUser}
                      setToggleClass={setToggleClass}
                      key={datails?.id || ""}
                      userId={datails?.id}
                      firstName={datails?.firstName}
                      lastName={datails?.lastName}
                      createdAt={datails?.createdAt}
                    />
                  );
                }
              )}
            </div>
            <button
              className={styles.addUser}
              type="button"
              onClick={openAddUserModal}
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
                    userDetail?.userId || lastObject?.id,
                    userDetail?.userFname || lastObject?.firstName,
                    userDetail?.userLname || lastObject?.lastName
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
        {showModal && (
          <Form
            setShowModal={setShowModal}
            closeModal={closeModal}
            initial={lastObject}
            userid={userDetail?.userId}
            refetch={refetch}
            userDetail={userDetail}
            setUserDetails={setUserDetails}
          />
        )}
      </>
    </Layout>
  );
};

export default Home;
