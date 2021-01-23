import axios from 'axios';

//DEVELOPMENT ONLY: Ponieważ pojawił się problem CORS przy fetchowaniu zasobów, kieruję request przez CORS proxy, który zrobiłam sobie na heroku (na podstawie https://github.com/Rob--W/cors-anywhere.git)
const PROXY = "https://secure-brushlands-91531.herokuapp.com/";
const URL = "https://helion.pl/plugins/json/test.php";

export const fetchBooks = () => axios.get(PROXY + URL);
    