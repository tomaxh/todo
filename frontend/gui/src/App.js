import React from 'react';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout.js'
import BaseRouter from './routes'
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomLayout>

          <BaseRouter />

        </CustomLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
