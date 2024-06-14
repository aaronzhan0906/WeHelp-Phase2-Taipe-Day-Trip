import { fetchAttractionsData } from "./index-attractions.js";
import { listBarApi } from "./index-listbar.js";
import { searchInputApi } from "./index-search.js";



window.addEventListener("DOMContentLoaded", function(){
    fetchAttractionsData();
    listBarApi();
    searchInputApi();
});