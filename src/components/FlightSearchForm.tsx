import React, { useState } from "react";
import styles from "./FlightSearchForm.module.css";
import flights from "@/data/flights.json"; //フライトデータの置き場所


const FlightSearchForm : React.FC = () => {

    const[from, setFrom] = useState("");
    const[to, setTo] = useState("");
    const[departureDay, setDepartureDay] = useState("");
    const[returnDay,setReturnDay] = useState("");
    const[results,setResults] = useState<any[]>([]);

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
            <select id="from" value={from} onChange={e => setFrom(e.target.value)} className={styles.select}>...</select>
            <select id="to" value={to} onChange={e => setTo(e.target.value)} className={styles.select}>...</select>
            <input type="date" id="departureDay" value={departureDay} onChange={e => setDepartureDay(e.target.value)} />
            <input type="date" id="returnDay" value={returnDay} onChange={e => setReturnDay(e.target.value)} />
            <button type="submit">検索</button>

            <ul>
                {results.map((f,i) =>(
                    <li key={i}>{f.from} → {f.to}({f.departureDay}発) ¥{f.price}</li>
                ))}
            </ul>

        </form>
    );
};

export default FlightSearchForm;