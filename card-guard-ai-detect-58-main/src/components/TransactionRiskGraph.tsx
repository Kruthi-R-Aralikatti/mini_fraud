
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface TransactionRiskGraphProps {
  transaction: any;
}

const TransactionRiskGraph = ({ transaction }: TransactionRiskGraphProps) => {
  // Generate risk progression data for the transaction
  const riskProgression = [
    { step: 'Initial', risk: 0.1, label: 'Transaction Started' },
    { step: 'Amount', risk: transaction.amount > 50000 ? 0.3 : 0.15, label: 'Amount Verification' },
    { step: 'Location', risk: transaction.riskScore * 0.4, label: 'Location Check' },
    { step: 'Website', risk: transaction.riskScore * 0.6, label: 'Website Verification' },
    { step: 'Pattern', risk: transaction.riskScore * 0.8, label: 'Pattern Analysis' },
    { step: 'Final', risk: transaction.riskScore, label: 'Final Risk Score' }
  ];

  const riskColor = transaction.riskScore > 0.7 ? '#ef4444' : 
                   transaction.riskScore > 0.4 ? '#f59e0b' : '#10b981';

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4" />
          Risk Analysis - ₹{transaction.amount?.toLocaleString('en-IN')} at {transaction.merchant}
          {transaction.isFraud && (
            <AlertTriangle className="h-4 w-4 text-red-600 ml-2" />
          )}
        </CardTitle>
        <CardDescription className="text-xs">
          {transaction.timestamp?.toLocaleString()} | Risk Score: {(transaction.riskScore * 100).toFixed(1)}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={riskProgression}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="step" 
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              domain={[0, 1]} 
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              tick={{ fontSize: 10 }}
            />
            <Tooltip 
              formatter={(value: any) => [`${(value * 100).toFixed(1)}%`, 'Risk Level']}
              labelFormatter={(label) => {
                const item = riskProgression.find(item => item.step === label);
                return item ? item.label : label;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="risk" 
              stroke={riskColor}
              fill={riskColor}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {transaction.riskFactors && transaction.riskFactors.length > 0 && (
          <div className="mt-3 text-xs">
            <span className="font-medium">Risk Factors: </span>
            {transaction.riskFactors.join(', ')}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionRiskGraph;
