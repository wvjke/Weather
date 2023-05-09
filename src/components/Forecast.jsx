import "./forecast.scss";
const Forecast = ({day, image, temp}) => {
    return (
        <div className="box">   
            <h3>{day}</h3>
            <div className="img"><img src={image}/></div>
            <h4>{temp}</h4>
        </div>
    );
};

export default Forecast;