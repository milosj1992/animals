import './App.css';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Animals} from "./components/Animals";
import {Route, Routes} from "react-router-dom";

const styles = {
    Main:{
        maxWidth:"1024px",
        margin:"auto",
        marginTop:"20px"
    }
}
function App() {
    return (
        <div className="App" style={styles.Main}>
        <Routes>
                <Route path="/auth/register" element={<Register/>}/>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/animals" element={<Animals/>}/>

        </Routes>
        </div>
    );
}

export default App;
