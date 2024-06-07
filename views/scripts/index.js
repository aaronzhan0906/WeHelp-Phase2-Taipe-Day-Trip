import { fetchAttractionsData } from "./attractions.js";
import { listBarApi } from "./listbar.js";
import { searchInputApi } from "./search.js";


window.addEventListener("DOMContentLoaded", function(){
    fetchAttractionsData();
    listBarApi();
    searchInputApi();
});