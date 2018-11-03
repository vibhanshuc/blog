import React from "react";
import PropTypes from "prop-types";
require("core-js/fn/array/find");
import { graphql } from "gatsby";
import Main from "../components/Main";
import Layout from "../components/layout";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
import Search from "../components/Search";

const SearchPage = props => {
  const { data } = props;

  return (
    <Layout>
      <Main>
        <Article>
          <PageHeader title="Search by" algolia={true} />
          <Search algolia={data.site.siteMetadata.algolia} />
        </Article>
      </Main>
    </Layout>
  );
};

SearchPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SearchPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query AlgoliaQuery {
    site {
      siteMetadata {
        algolia {
          appId
          searchOnlyApiKey
          indexName
        }
      }
    }
  }
`;
