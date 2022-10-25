import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <Header></Header>
            <Dashboard></Dashboard>
        </div>
    )
};

export default Home;