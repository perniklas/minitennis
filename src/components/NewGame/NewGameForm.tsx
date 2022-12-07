import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    userId: string,
};

const NewGameForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        debugger;
        alert(data);
        debugger;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="newgame__form">
            <div className="input">
                <label htmlFor="newgame__form_who">You and who?</label>
                <input defaultValue="test" {...register("userId")} />
            </div>
        </form>
    );
};

export default NewGameForm;