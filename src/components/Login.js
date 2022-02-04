import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useHistory } from "react-router-dom";
import { setUserLogin } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
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
  return (
    <Container>
      <CTA>
        <CTALogoOne src="/images/cta-logo-one.svg" />
        <SignUp onClick={handleAuth}>Get all done</SignUp>
        <Description>
          Get Premier Acces to Raya and the Last Dragon for an addition fee with
          a Disney+ subscription. As of 03/26/2022, the price of Disney+ and The
          Disney Bundle will increase by $1.
        </Description>
        <CTALogoTwo src="/images/cta-logo-two.png" />
      </CTA>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  align-items: top;
  justify-content: center;
  height: calc(100vh - 70px);
  position: relative;
  &:before {
    background: url("/images/login-background.jpg") center / cover no-repeat;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.8;
  }
`;
const CTA = styled.div`
  width: 90%;
  max-width: 650px;
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
`;
const CTALogoOne = styled.img``;
const CTALogoTwo = styled.img`
  width: 90%;
`;
const SignUp = styled.a`
  text-transform: uppercase;
  width: 100%;
  background-color: #0063e5;
  font-weight: 600;
  padding: 16px 0px;
  color: #f9f9f9;
  border-radius: 4px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 250ms;
  letter-spacing: 1.5px;
  margin-top: 8px;
  margin-bottom: 12px;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  font-size: 11px;
  letter-spacing: 1.5px;
  text-align: center;
  line-height: 1.5;
`;
