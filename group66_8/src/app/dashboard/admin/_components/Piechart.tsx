'use client';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SchoolDistribution {
  [schoolName: string]: number;
}

interface Props {
  schoolDistribution: SchoolDistribution;
}

function UniversityPieChart({ schoolDistribution }: Props) {
  const [universityCount, setUniversityCount] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (!schoolDistribution || Object.keys(schoolDistribution).length === 0) {
      setUniversityCount([]);
      return;
    }

    const pieData = Object.entries(schoolDistribution).map(([name, value]) => ({
      name,
      value,
    }));
    setUniversityCount(pieData);
  }, [schoolDistribution]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1'];

  return (
    <div>
      <div>
        <p className="font-[700] text-[20px] leading-[2.8] mb-1">University Distribution</p>
        <p className="text-[16px] leading-[2.0] text-gray-600 mb-4">Breakdown of applicants by their university</p>
      </div>
      {universityCount.length === 0 ? (
        <div className="text-gray-500">No university data available</div>
      ) : (
        <>
          <div style={{ width: '100%', height: 300, position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={universityCount}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  innerRadius="50%"   
                  label
                >
                  {universityCount.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend aligned vertically on the right side */}
            <div
              style={{
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 20,
                fontSize: 14,
                color: '#444',
              }}
            >
              {universityCount.map((entry, index) => (
                <div
                  key={`legend-${index}`}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: COLORS[index % COLORS.length],
                      marginRight: 10,
                      borderRadius: 3,
                    }}
                  />
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UniversityPieChart;
