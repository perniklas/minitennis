import * as d3 from 'd3';
import { Datum, ResponsiveLine, Serie } from "@nivo/line";
import { MatchStats } from "../../interfaces/Match";
import Card from "../Cards/Card";

interface StatProps {
    matches: MatchStats[];
};

const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
};

const StatCharts = (props: StatProps) => {
    const data = props.matches;
    data.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
    let prevDate = new Date(data[0]?.timestamp ?? 100);
    const chartSeries: Serie[] = [];
    const matchData: Serie = {
        id: 'Rating',
        data: []
    };
    const valuesToShow = []; // it's in the shitters
    const dateIsNotTheSame = (date1: Date, date2: Date) => date1.toDateString() !== date2.toDateString();

    let yMin = 10000;
    let yMax = 0;
    for (let i = 1; i < data.length; i++) {
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

    if (!chartSeries[0].data.length) {
        return (<></>);
    }

    // const valuesToShow = chartSeries[0].data.map((d: Datum) => {
    //     if (prevDate.getDate() !== (d.x as Date).getDate()) {
    //         prevDate = (d.x as Date);
    //         return d;
    //     } else {
    //         console.log('nono')
    //         return '';
    //     }
    // });
    console.log(valuesToShow);

    const formatDateString = (value: Date) => `${value.getDate()}.${months[value.getMonth()]}`;
    const findNextDate = (date1: Date, date2: Date) => {
        if (!date1) return '';
        return (dateIsNotTheSame(date1, date2)) ? formatDateString(date1) ?? '' : ''
    };

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
                curve="natural"
                colors={["#cb39f7", "#cb39f7"]}
                enableGridX={false}
                axisBottom={{
                    tickRotation: -30,
                    format: (value: Date) => {
                        // console.log(value, valuesToShow);
                        return valuesToShow.find(d => d === value)?.toDateString() ?? '';
                         
                        //return `${value.getDate()}.${months[value.getMonth()]}`;
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
                    }
                }}
            />
        </div>
    );

    return <Card title='Performance last 3 months' child={charts}></Card>
};

export default StatCharts;