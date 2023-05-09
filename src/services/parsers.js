export const parseCode = (code) => {
    if (code >= 200 && code <= 232) {
      return "/images/weather/thunderstorm.svg";
    }
    if (code >= 300 && code <= 321) {
      return "/images/weather/drizzle.svg";
    }
    if (code >= 500 && code <= 531) {
      return "/images/weather/rain.svg";
    }
    if (code >= 600 && code <= 622) {
      return "/images/weather/snow.svg";
    }
    if (code >= 701 && code <= 781) {
      return "/images/weather/mist.svg";
    }
    if (code === 800) {
      return "/images/weather/clear.svg";
    }
    if (code >= 801 && code <= 804) {
      return "/images/weather/cloudy.svg";
    }
  };

  export const parseDay = (date) => {
    const tempDate = new Date(date);
    return tempDate.toLocaleDateString("en-US", { weekday: "long" });
  };