import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import './Home.css';
import BottomNavigationBar from "../BottomMenuBar/BottomNavigationBar";
import BottomBarButtons from "../BottomNavigationButtons/BottomNavigationButtons";
import { store } from "../../Redux/store";
import { useEffect } from 'react';
import { User } from "../../interfaces/User";

interface HomeProps {
    users: User[];
    notification: boolean;
}

const Home = (props: HomeProps) => {
    //const state = store.getState();
    const { users } = props;

    return (
        <div className="home">
            <Header></Header>
            <Dashboard users={users} tournaments={[]//props.tournaments
            }></Dashboard>
            <BottomNavigationBar
                buttons={
                    BottomBarButtons(props.notification)
                }
            ></BottomNavigationBar>
        </div>
    )
};

export default Home;