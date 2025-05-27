
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, CreditCard, TrendingUp } from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    {
      title: "Transactions Monitored",
      value: "24,587",
      change: "+12%",
      icon: CreditCard,
      color: "text-blue-600"
    },
    {
      title: "Fraud Detected",
      value: "47",
      change: "-8%",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Prevention Rate",
      value: "99.2%",
      change: "+0.5%",
      icon: Shield,
      color: "text-green-600"
    },
    {
      title: "Risk Score Avg",
      value: "0.23",
      change: "-15%",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                {stat.change}
              </span>
              {' from last month'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
