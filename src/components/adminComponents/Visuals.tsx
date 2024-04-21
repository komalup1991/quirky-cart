import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

// Styled components
const AdminChart = styled.div`
  margin: 20px;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const AdminChartHeading = styled.h3`
  margin-bottom: 20px;
`;

// TypeScript types for component props
interface VisualsProps {
  title: string;
  data: {
    name: string;
    [key: string]: any;  // This allows flexibility in data keys
  }[];
  dataKey: string;
  grid: boolean;
}

const Visuals: React.FC<VisualsProps> = ({ title, data, dataKey, grid }) => {
  return (
    <AdminChart>
      <AdminChartHeading>{title}</AdminChartHeading>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </AdminChart>
  );
};

export default Visuals;
