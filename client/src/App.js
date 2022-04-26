import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './components/landing_page/landing.jsx';
import Home from './components/home_page/home.jsx';
import Specific from './components/specific_page/specific.jsx';
import Form from './components/form_page/form.jsx';
import { Provider } from 'react-redux';
import store from  './store.js'



function App() {



  return (
  <Provider store={store}>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:id" element={<Specific />} />
      <Route path="/home/create" element={<Form />} />
    </Routes>
  </Provider>
  );
}

export default App;
