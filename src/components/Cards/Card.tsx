import { ReactNode  } from 'react';
import './Card.css';

interface CardProps {
    title: String;
    child: ReactNode;
}

const Card = (props: CardProps) => {
    return (
        <div className="card">
            <h1>{props.title}</h1>
            {props.child}
        </div>
    );
};

export default Card;