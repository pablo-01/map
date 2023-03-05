using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Threading.Tasks;
using airports_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace airports_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AirportsController : ControllerBase
    {
        
        // get all airports from sqlite db file 
        [HttpGet]
        public ActionResult<IEnumerable<Airport>> Get()
        {
            // connect to db
            var db = new SQLiteConnection("Data Source=global_airports_sqlite.db");

            // create list to hold airports
            var airports = new List<Airport>();

            // open db connection
            db.Open();

            // create sql query where iata_code is not null or 'N/A'
            var sql = "SELECT * FROM airports WHERE iata_code IS NOT NULL AND iata_code != 'N/A'";
            // create command
            var cmd = new SQLiteCommand(sql, db);

            // execute command
            var reader = cmd.ExecuteReader();

            // loop through results
            while (reader.Read())
            {
                // create new airport object
                var airport = new Airport();

                // set properties
                airport.id = reader.GetInt32(0);
                airport.icao_code = reader.GetString(1);
                airport.iata_code = reader.GetString(2);
                airport.name = reader.GetString(3);
                airport.city = reader.GetString(4);
                airport.country = reader.GetString(5);
                airport.lat_deg = reader.GetInt32(6);
                airport.lat_min = reader.GetInt32(7);
                airport.lat_sec = reader.GetInt32(8);
                airport.lat_dir = reader.GetString(9);
                airport.lon_deg = reader.GetInt32(10);
                airport.lon_min = reader.GetInt32(11);
                airport.lon_sec = reader.GetInt32(12);
                airport.lon_dir = reader.GetString(13);
                airport.altitude = reader.GetInt32(14);
                airport.lat_decimal = reader.GetDouble(15);
                airport.lon_decimal = reader.GetDouble(16);

                // add airport to list
                airports.Add(airport);
            }

            // close db connection
            db.Close();

            // return list of airports
            return airports;
        }
    }
}