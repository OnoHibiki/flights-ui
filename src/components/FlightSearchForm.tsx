import React from "react";
import styles from "./FlightSearchForm.module.css";

const FlightSearchForm : React.FC = () =>{
    return(
        <form className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="form">出発地</label>
                <select name="form" id="from">
                    <option value="">選択してください</option>
                    <option value="tokyo">東京</option>
                    <option value="osaka">大阪</option>
                    <option value="sapporo">札幌</option>
                    <option value="yokohama">横浜</option>
                    <option value="nagoya">名古屋</option>
                    <option value="okinawa">沖縄</option>
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="to">到着地</label>
                <select name="to" id="to">
                    <option value="">選択してください</option>
                    <option value="tokyo">東京</option>
                    <option value="osaka">大阪</option>
                    <option value="sapporo">札幌</option>
                    <option value="yokohama">横浜</option>
                    <option value="nagoya">名古屋</option>
                    <option value="okinawa">沖縄</option>
                </select>
            </div>

        </form>
    )
}