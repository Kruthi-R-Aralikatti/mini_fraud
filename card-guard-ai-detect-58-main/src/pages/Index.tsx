
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import CardLogin from '@/components/CardLogin';
import TransactionInput from '@/components/TransactionInput';
import RiskDashboard from '@/components/RiskDashboard';
import TransactionMonitor from '@/components/TransactionMonitor';
import RiskAnalysis from '@/components/RiskAnalysis';
import FraudAlerts from '@/components/FraudAlerts';
import StatsOverview from '@/components/StatsOverview';
import TransactionHistory from '@/components/TransactionHistory';

const Index = () => {
  const [loggedInCard, setLoggedInCard] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [transactionResult, setTransactionResult] = useState<any>(null);

  const handleLogin = (cardNumber: string, name: string) => {
    setLoggedInCard(cardNumber);
    setUserName(name);
  };

  const handleTransactionAnalyzed = (result: any) => {
    setTransactionResult(result);
  };

  const handleLogout = () => {
    setLoggedInCard(null);
    setUserName(null);
    setTransactionResult(null);
  };

  if (!loggedInCard) {
    return <CardLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">CardGuard AI</h1>
            </div>
            <p className="text-lg text-gray-600">
              Advanced AI-powered fraud detection system for {userName} ({loggedInCard})
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Transaction Input */}
        <div className="mb-8">
          <TransactionInput 
            cardNumber={loggedInCard}
            userName={userName!}
            onTransactionAnalyzed={handleTransactionAnalyzed}
          />
        </div>

        {/* Risk Dashboard - Show if transaction analyzed */}
        {transactionResult && (
          <div className="mb-8">
            <RiskDashboard 
              transactionResult={transactionResult}
              cardNumber={loggedInCard}
            />
          </div>
        )}

        {/* Transaction History with Risk Graphs */}
        <div className="mb-8">
          <TransactionHistory newTransaction={transactionResult} />
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Transaction Monitor - Takes 2 columns */}
          <div className="lg:col-span-2">
            <TransactionMonitor />
          </div>

          {/* Fraud Alerts */}
          <div className="lg:col-span-1">
            <FraudAlerts />
          </div>

          {/* Risk Analysis - Full width */}
          <div className="lg:col-span-3">
            <RiskAnalysis />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
