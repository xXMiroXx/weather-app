/* Global Variables */
const API_KEY = "6bd87df1befba6507163c45fe1370fb7";
// Note:Zip code should work only on US since we will not provide a country
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
// Form elements
const generateBtn = document.getElementById("generate");
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
// Entry elements
const entryDate = document.getElementById("date");
const entryTemp = document.getElementById("temp");
const entryContent = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/**
 * @description Post to server endpoint
 * @param {string} url
 * @param {object} data
 */
const postToServer = async (url, data) => {
    try {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
    catch (e) {
        // For test purposes
        console.log(e.message);
        throw new Error(e.message);
    }
};

/**
 * @description Making Get request to server end point
 * @returns {object} {date,temp,content}
 */
const getDataFromServer = async () => {
    try {
        const res = await fetch("/weather-data");
        const data = await res.json();
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

/**
 * @description Fetch data from open weather api
 * @param {string} zip
 * @returns {string} temp
 */
const weatherApiData = async (zip) => {
    try {
        // Units parameter used to get degrees in celsius
        const res = await fetch(`${API_URL}&zip=${zip}&units=metric`);
        const parsedData = await res.json();
        const { temp } = parsedData.main;
        return temp;
    } catch (e) {
        throw new Error(e.message);
    }

};

/**
 * @description Render data on server endpoin to client
 */
const renderEntry = async () => {
    try {
        // Request server data
        const data = await getDataFromServer();
        // Asign data to HTML elemnts useing their ids
        entryDate.innerHTML = data.date;
        entryTemp.innerHTML = data.temp + " C";
        entryContent.innerHTML = data.content;

    } catch (e) {
        throw new Error(e.message);
    }
};

/**
 * @description Handle generate action on client side
 * @param {Event} e
 */
const generateHandler = async (e) => {
    try {
        e.preventDefault();
        // Content of text area box
        const content = feelingsInput.value;
        // Zip should work only for us since other countries needs edit to url
        const zip = zipInput.value;
        // Note: Temp in metric
        const temp = await weatherApiData(zip);
        await postToServer("/weather-data", { temp, content, date: newDate });
        await renderEntry();
    } catch (e) {
        console.log("something went wrong");
    }

};

/**
 * @description EFI Main function which we need to call it once in beging
 */
(async () => {
    // Listen to generate click
    generateBtn.addEventListener("click", generateHandler);

})();
