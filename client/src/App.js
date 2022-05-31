import { StylesProvider, ThemeProvider } from '@material-ui/core';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import routes from './routes';
import theme from './theme';
import { firebaseConfig } from './utils/FirebaseUtil';

firebaseConfig();

const App = () => {
  const content = useRoutes(routes);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {content}
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
