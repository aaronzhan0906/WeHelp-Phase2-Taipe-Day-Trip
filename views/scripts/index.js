import { fetchAttractionsData } from "./attractions.js";
import { listBarApi } from "./listbar.js";
import { searchInputApi } from "./search.js";

window.addEventListener("load", function(){
    fetchAttractionsData();
    listBarApi();
    searchInputApi();
});



