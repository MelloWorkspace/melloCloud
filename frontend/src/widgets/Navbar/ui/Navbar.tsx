import { ApiOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Tooltip, notification } from "antd";
import cn from "classnames";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { logout } from "../../../entities/user/model/slice/userSlice";
import WorkspacesDropdown from "../../../features/workspaceDropdown/ui/WorkspacesDropdown";
import avatarIcon from "../../../shared/assets/avatar-icon.png";
import {
  FILE_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  WELCOME_ROUTE,
} from "../../../shared/consts/routes";
import AccountSettings from "../../accountSettings/ui/AccountSettings.";

import { Notifications } from "../../../features/notifications";
// import mainLogo from "../../../shared/assets/octop-navbar-white.png";
import mainLogo from "../../../shared/assets/octopus-kid.jpg";
import LanguageSwitcher from "../../languageSwitcher/ui/LanguageSwitcher";
import styles from "./navbar.module.scss";
import { getUserSelector } from "../../../entities/user";

// TODO: add storybook
const MyNavbar: React.FC = () => {
  const { t } = useTranslation();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const user = useAppSelector(getUserSelector);
  const [profile, setProfile] = useState(false);
  const [burger, setBurger] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const avatar = user.avatar ? user.avatar : avatarIcon;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const logOut = useCallback(() => {
    dispatch(logout());
    navigate(WELCOME_ROUTE);
    notification.open({
      message: "You succesfully log out",
      description: "You have successfully logged out of your account",
      placement: "topLeft",
      icon: <ApiOutlined style={{ color: "#ff7875" }} />,
    });
  }, []);

  return (
    <header className={cn(styles.navbar)} data-testid="navbar">
      <div className={cn(styles.baseItems)}>
        <LanguageSwitcher />
        <div onClick={() => navigate(WELCOME_ROUTE)} className={cn(styles.mainLogo)}>
          <p className={cn(styles.applicationName)}>{t("application-name")}</p>
          {/* <img src={mainLogo} alt="" onClick={() => navigate(WELCOME_ROUTE)} /> */}
        </div>
      </div>

      {isAuth ? (
        <div className={cn(styles.navItems)}>
          {!isTabletOrMobile && (
            <React.Fragment>
              <div className={cn(styles.navFiles)}>
                <Button ghost>
                  <NavLink to={FILE_ROUTE}>{t("files.my-files")}</NavLink>
                </Button>
              </div>
            </React.Fragment>
          )}

          <WorkspacesDropdown setProfile={setProfile} logOut={logOut} viewAll={isTabletOrMobile ? true : false} />

          <div className={cn(styles.navUser)}>
            {!isTabletOrMobile && (
              <Tooltip title="Account Settings">
                <div className={cn(styles.userInfo)} onClick={() => setProfile(true)}>
                  <p>{user?.userName}</p>
                  <SettingOutlined />
                </div>
              </Tooltip>
            )}
            <Notifications />
            <div className={cn(styles.avatar)}>
              <img src={avatar} onClick={() => navigate(PROFILE_ROUTE)} />
            </div>
            <Button className={cn(styles.mainLogout)} type="primary" onClick={() => logOut()}>
              {t("auth.logout")}
            </Button>
          </div>
          <Drawer
            title={t("user.settings")}
            placement="right"
            onClose={() => setProfile(false)}
            open={profile}
            style={{ backgroundColor: "white" }}
          >
            <AccountSettings />
          </Drawer>
        </div>
      ) : (
        <div className={cn(styles.navItems)}>
          <div className={cn(styles.navItem)}>
            <Button ghost>
              <NavLink to={LOGIN_ROUTE}>{t("auth.authorization")}</NavLink>
            </Button>
          </div>
          <div className={cn(styles.navItem)}>
            <Button ghost>
              <NavLink to={REGISTRATION_ROUTE}>{t("auth.registration")}</NavLink>
            </Button>
          </div>
          <div className={cn(styles.navBurger)}>
            {!burger ? (
              <MenuFoldOutlined className="burger-icon" onClick={() => setBurger(true)} />
            ) : (
              <MenuUnfoldOutlined className="burger-icon" />
            )}
            <Drawer title="Pages" placement="left" onClose={() => setBurger(false)} open={burger}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={cn(styles.burgerItem)}
              >
                <Divider>
                  <NavLink to={WELCOME_ROUTE}>Home page</NavLink>
                </Divider>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={cn(styles.burgerItem)}
              >
                <Divider>
                  <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
                </Divider>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={cn(styles.burgerItem)}
              >
                <Divider>
                  <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                </Divider>
              </motion.div>
            </Drawer>
          </div>
        </div>
      )}
    </header>
  );
};

export default MyNavbar;
