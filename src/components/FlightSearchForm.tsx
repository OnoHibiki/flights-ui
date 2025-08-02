'use client';

import React, { useState } from "react";
import styles from "./FlightSearchForm.module.css";

type Flight = {
    from:string;
    to:string;
    departureDay: string;
    returnDay:string;
    price:number;
};

import flightsData from "@/data/flights.json"; //フライトデータの置き場所
const flights: Flight[ ] = flightsData;



const FlightSearchForm : React.FC = () => {

    const[from, setFrom] = useState("");
    const[to, setTo] = useState("");
    const[departureDay, setDepartureDay] = useState("");
    const[returnDay,setReturnDay] = useState("");
    const [results, setResults] = useState<Flight[]>([]);


    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        const matched = flights.filter(
            (flight) =>
            flight.from === from &&
            flight.to === to &&
            flight.departureDay === departureDay &&
            flight.returnDay === returnDay
        );

        setResults(matched);
    };



    return(
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.field}>
                <label htmlFor="form">出発地</label>
                <select id="from" value={from} onChange={e => setFrom(e.target.value)} className={styles.select}>...</select>
            </div>

            <div className={styles.field}>
                <label htmlFor="to">到着地</label>
                <select id="to" value={to} onChange={e => setTo(e.target.value)} className={styles.select}>...</select>
            </div>

            <div className={styles.field}>
                <label htmlFor="departureDay">出発日</label>
                <input type="date" id="departureDay" value={departureDay} onChange={e => setDepartureDay(e.target.value)} className={styles.dateInput} />
            </div>

            <div className={styles.field}>
                <label htmlFor="returnDay">到着日</label>
                <input type="date" id="returnDay" value={returnDay} onChange={e => setReturnDay(e.target.value)} className={styles.dateInput}/>
            </div>
            
            <button type="submit" className={styles.button}>検索</button>


            <ul>
                {results.map((f,i) =>(
                    <li key={i}>{f.from} → {f.to}({f.departureDay}発) ¥{f.price}</li>
                ))}
            </ul>

        </form>
    );
};

export default FlightSearchForm;