import { useEffect, useState } from "react";
import "./Stats.css";

function Stats(props: { stats: { base_stat: number, effort: number, stat: { name: string, url: string } }[] }) {
    const [sumStats,setSumStats] = useState<number>(0);
    useEffect(() =>{
        let sum = 0;
        props.stats.forEach((stat) => (sum += stat.base_stat) )
        setSumStats(sum)
    },[])
    
    return <div className="down">
        <p className="title">Stats</p>
        <div className="stats" >{props.stats.map((stat) => {
            return <div className="stat">{stat.stat.name + ': ' + stat.base_stat}</div>
        })}
        <div className="stat">Total: {sumStats}</div>
        </div>
    </div>
}


export default Stats;