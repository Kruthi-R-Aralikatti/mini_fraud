
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react';
import { fraudDetectionAI } from '@/utils/fraudDetectionAI';

interface Transaction {
  id: string;
  cardNumber: string;
  amount: number;
  merchant: string;
  location: string;
  timestamp: Date;
  riskScore: number;
  status: 'safe' | 'suspicious' | 'blocked';
}

const TransactionMonitor = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Simulate real-time transaction monitoring
    const interval = setInterval(() => {
      const newTransaction = generateMockTransaction();
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    }, 3000);

    // Initial transactions
    const initialTransactions = Array.from({ length: 5 }, generateMockTransaction);
    setTransactions(initialTransactions);

    return () => clearInterval(interval);
  }, []);

  const generateMockTransaction = (): Transaction => {
    const merchants = ['Amazon', 'Walmart', 'Gas Station', 'Restaurant', 'ATM', 'Online Store'];
    const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Miami, FL', 'Seattle, WA'];
    const amounts = [25.99, 156.78, 89.45, 1200.00, 45.67, 234.89, 67.23];
    
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    const transactionData = {
      amount,
      merchant,
      location,
      time: new Date(),
      cardType: 'credit'
    };

    const riskScore = fraudDetectionAI.analyzeTransaction(transactionData);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      cardNumber: `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`,
      amount,
      merchant,
      location,
      timestamp: new Date(),
      riskScore,
      status: riskScore > 0.7 ? 'blocked' : riskScore > 0.4 ? 'suspicious' : 'safe'
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'suspicious':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
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
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Real-time Transaction Monitor
        </CardTitle>
        <CardDescription>
          Live monitoring of credit card transactions with AI-powered fraud detection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {getStatusIcon(transaction.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{transaction.merchant}</span>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Card: {transaction.cardNumber}</div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {transaction.location}
                    </div>
                    <div>Risk Score: {(transaction.riskScore * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">${transaction.amount}</div>
                <div className="text-xs text-gray-500">
                  {transaction.timestamp.toLocaleTimeString()}
                </div>
                {transaction.status === 'suspicious' && (
                  <Button size="sm" variant="outline" className="mt-2">
                    Review
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionMonitor;
