import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.default.css';
import App from './App';
import NotFound from './pages/NotFound';
import * as serviceWorker from './serviceWorker';

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Store Setup
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
