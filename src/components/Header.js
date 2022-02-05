import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { auth, provider } from "../firebase";
import { useHistory } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      }
    });
  }, []);
  const handleAuth = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };
  return (
    <Nav>
      <Link to="/">
        <Logo src="/images/logo.svg" alt="brandLogo" />
      </Link>
      {!userName ? (
        <LoginContainer>
          <Login onClick={handleAuth}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a>
              <img src="/images/home-icon.svg" />
              <span>home</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" />
              <span>search</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" />
              <span>watchlist</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" />
              <span>originals</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" />
              <span>movies</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" />
              <span>series</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg onClick={signOut} src={userPhoto} alt="userImg" />
          </SignOut>
        </>
      )}
    </Nav>
  );
}

export default Header;
const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
  justify-content: space-between;
  positon: fixed;
  top: 0;
  left: 0;
  right: 0;
  letter-spacing: 16px;
  z-index: 3;
`;
const Logo = styled.img`
  width: 80px;
`;
const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
  margin-right: auto;
  @media (max-width: 867px) {
    display: none;
  }
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      text-transform: uppercase;
      position: relative;
      &:after {
        content: "";
        height: 2px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        background: white;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
`;
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 250ms ease-out;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
    color: #000;
  }
`;
const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
