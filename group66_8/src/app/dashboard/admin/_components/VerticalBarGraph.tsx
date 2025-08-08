'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GeoDataItem {
  country: string;
  applicants: number;
}

type Props = {
  data?: GeoDataItem[];
};

function VerticalBarGraph({ data }: Props) {
  const geoData: GeoDataItem[] = data??[];

  return (
    <div>
      <h2 className="text-[20px] font-semibold leading-[2.8] text-center mb-2">Geographic Distribution</h2>
      <p className="text-[14px] font-normal text-center mb-4 text-gray-600">
        Shows the number of applicants from each country
      </p>
      <div className="w-full h-[300px]">
        {geoData.length === 0 ? (
          <div className="text-gray-500 text-center mt-12">No data available</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={geoData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applicants" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default VerticalBarGraph;
