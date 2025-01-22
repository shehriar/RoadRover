
const dotenv = require("dotenv")
const path = require('path');
const fs = require('fs');
const mysql = require("mysql2")

dotenv.config()
const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

db.connect((err) =>{
    if (err) {
        console.log(err.message);
        return;
    } else{
        console.log("Connection successful");
    }
})

const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}).promise()

async function getVehicleModelCount() {
    const [result] = await pool.query("SELECT COUNT(DISTINCT vehicleModel) from CarRentals");
    return result;
}

async function allLocations() {
    const [locations] = await pool.query("SELECT DISTINCT locationcity, locationstate FROM CarRentals ORDER BY locationstate, locationcity");
    return locations;
}

async function allCarModels(){
    const [cars] = await pool.query("SELECT * from CarRentals;");
    return cars
}

async function allVehiclesFromPickupLocation(pickupCity){
    const query = "SELECT * from CarRentals WHERE locationcity = ?";
    const [vehicleData] = await pool.query(query, [pickupCity]);
    // console.log(vehicleData)
    return vehicleData;
}

async function allVehicleTypes(){
    const query = "SELECT DISTINCT vehicletype from CarRentals;"
    const [vehicleTypes] = await pool.query(query);
    console.log(vehicleTypes)
    return vehicleTypes;
}

async function allVehicleMakes(){
    const query = "SELECT DISTINCT vehiclemake from CarRentals;";
    const [vehicleMakes] = await pool.query(query);
    console.log(vehicleMakes);
    return vehicleMakes
}

async function allFuelTypes(){
    const query = "SELECT DISTINCT fueltype from CarRentals WHERE fueltype is not NULL;"
    const [fuelType] = await pool.query(query);
    return fuelType;
}

module.exports = {
    allLocations,
    allCarModels,
    allVehiclesFromPickupLocation,
    allVehicleTypes,
    allVehicleMakes,
    allFuelTypes
}