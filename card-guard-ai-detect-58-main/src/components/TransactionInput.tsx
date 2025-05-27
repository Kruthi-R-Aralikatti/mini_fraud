
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin, DollarSign, AlertTriangle, CheckCircle, Phone } from 'lucide-react';
import { fraudDetectionAI } from '@/utils/fraudDetectionAI';

interface TransactionInputProps {
  cardNumber: string;
  userName: string;
  onTransactionAnalyzed: (result: any) => void;
}

const TransactionInput = ({ cardNumber, userName, onTransactionAnalyzed }: TransactionInputProps) => {
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fraudAlert, setFraudAlert] = useState<any>(null);

  const knownWebsites = ['amazon.in', 'flipkart.com', 'paytm.com', 'myntra.com', 'zomato.com', 'swiggy.com'];
  const trustedLocations = ['Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra'];
  const illegalWebsites = ['darkweb.com', 'illegal-gambling.net', 'fake-crypto.org', 'scam-site.com'];

  const analyzeTransaction = () => {
    if (!amount || !merchant || !location) return;
    
    setIsAnalyzing(true);
    setFraudAlert(null);
    
    const transactionData = {
      amount: parseFloat(amount),
      merchant,
      location,
      time: new Date(),
      cardType: 'credit'
    };

    const riskScore = fraudDetectionAI.analyzeTransaction(transactionData);
    
    let additionalRisk = 0;
    const riskFactors = [];
    let isFraud = false;

    // Check for illegal websites
    if (website && illegalWebsites.some(illegal => website.toLowerCase().includes(illegal))) {
      additionalRisk += 0.8;
      riskFactors.push('Illegal/fraudulent website detected');
      isFraud = true;
    }

    // Unknown website check
    if (website && !knownWebsites.some(known => website.toLowerCase().includes(known)) && !isFraud) {
      additionalRisk += 0.3;
      riskFactors.push('Unknown/suspicious website');
    }

    // Unknown location check
    if (!trustedLocations.some(trusted => location.includes(trusted))) {
      additionalRisk += 0.2;
      riskFactors.push('Unusual location');
    }

    // High amount check (INR)
    if (parseFloat(amount) > 50000) {
      additionalRisk += 0.25;
      riskFactors.push('High transaction amount');
    }

    const finalRiskScore = Math.min(riskScore + additionalRisk, 1);
    
    // Fraud detection for high amounts on illegal sites or unusual locations
    if ((parseFloat(amount) > 10000 && (website && illegalWebsites.some(illegal => website.toLowerCase().includes(illegal)))) || 
        (parseFloat(amount) > 25000 && !trustedLocations.some(trusted => location.includes(trusted)))) {
      isFraud = true;
    }
    
    const result = {
      id: Math.random().toString(36).substr(2, 9),
      ...transactionData,
      riskScore: finalRiskScore,
      riskFactors,
      status: isFraud ? 'fraud' : finalRiskScore > 0.7 ? 'blocked' : finalRiskScore > 0.4 ? 'suspicious' : 'approved',
      website,
      timestamp: new Date(),
      isFraud,
      userName
    };

    if (isFraud) {
      setFraudAlert({
        detected: true,
        amount: parseFloat(amount),
        location,
        website,
        cybercrimeHelpline: '1930',
        bankHelpline: '1800-XXX-XXXX'
      });
    }

    setTimeout(() => {
      setIsAnalyzing(false);
      onTransactionAnalyzed(result);
      // Reset form
      setAmount('');
      setMerchant('');
      setLocation('');
      setWebsite('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {fraudAlert && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>FRAUD DETECTED!</AlertTitle>
          <AlertDescription>
            <div className="space-y-2 mt-2">
              <p>Suspicious transaction of ₹{fraudAlert.amount.toLocaleString('en-IN')} detected!</p>
              <div className="bg-red-50 p-3 rounded-md space-y-1">
                <p className="font-semibold">Immediate Actions Required:</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Cybercrime Helpline: <strong>{fraudAlert.cybercrimeHelpline}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Bank Fraud Helpline: <strong>{fraudAlert.bankHelpline}</strong></span>
                </div>
                <p className="text-sm">• Block your card immediately</p>
                <p className="text-sm">• Report to cyber police</p>
                <p className="text-sm">• Do not share OTP or card details</p>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Transaction Analysis (INR)
          </CardTitle>
          <CardDescription>
            Card: {cardNumber} | User: {userName} - Enter transaction details for fraud analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="merchant">Merchant</Label>
              <Input
                id="merchant"
                placeholder="e.g., Amazon, Flipkart"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website (if online)</Label>
              <Input
                id="website"
                placeholder="e.g., amazon.in"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          {/* Risk Indicators */}
          <div className="flex flex-wrap gap-2">
            {website && illegalWebsites.some(illegal => website.toLowerCase().includes(illegal)) && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                ILLEGAL WEBSITE
              </Badge>
            )}
            {website && !knownWebsites.some(known => website.toLowerCase().includes(known)) && !illegalWebsites.some(illegal => website.toLowerCase().includes(illegal)) && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Unknown Website
              </Badge>
            )}
            {location && !trustedLocations.some(trusted => location.includes(trusted)) && (
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Unusual Location
              </Badge>
            )}
            {parseFloat(amount) > 50000 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                High Amount
              </Badge>
            )}
          </div>

          <Button 
            onClick={analyzeTransaction}
            disabled={!amount || !merchant || !location || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Transaction'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionInput;
