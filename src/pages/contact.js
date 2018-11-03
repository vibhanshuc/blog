import React from "react";
import PropTypes from "prop-types";
import injectSheet, { ThemeProvider } from "react-jss";
import Layout from "../components/layout";
import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
import Content from "../components/Main/Content";
import Form from "../components/ContactForm";
import config from "../../content/meta/config";

const styles = theme => ({});

const Contact = () => {
  return (
    <Layout>
      <Main>
        <Article>
          <PageHeader title="Contact" />
          <Content>
            Feel free to contact me by email: use the
            form below.
          </Content>
          <Form />
        </Article>
      </Main>
    </Layout>
  );
};

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Contact);
