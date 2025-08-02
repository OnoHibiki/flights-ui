'use client';

import React, { useState } from "react";
import styles from "./FlightSearchForm.module.css";

type Flight = {
    from:string;
    to:string;
    day:string;
    basePrice:number;
};

import flightsData from "@/data/flights.json"; //フライトデータの置き場所
const flights: Flight[ ] = flightsData;



const FlightSearchForm : React.FC = () => {

    const[from, setFrom] = useState("");
    const[to, setTo] = useState("");
    const[departureDay, setDepartureDay] = useState("");
    const[returnDay,setReturnDay] = useState("");
    const [results, setResults] = useState<Flight[]>([]);

    const uniqueFroms = Array.from(new Set(flights.map(f => f.from)));
    const uniqueTos = Array.from(new Set(flights.map(f => f.to)));


    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        //往路
        const departureFlight = flights.filter(
            (flight) =>
            flight.from === from &&
            flight.to === to &&
            flight.day === departureDay 
        );

        //復路
        const returnFlight = flights.filter(
            (flight) =>
            flight.from === to &&
            flight.to === from &&
            flight.day === returnDay
        );

        setResults([...departureFlight, ...returnFlight]);
    };



    return(
        <form onSubmit={handleSubmit} className={styles.container}>

            {/* 出発地 */}
            <div className={styles.field}>
                <label htmlFor="from">出発地</label>
                <select id="from" value={from} onChange={e => setFrom(e.target.value)} className={styles.select}>
                    <option value="">選択してください</option>
                    {uniqueFroms.map((city , index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {/* 到着地 */}
            <div className={styles.field}>
                <label htmlFor="to">到着地</label>
                <select id="to" value={to} onChange={e => setTo(e.target.value)} className={styles.select}>
                    <option value="">選択してください</option>
                    {uniqueTos.map((city , index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {/* 往路 */}
            <div className={styles.field}>
                <label htmlFor="departureDay">往路出発日</label>
                <input type="date" id="departureDay" value={departureDay} onChange={e => setDepartureDay(e.target.value)} min={new Date().toISOString().split("T")[0]} className={styles.dateInput} />
            </div>
            
            {/* 復路 */}
            <div className={styles.field}>
                <label htmlFor="returnDay">復路出発日</label>
                <input type="date" id="returnDay" value={returnDay} onChange={e => setReturnDay(e.target.value)} min={departureDay ? new Date(new Date(departureDay).getTime() + 86400000).toISOString().split("T")[0] :new Date().toISOString().split("T")[0]}  className={styles.dateInput}/>
            </div>
            
            <button type="submit" className={styles.button}>検索</button>


            <ul>
                {results.map((f,i) =>(
                    <li key={i}>
                        {f.from} → {f.to}({f.day}発) ¥{f.basePrice}
                        {f.day === departureDay ? "【往路】" : "【復路】"}
                    </li>
                ))}
            </ul>

        </form>
    );
};

export default FlightSearchForm;