'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HorizontalBarData {
  applied?: number;
  in_progress?: number;
  interview?: number;
  accepted?: number;
}

type Props = {
  data: HorizontalBarData;
};

function HorizontalBarchart({ data }: Props) {
  const {
    applied = 0,
    in_progress = 0,
    interview = 0,
    accepted = 0,
  } = data;

  const chartData = [
    { name: 'Applied', value: applied },
    { name: 'Under Review', value: in_progress },
    { name: 'Interview', value: interview },
    { name: 'Accepted', value: accepted },
  ];

  const isEmpty = chartData.every(item => item.value === 0);

  return (
    <div>
      <div className="flex flex-col mb-4">
        <p className="text-[20px] font-semibold leading-[2.8] text-center">Application Funnel</p>
        <p className="text-[14px] font-normal leading-6 text-center text-gray-600">
          Visualizes the applicant&apos;s journey from submission to acceptance.
        </p>
      </div>
      <div className="w-full h-[300px]">
        {isEmpty ? (
          <div className="text-gray-500 text-center mt-12">No data available</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default HorizontalBarchart;
