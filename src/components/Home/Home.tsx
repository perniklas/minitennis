import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import './Home.css';
import BottomNavigationBar from "../BottomMenuBar/BottomNavigationBar";
import DataProps from "../../interfaces/DataProps";
import BottomBarButtons from "../BottomNavigationButtons/BottomNavigationButtons";

const Home = (props: DataProps) => {
    try {
        document.getElementById('navigationbutton_home').classList.add('active');
    } catch {}

    return (
        <div className="home">
            <Header></Header>
            <Dashboard users={props.users} tournaments={props.tournaments}></Dashboard>
            <BottomNavigationBar 
                buttons={
                    BottomBarButtons()
                }
            ></BottomNavigationBar>
        </div>
    )
};

export default Home;