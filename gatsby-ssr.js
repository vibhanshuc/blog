const { JssProvider, ThemeProvider } = require("react-jss");
const { Provider } = require("react-redux");
const { renderToString } = require("react-dom/server");
const React = require("react");

require("dotenv").config();

const getPageContext = require("./src/getPageContext");
const createStore = require("./src/state/store");
const theme = require("./src/styles/theme");

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const pageContext = getPageContext();
  const store = createStore();

  replaceBodyHTMLString(
    renderToString(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <JssProvider
            registry={pageContext.sheetsRegistry}
            generateClassName={pageContext.generateClassName}
          >
            {React.cloneElement(bodyComponent, {
              pageContext
            })}
          </JssProvider>
        </ThemeProvider>
      </Provider>
    )
  );

  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
    />
  ]);
};

exports.onRenderBody = ({ setHeadComponents }) => {
  return setHeadComponents([]);
};

exports.onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    <script
      key={`webfontsloader-setup`}
      dangerouslySetInnerHTML={{
        __html: `
        WebFontConfig = {
          google: {
            families: ["${theme.default.base.fonts.styledFamily}:${theme.default.base.fonts.styledFonts}"]
          }
        };

        (function(d) {
            var wf = d.createElement('script'), s = d.scripts[0];
            wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
            wf.async = true;
            s.parentNode.insertBefore(wf, s);
        })(document);`
      }}
    />
  ]);
};
