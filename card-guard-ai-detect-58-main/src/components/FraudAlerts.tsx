
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'high-risk' | 'suspicious-pattern' | 'unusual-location' | 'velocity-check';
  message: string;
  timestamp: Date;
  severity: 'high' | 'medium' | 'low';
  cardNumber: string;
}

const FraudAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Simulate fraud alerts
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'high-risk',
        message: 'High-risk transaction detected - unusual spending pattern',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        severity: 'high',
        cardNumber: '****-****-****-4521'
      },
      {
        id: '2',
        type: 'unusual-location',
        message: 'Transaction from unusual location detected',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        severity: 'medium',
        cardNumber: '****-****-****-7832'
      },
      {
        id: '3',
        type: 'velocity-check',
        message: 'Multiple transactions in short time frame',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        severity: 'medium',
        cardNumber: '****-****-****-9154'
      }
    ];

    setAlerts(mockAlerts);

    // Simulate new alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newAlert: Alert = {
          id: Math.random().toString(36).substr(2, 9),
          type: ['high-risk', 'suspicious-pattern', 'unusual-location', 'velocity-check'][Math.floor(Math.random() * 4)] as Alert['type'],
          message: 'New suspicious activity detected',
          timestamp: new Date(),
          severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as Alert['severity'],
          cardNumber: `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-red-600" />
          Fraud Alerts
          {alerts.length > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {alerts.length}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Real-time fraud detection alerts and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>No active alerts</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dismissAlert(alert.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-gray-800 mb-2">{alert.message}</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Card: {alert.cardNumber}</div>
                  <div>{alert.timestamp.toLocaleString()}</div>
                </div>
                <div className="mt-2 space-x-2">
                  <Button size="sm" variant="outline">
                    Investigate
                  </Button>
                  <Button size="sm" variant="destructive">
                    Block Card
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FraudAlerts;
