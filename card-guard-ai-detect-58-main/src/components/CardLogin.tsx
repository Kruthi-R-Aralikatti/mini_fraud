
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Shield, User } from 'lucide-react';

interface CardLoginProps {
  onLogin: (cardNumber: string, name: string) => void;
}

const CardLogin = ({ onLogin }: CardLoginProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setIsValid(formatted.replace(/\s/g, '').length >= 13 && name.trim().length > 0);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsValid(cardNumber.replace(/\s/g, '').length >= 13 && e.target.value.trim().length > 0);
  };

  const handleLogin = () => {
    if (isValid) {
      onLogin(cardNumber, name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <CardTitle className="text-2xl">CardGuard AI</CardTitle>
          </div>
          <CardDescription>
            Enter your details to access fraud monitoring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={handleNameChange}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="pl-10"
                maxLength={19}
              />
            </div>
          </div>
          <Button 
            onClick={handleLogin} 
            disabled={!isValid}
            className="w-full"
          >
            Access Fraud Detection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardLogin;
