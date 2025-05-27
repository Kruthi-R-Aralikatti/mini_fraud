
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Shield, TrendingUp, MapPin, Phone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface RiskDashboardProps {
  transactionResult: any;
  cardNumber: string;
}

const RiskDashboard = ({ transactionResult, cardNumber }: RiskDashboardProps) => {
  const riskHistory = [
    { time: '9:00', risk: 0.2 },
    { time: '10:00', risk: 0.3 },
    { time: '11:00', risk: 0.1 },
    { time: '12:00', risk: 0.4 },
    { time: '13:00', risk: transactionResult.riskScore }
  ];

  const riskBreakdown = [
    { name: 'Location Risk', value: transactionResult.location ? 30 : 0, color: '#ef4444' },
    { name: 'Amount Risk', value: transactionResult.amount > 1000 ? 40 : 20, color: '#f59e0b' },
    { name: 'Website Risk', value: transactionResult.website ? 35 : 10, color: '#8b5cf6' },
    { name: 'Pattern Risk', value: 25, color: '#3b82f6' }
  ];

  const getStatusIcon = () => {
    if (transactionResult.isFraud) {
      return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
    switch (transactionResult.status) {
      case 'approved':
        return <Shield className="h-5 w-5 text-green-600" />;
      case 'suspicious':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'blocked':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    if (transactionResult.isFraud) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    switch (transactionResult.status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'suspicious':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Fraud Alert */}
      {transactionResult.isFraud && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>CRITICAL FRAUD ALERT!</AlertTitle>
          <AlertDescription>
            <div className="space-y-3 mt-2">
              <p className="font-semibold">Fraudulent transaction detected for ₹{transactionResult.amount?.toLocaleString('en-IN')}</p>
              <div className="bg-red-50 p-4 rounded-md border border-red-200">
                <p className="font-semibold text-red-800 mb-2">Emergency Contact Numbers:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span><strong>Cybercrime Helpline:</strong> 1930 (24x7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span><strong>Bank Fraud Helpline:</strong> 1800-XXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span><strong>Police:</strong> 100</span>
                  </div>
                </div>
                <div className="mt-3 text-sm space-y-1">
                  <p><strong>Immediate Actions:</strong></p>
                  <p>• Block your card immediately</p>
                  <p>• File FIR at nearest cyber police station</p>
                  <p>• Do not share OTP, PIN, or card details with anyone</p>
                  <p>• Screenshot this alert for evidence</p>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Transaction Result */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon()}
            Transaction Analysis Result
          </CardTitle>
          <CardDescription>Card: {cardNumber} | User: {transactionResult.userName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <Badge className={getStatusColor()}>
                  {transactionResult.isFraud ? 'FRAUD DETECTED' : transactionResult.status.toUpperCase()}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Risk Score:</span>
                <span className="font-bold text-lg">
                  {(transactionResult.riskScore * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Amount:</span>
                <span className="font-semibold">₹{transactionResult.amount?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Merchant:</span>
                <span>{transactionResult.merchant}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{transactionResult.location}</span>
              </div>
              {transactionResult.website && (
                <div>
                  <span className="text-sm text-gray-600">Website: </span>
                  <span>{transactionResult.website}</span>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-600">Risk Factors:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {transactionResult.riskFactors?.map((factor: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Trend Graph */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Risk Trend Analysis
          </CardTitle>
          <CardDescription>Risk score over time for this card</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
              <Tooltip formatter={(value: any) => [`${(value * 100).toFixed(1)}%`, 'Risk Score']} />
              <Line 
                type="monotone" 
                dataKey="risk" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Factor Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Factor Breakdown</CardTitle>
            <CardDescription>Contributing factors to overall risk</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {riskBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riskBreakdown.map((item, index) => (
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

        <Card>
          <CardHeader>
            <CardTitle>Risk Level Gauge</CardTitle>
            <CardDescription>Current transaction risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="60%" 
                outerRadius="90%" 
                data={[{ value: transactionResult.riskScore * 100 }]}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={10}
                  fill={transactionResult.riskScore > 0.7 ? '#ef4444' : 
                       transactionResult.riskScore > 0.4 ? '#f59e0b' : '#10b981'}
                />
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-2xl font-bold"
                >
                  {(transactionResult.riskScore * 100).toFixed(1)}%
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskDashboard;
