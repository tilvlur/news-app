import { useCallback, useEffect, useState } from "react";
import { ReactComponent as LoginIcon } from "./i/login.svg";
import { ReactComponent as LogoutIcon } from "./i/logout.svg";
import styles from "./Login.module.scss";
import Popup from "./Popup";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/hooks";
import { resetPassError, selectLoginData } from "../loginSlice";

function Login() {
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [isCloseAfterPass, setIsCloseAfterPass] = useState<boolean>(false);
  const { passStatus } = useAppSelector(selectLoginData);
  const dispatch = useAppDispatch();

  const onBtnClickHandler = () => {
    setIsShowPopup(!isShowPopup);
    if (passStatus === "error") dispatch(resetPassError());
  };

  const setIsShowPopupCallback = useCallback(
    (isShow) => setIsShowPopup(isShow),
    [],
  );

  useEffect(() => {
    if (passStatus === "pass" && !isCloseAfterPass) {
      setIsShowPopup(false);
      setIsCloseAfterPass(true);
    } else if (passStatus !== "pass") {
      setIsCloseAfterPass(false);
    }
  }, [isCloseAfterPass, passStatus]);

  // RENDER
  const renderLoginIcon =
    passStatus === "pass" ? (
      <LogoutIcon className={styles.button__icon} />
    ) : (
      <LoginIcon className={styles.button__icon} />
    );

  const renderPopup = isShowPopup ? (
    <Popup
      isCloseAfterPass={isCloseAfterPass}
      setIsShowPopup={setIsShowPopupCallback}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        type="button"
        onClick={onBtnClickHandler}
      >
        {renderLoginIcon}
      </button>
      {renderPopup}
    </div>
  );
}

export default Login;
