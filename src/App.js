import './App.css';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Animals} from "./components/Animals";
import {Link, Route, Routes} from "react-router-dom";

const styles = {
    Main: {
        maxWidth: "1024px",
        margin: "auto",
        marginTop: "20px"
    },
    NavWrapper: {
        display: "flex",
        padding:"0 20px"
    },
    NavLeft: {
        display: "flex",
        marginRight: "auto"
    },
    NavRight: {
        display: "flex",
        marginLeft: "auto",
        gap:"10px"
    },
    WrapperUnderNav:{
        marginTop:"20px"
    }
}

function App() {
    return (
        <div className="App" style={styles.Main}>
            <nav style={styles.NavWrapper}>
                <div style={styles.NavLeft}>
                    <Link to={"/animals"}>
                        Animals
                    </Link>
                </div>
                <div style={styles.NavRight}>
                    <div>
                        <Link to={"/auth/login"}>
                            Login
                        </Link>
                    </div>
                    <div>
                        <Link to={"/auth/register"}>
                            Register
                        </Link>
                    </div>
                </div>
            </nav>
            <div  style={styles.WrapperUnderNav}>
                <Routes>
                    <Route path="/auth/register" element={<Register/>}/>
                    <Route path="/auth/login" element={<Login/>}/>
                    <Route path="/animals" element={<Animals/>}/>

                </Routes>
            </div>
        </div>
    );
}

export default App;
