'use client';

import React, { useState } from "react";
import styles from "./FlightSearchForm.module.css";

// Flightの型宣言
type Flight = {
    from:string;
    to:string;
    basePrice:number;
    day?: string; //jsonには含まないが、結果表示に必要（?はないかもしれないを表現)
    airline:string; //航空会社
};


//フライトデータの置き場所
import anaData from "@/data/airlines/ana.json"; 
import jalData from "@/data/airlines/jal.json"; 
import peachData from "@/data/airlines/peach.json"; 
import jetStarData from "@/data/airlines/jetstar.json"; 

const flights: Flight[] = [
    ...anaData.map(f => ({...f, airline:"ANA"})),
    ...jalData.map(f => ({...f, airline:"JAL"})),
    ...peachData.map(f => ({...f, airline:"Peach"})),
    ...jetStarData.map(f => ({...f, airline:"Jetstar"})),
];


//dayから曜日を取得する関数
const getDayOfWeek = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US',{ weekday: 'short' });
}


//曜日ごとの価格倍率設定関数
const priceMultiplierDayOfWeek: { [key : string]: number } = {
    Sun: 0.7,//日曜日
    Sat: 1.5,
    Fri: 2.0,
    Thu: 1.2,
};

//値段に曜日倍率を掛ける関数
const applyPriceMultiplier = (flights: Flight[]) => {
    return flights.map(flight =>{
        const weekday = getDayOfWeek(flight.day!);
        const multiplier = priceMultiplierDayOfWeek[weekday] || 1;
        return{
            ...flight,
            basePrice: Math.round(flight.basePrice * multiplier)

        };
    });
};


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

        //  入力された往路復路日付から曜日を取得する関数を呼び出す
        const departureWeekday = getDayOfWeek(departureDay);
        const returnWeekday = getDayOfWeek(returnDay);

        //往路
        const departureFlight = flights.filter(
            (flight) =>
            flight.from === from &&
            flight.to === to 
        );

        //復路
        const returnFlight = flights.filter(
            (flight) =>
            flight.from === to &&
            flight.to === from 
        );
        

        const flightsWithWeekday = [
            ...departureFlight.map(f => ({ ...f, day: departureDay })),
            ...returnFlight.map(f => ({ ...f, day: returnDay}))
        ];


        //曜日倍率を乗算した最終価格を表示(往路と復路のそれぞれの値段が配列に)
        const finalPrices = applyPriceMultiplier(flightsWithWeekday);
        setResults(finalPrices);
    };



    return(
        <div>
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

            </form>

            <div className={styles.resultArea}>
                <ul className={styles.resultList}>
                    {results.map((f, i) => (
                    <li key={i} className={styles.resultCard}>
                        <strong>{f.day === departureDay ? "【往路】" : "【復路】"}</strong><br />
                        {`航空会社 : ${f.airline} 提供 ${f.from} → ${f.to}（${new Date(f.day!).toLocaleDateString("ja-JP", {
                        month: "long",
                        day: "numeric",
                        })}発） ¥${f.basePrice}`}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        
    );
};

export default FlightSearchForm;