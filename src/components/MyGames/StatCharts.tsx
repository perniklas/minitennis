import * as d3 from 'd3';
import { Datum, ResponsiveLine, Serie } from "@nivo/line";
import { MatchStats } from "../../interfaces/Match";
import Card from "../Cards/Card";

interface StatProps {
    matches: MatchStats[];
};

const StatCharts = (props: StatProps) => {
    const data = props.matches;
    data.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1);
    
    let prevDate = new Date(100);
    const chartSeries: Serie[] = [];
    const matchData: Serie = {
        id: 'Rating',
        data: []
    };
    const valuesToShow = [];
    const dateIsNotTheSame = (date1: Date, date2: Date) => date1.toDateString() !== date2.toDateString();

    let yMin = 10000;
    let yMax = 0;
    for (let i = 0; i < data.length; i++) {
        const match = data[i];
        const matchDate = new Date(match.timestamp);
        matchData.data.push({
            x: matchDate,
            y: parseFloat(match.rating.toFixed(2)),
            color: '#c10dd1'
        });

        if (dateIsNotTheSame(prevDate, matchDate)) {
            valuesToShow.push(matchDate);
        }

        prevDate = matchDate;

        if (match.rating < yMin) yMin = match.rating;
        if (match.rating > yMax) yMax = match.rating;
    }

    chartSeries.push(matchData);

    if (!matchData.data.length || matchData.data.length == 1) {
        const matchData3 = matchData.data.slice();
        const someTime = new Date();
        someTime.setDate(someTime.getDate() - 89);
        const preData3 = {
            x: someTime,
            y: 1000.0,
            color: '#c10dd1'
        };
        matchData3.unshift(preData3);
        matchData.data = matchData3;
    
        const matchData24 = matchData.data.slice();
        const preData24 = {
            x: new Date(new Date().getTime() - 86400000),
            y: 1000.0,
            color: '#c10dd1'
        };
        matchData24.unshift(preData24);
        matchData.data = matchData24;
    }

    const charts = (
        <div style={{
            height: '300px',
            maxWidth: '600px',
        }}>
            <ResponsiveLine
                data={chartSeries}
                margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
                animate={true}
                enableSlices={"x"}
                yScale={{
                    type: "linear",
                    stacked: true,
                    min: yMin - 30,
                    max: yMax + 30
                }}
                lineWidth={3}
                curve="monotoneX"
                colors={["#cb39f7", "#cb39f7"]}
                enableGridX={false}
                axisBottom={{
                    tickRotation: -30,
                    format: (value: Date) => {
                        return valuesToShow.find(d => d === value)?.toDateString() ?? '';
                    }
                }}
                pointSize={5}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                layers={[
                    "grid",
                    "markers",
                    "areas",
                    "lines",
                    "slices",
                    "axes",
                    "points",
                    "legends"
                ]}
                theme={{
                    labels: {
                        text: {
                            color: 'white',
                        }
                    },
                    axis: {
                        ticks: {
                            text: {
                                fill: 'white'
                            }
                        }
                    },
                    crosshair: {
                        line: {
                            strokeWidth: 2,
                            stroke: "#774dd7",
                            strokeOpacity: 1
                        }
                    },
                    tooltip: {
                        container: {
                            color: 'black'
                        }
                    }
                }}
            />
        </div>
    );

    return <Card title='Performance last 3 months' child={charts}></Card>
};

export default StatCharts;