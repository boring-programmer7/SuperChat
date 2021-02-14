import { Typography } from '@material-ui/core';
import './App.css';
import Form from './Components/Form';
import Header from './Components/Header';
import SocialMedia from './Components/SocialMedia'

function App() {

  return (
    <div className="app">
      <Header/> 
      <div className="content">
        
        
        <Form />
        <div style={{ padding: '20px',margin:'20px' }}>
          <Typography variant="body1" align='center'>
            SuperChat is an application that allows you to create a free private chat room. Your messages will be deleted every 10 minutes.
            </Typography>
           
        </div>
      </div>
        
      <div className="footer">
      
        <div>
          Iconos diseñados por <a href="https://www.flaticon.es/autores/freepik" title="Freepik">{" Freepik"}</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a>
        </div>
        
      </div>
      <SocialMedia/>
    </div>
  );
}

export default App;
