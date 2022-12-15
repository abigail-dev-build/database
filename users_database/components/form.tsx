import React from "react";
import styles from "../styles/Form.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { editSubmitIcon, addSubmitIcon } from "./svg";
import Cookies from "universal-cookie";
import { addUserEP, editSubmitEP } from "../services/endpoint";
import TextInput from "../components/textInput";

type ButtonProps = {
  closeModal: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserDetails: React.Dispatch<React.SetStateAction<any>>;
  userDetail: any;
  userid: any;
  refetch: () => void;
};

type Inputs = {
  firstName: string;
  lastName: string;
};

type EditInputs = {
  firstName: string;
  lastName: string;
  id: string;
};
const Form = ({
  closeModal,
  setShowModal,
  refetch,
  userid,
  setUserDetails,
  userDetail,
}: ButtonProps) => {
  const cookies = new Cookies();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const intialId = cookies.get("singleIdUser");
  const firstName = cookies.get("userFirst");
  const lastName = cookies.get("userLast");

  const onAddSubmit: SubmitHandler<Inputs> = async (data: any) => {
    addUserEP(data)
      .then((response: any) => {
        if (response?.status === 201) {
          setShowModal(false);
          reset();
          refetch();
        }
      })
      .catch((error) => console.log(error));
  };
  const onEditSubmit: SubmitHandler<EditInputs> = async (data: any) => {
    editSubmitEP(data, userid)
      .then((response: any) => {
        if (response?.status === 200) {
          setShowModal(false);
          setUserDetails({
            userId: response?.data?.id,
            userFname: response?.data?.firstName,
            userLname: response?.data?.lastName,
            time: response?.data?.createdAt,
          });
          reset();
          refetch();
        }
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = (data: any) => {
    return userid ? onEditSubmit(data, userid) : onAddSubmit(data);
  };

  return (
    <>
      <div className={styles.darkBG} onClick={closeModal} />
      <div className={styles.centered}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              {userid === intialId ? "Edit User" : "Add User"}
            </h2>
            <p className={styles.formClose} onClick={closeModal}>
              x
            </p>
          </div>
          <form
            className={styles.formWrapper}
            onSubmit={handleSubmit(onSubmit)}
            data-testid="form"
          >
            <TextInput
              type="text"
              id="firstName"
              className={styles.input}
              label="First Name"
              testid="first-name"
              {...register("firstName", {
                required: true,
                pattern: /^[A-Za-z]+$/,
              })}
              errors={errors?.firstName}
              defaultValue={userid ? firstName || userDetail?.userFname : ""}
            />
            <TextInput
              type="text"
              id="lastName"
              className={styles.input}
              label="Last Name"
              testid="last-name"
              {...register("lastName", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              errors={errors?.lastName}
              defaultValue={userid ? lastName : ""}
            />

            <div className={styles.formFooter}>
              <button
                className={styles.button}
                data-testid="cancel-button"
                type="button"
                onClick={() => setShowModal(false)}
              >
                x Cancel
              </button>
              <button
                className={styles.button}
                type="submit"
                disabled={!isValid || !isDirty || isSubmitting}
              >
                <span>{userid ? editSubmitIcon : addSubmitIcon}</span> Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
