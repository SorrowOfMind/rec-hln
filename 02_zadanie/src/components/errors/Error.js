const Error = ({error}) => {
    return (
        <div className="error-wrapper">
            <h2 className="error-text"><span className="material-icons error">sentiment_very_dissatisfied</span>Coś poszło nie tak. Spróbuj później.</h2>
            <p className="error-msg">Opis błędu: {error}</p>
        </div>
    )
}

export default Error;
