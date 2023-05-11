import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from "recharts";

interface Chart {
  data: any;
  widthP: number;
  height: number;
}

function Chart({ data, widthP, height }: Chart) {
  return (
    <ResponsiveContainer width={`${widthP}%`} height={height}>
      <LineChart data={data}>
        <XAxis dataKey="day" />
        <YAxis dataKey="interactions" />
        <Line type="monotone" dataKey="interactions" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
