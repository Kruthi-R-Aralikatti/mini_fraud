
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import TransactionRiskGraph from './TransactionRiskGraph';

interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  location: string;
  website?: string;
  timestamp: Date;
  riskScore: number;
  status: string;
  riskFactors: string[];
  isFraud?: boolean;
  userName: string;
}

interface TransactionHistoryProps {
  newTransaction?: Transaction | null;
}

const TransactionHistory = ({ newTransaction }: TransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (newTransaction) {
      setTransactions(prev => [newTransaction, ...prev]);
    }
  }, [newTransaction]);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const todayTransactions = transactions.filter(t => isToday(t.timestamp));
  const yesterdayTransactions = transactions.filter(t => isYesterday(t.timestamp));
  const olderTransactions = transactions.filter(t => !isToday(t.timestamp) && !isYesterday(t.timestamp));

  const getStatusIcon = (transaction: Transaction) => {
    if (transaction.isFraud) {
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
    switch (transaction.status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'suspicious':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (transaction: Transaction) => {
    if (transaction.isFraud) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    switch (transaction.status) {
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

  const renderTransactionList = (transactionList: Transaction[]) => (
    <div className="space-y-4">
      {transactionList.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No transactions found for this period</p>
      ) : (
        transactionList.map((transaction) => (
          <div key={transaction.id} className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                {getStatusIcon(transaction)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{transaction.merchant}</span>
                    <Badge className={getStatusColor(transaction)}>
                      {transaction.isFraud ? 'FRAUD' : transaction.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>User: {transaction.userName}</div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {transaction.location}
                    </div>
                    {transaction.website && (
                      <div>Website: {transaction.website}</div>
                    )}
                    <div>Risk Score: {(transaction.riskScore * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">₹{transaction.amount.toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-500">
                  {transaction.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <TransactionRiskGraph transaction={transaction} />
          </div>
        ))
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Transaction History & Risk Analysis
        </CardTitle>
        <CardDescription>
          Detailed transaction history with individual risk graphs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Today ({todayTransactions.length})
            </TabsTrigger>
            <TabsTrigger value="yesterday" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Yesterday ({yesterdayTransactions.length})
            </TabsTrigger>
            <TabsTrigger value="older" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Older ({olderTransactions.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-6">
            {renderTransactionList(todayTransactions)}
          </TabsContent>
          <TabsContent value="yesterday" className="mt-6">
            {renderTransactionList(yesterdayTransactions)}
          </TabsContent>
          <TabsContent value="older" className="mt-6">
            {renderTransactionList(olderTransactions)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
