import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import FloatingActionButton from "../FAB/FloatingActionButton";
import './Home.css';
import BottomNavigationBar from "../BottomMenuBar/BottomNavigationBar";

const Home = () => {
    return (
        <div className="home">
            <Header></Header>
            <Dashboard></Dashboard>
            <BottomNavigationBar></BottomNavigationBar>
        </div>
    )
};

export default Home;