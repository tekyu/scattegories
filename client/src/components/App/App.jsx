import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import Content from "./Content/Content";
import Theme from "../../Theme/Theme";
import Header from "./Header/Header";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const App = ({ auth, modalType, error }) => {
  useEffect(() => {
    // userActions.checkAuth();
  }, []);

  return (
    <StyledContainer>
      <StylesProvider injectFirst>
        <ThemeProvider theme={Theme}>
          <Header />
          <Content auth={auth} />
          <ToastContainer />
        </ThemeProvider>
      </StylesProvider>
    </StyledContainer>
  );
};

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func,
  modalType: PropTypes.string,
  error: PropTypes.string
};

export default App;
