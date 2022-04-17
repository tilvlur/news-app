import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./Popup.module.scss";
import {
  resetPassError,
  selectLoginData,
  setLogin,
  setLogout,
} from "../../loginSlice";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks/hooks";
import { ReactComponent as UserIcon } from "./i/userIcon.svg";
import { ReactComponent as AdminIcon } from "./i/adminIcon.svg";
import { ReactComponent as CloseIcon } from "./i/closeIcon.svg";
import Input from "../../../../common/components/Input";
import Button from "../../../../common/components/Button";

interface PopupProps {
  isCloseAfterPass: boolean;
  setIsShowPopup: (isShowPopup: boolean) => void;
}

function Popup({ isCloseAfterPass, setIsShowPopup }: PopupProps) {
  // HOOKS
  const popup = useRef<HTMLDivElement>(null);
  const [login, setLoginVal] = useState<string>("");
  const [password, setPasswordVal] = useState<string>("");

  const dispatch = useAppDispatch();

  const { currentUserRole, passStatus, currentUserData } =
    useAppSelector(selectLoginData);
  const userName = currentUserData ? currentUserData.userName : null;

  const onLoginChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLoginVal(e.target.value),
    [],
  );

  const onPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPasswordVal(e.target.value),
    [],
  );

  // HANDLERS
  const onLoginHandle = () => {
    dispatch(setLogin({ login, password }));
    setLoginVal("");
    setPasswordVal("");
  };

  const onLogoutHandle = () => {
    dispatch(setLogout());
  };

  const onCloseBtnHandle = () => {
    setIsShowPopup(false);
    if (passStatus === "error") dispatch(resetPassError());
  };

  // Закрыть popup по клику снаружи
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popup.current && !popup.current.contains(e.target as Node)) {
        onCloseBtnHandle();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  });

  const isMainBtnDisabled =
    !login || !password || (passStatus === "error" && (!login || !password));

  // RENDER ELEMENTS
  const renderMainBtn =
    passStatus === "pass" ? (
      <Button text="Выйти" onClick={onLogoutHandle} />
    ) : (
      <Button
        text="Войти"
        onClick={onLoginHandle}
        disabled={isMainBtnDisabled}
      />
    );

  const renderLoginForm = (
    <form className={styles.form}>
      <div>
        <Input
          htmlFor="login"
          label="Login:"
          type="text"
          value={login}
          onChange={onLoginChange}
        />

        <Input
          htmlFor="password"
          label="Password:"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />

        {passStatus === "error" ? (
          <div className={styles.error}>Invalid login or password</div>
        ) : null}
      </div>
      {renderMainBtn}
    </form>
  );

  const userIcon = () => {
    if (currentUserRole === "user") return <UserIcon className={styles.icon} />;
    if (currentUserRole === "admin")
      return <AdminIcon className={styles.icon} />;
    return null;
  };

  const userIconStyle = classNames(styles.userIcon, {
    [styles.userIcon_admin]: currentUserRole === "admin",
    [styles.userIcon_user]: currentUserRole === "user",
  });

  const renderLoggedUser = (
    <div className={styles.loggedUser}>
      <div>
        <div className={userIconStyle}>{userIcon()}</div>
        <div className={styles.userName}>{userName}</div>
      </div>
      {renderMainBtn}
    </div>
  );

  const renderPopup =
    (currentUserRole === "guest" && passStatus !== "pass") || !isCloseAfterPass
      ? renderLoginForm
      : renderLoggedUser;

  return (
    <div ref={popup} className={styles.container}>
      <button
        className={styles.closeButton}
        type="button"
        onClick={onCloseBtnHandle}
      >
        <CloseIcon className={styles.closeButton__icon} />
      </button>
      {renderPopup}
    </div>
  );
}

export default Popup;
