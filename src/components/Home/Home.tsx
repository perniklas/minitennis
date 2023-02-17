import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import './Home.css';
import BottomNavigationBar from "../BottomMenuBar/BottomNavigationBar";
import BottomBarButtons from "../BottomNavigationButtons/BottomNavigationButtons";
import { useAppSelector } from "../../Redux/hooks";

interface HomeProps {
    notification: boolean;
}

const Home = (props: HomeProps) => {
    const loggedIn = useAppSelector(state => state.loggedIn);


    console.log(props);

    return (
        <div className="home">
            <Header></Header>
            <Dashboard tournaments={[]//props.tournaments
            }></Dashboard>
            <BottomNavigationBar
                buttons={
                    BottomBarButtons(loggedIn, props.notification)
                }
            ></BottomNavigationBar>
        </div>
    )
};

export default Home;