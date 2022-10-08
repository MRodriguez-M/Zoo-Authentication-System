import { useState } from 'react'
import DisplayInfo from "./DisplayInfo";
import Login from "./Login"

//Interface for user to input credentials and have roles displayed to them
function App() {
    const [user, setUser] = useState();
   
    const onLogout = () => {
        setUser();
    }

    return (
      <>
          { !user ? <Login setUser={setUser} /> 
          : <DisplayInfo user={user} onLogout={onLogout} /> }
      </>
    );
}

export default App;