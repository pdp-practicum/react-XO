import { createRoot } from 'react-dom/client';
import Main from './components/index';
import { BrowserRouter } from "react-router-dom";
import 'assets/style.css';

const root = createRoot(document.getElementById('root')!);


root.render(
  <BrowserRouter>
    <Main/>
  </BrowserRouter>
);
