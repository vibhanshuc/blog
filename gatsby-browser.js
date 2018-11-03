const React = require("react");
const { Router } = require("react-router-dom");
const { Provider } = require("react-redux");
const PropTypes = require("prop-types");

const createStore = require("./src/state/store").default;

// remove the JSS style tag generated on the server to avoid conflicts with the one added on the client
// exports.onInitialClientRender = function() {
//   // eslint-disable-next-line no-undef
//   var ssStyles = window.document.getElementById("server-side-jss");
//   ssStyles && ssStyles.parentNode.removeChild(ssStyles);
// };

export const wrapRootElement = ({ element }) => {
  const store = createStore();
  const ConnectedRootElement = <Provider store={store}>{element}</Provider>;

  return ConnectedRootElement;
};
