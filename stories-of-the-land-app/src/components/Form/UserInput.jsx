const UserInput = ({setValue, initialValue, type ="text"}) => {
    return (
        <input 
            type = {type}
            placeholder={initialValue}
            style={ {marginBottom: "5px"}}  
            onChange={(e) => {
                setValue(e.target.value);
                }
            }
        />

    )
};

export default UserInput;