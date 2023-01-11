import { LineChart } from "recharts";
import { MatchStats } from "../../interfaces/Match";
import { useEffect } from 'react';
import { VictoryChart, VictoryLine } from "victory";
import Card from "../Cards/Card";

interface StatProps {
    matches: MatchStats[];
};

const StatCharts = (props: StatProps) => {
    const data = props.matches;
    data.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
    const chartData = data.map(match => {
        return {
            y: parseFloat(match.rating.toFixed(2)),
            x: new Date(match.timestamp)//.toLocaleString()
        };
    });

    console.log(chartData);

    useEffect(() => {
        // for (let i = 0; i < data.length; i++) {
        //     const match = data[i];
        //     console.log(match);
        //     chartData.push({
        //         y: match.rating,
        //         x: new Date(match.timestamp).toISOString().slice(0, -1)
        //     });
        // }

    }, []);

    const charts = (
        <VictoryChart>
            <VictoryLine
                style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={chartData}
                //     [
                //         {y: 1024, x: new Date(1673444776113).toISOString().slice(0, -1)},
                //         {y: 1044, x: new Date(1673444576113).toISOString().slice(0, -1)},
                //         {y: 1074, x: new Date(1673453576113).toISOString().slice(0, -1)}
                //     ]
                // }
                //labels={(datum) => `${chartData[datum.x.getMonth()]}`}
            />
        </VictoryChart>
    );

    return <Card title='Performance' child={charts}></Card>
};

export default StatCharts;