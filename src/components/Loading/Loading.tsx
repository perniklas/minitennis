import './Loading.css';

interface Props {
    message?: string;
}

const Loading = (props?: Props) => {
    return (
        <div className="loading__container home">
            <h2>
                {props?.message ?? "Loading"}
            </h2>
        </div>
    );
}

export default Loading;