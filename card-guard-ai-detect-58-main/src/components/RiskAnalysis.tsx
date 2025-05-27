
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Shield, AlertCircle } from 'lucide-react';

const RiskAnalysis = () => {
  const riskFactors = [
    { name: 'Location Risk', value: 25, color: '#ef4444' },
    { name: 'Amount Pattern', value: 45, color: '#f59e0b' },
    { name: 'Merchant Risk', value: 15, color: '#10b981' },
    { name: 'Time Pattern', value: 35, color: '#3b82f6' },
    { name: 'Device Risk', value: 20, color: '#8b5cf6' }
  ];

  const fraudTrends = [
    { month: 'Jan', detected: 45, prevented: 42 },
    { month: 'Feb', detected: 38, prevented: 36 },
    { month: 'Mar', detected: 52, prevented: 48 },
    { month: 'Apr', detected: 41, prevented: 39 },
    { month: 'May', detected: 35, prevented: 34 },
    { month: 'Jun', detected: 47, prevented: 45 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 85, color: '#10b981' },
    { name: 'Medium Risk', value: 12, color: '#f59e0b' },
    { name: 'High Risk', value: 3, color: '#ef4444' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Risk Factors
          </CardTitle>
          <CardDescription>Current risk factor analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{factor.name}</span>
                  <span className="font-medium">{factor.value}%</span>
                </div>
                <Progress value={factor.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fraud Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Fraud Trends
          </CardTitle>
          <CardDescription>Detection vs Prevention over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={fraudTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="detected" fill="#ef4444" name="Detected" />
              <Bar dataKey="prevented" fill="#10b981" name="Prevented" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Risk Distribution
          </CardTitle>
          <CardDescription>Transaction risk level distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {riskDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAnalysis;
