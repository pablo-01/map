using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace airports_api.Models
{
    public class Airport
    {
       // 1	AYGA	GKA	GOROKA	GOROKA	PAPUA NEW GUINEA	6	4	54	S	145	23	30	E	1610	-6.082	145.392
        public int id { get; set; }
        public string icao_code { get; set; }
        public string iata_code { get; set; }
        public string name { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public int lat_deg { get; set; }
        public int lat_min { get; set; }
        public int lat_sec { get; set; }
        public string lat_dir { get; set; }
        public int lon_deg { get; set; }
        public int lon_min { get; set; }
        public int lon_sec { get; set; }
        public string lon_dir { get; set; }
        public int altitude { get; set; }
        public double lat_decimal { get; set; }
        public double lon_decimal { get; set; }

        
        
    }
}