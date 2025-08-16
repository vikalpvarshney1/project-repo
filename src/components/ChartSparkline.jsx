import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function ChartSparkline({ data }) {
  return (
    <ResponsiveContainer width={100} height={40}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="price"
          stroke="#10B981"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
