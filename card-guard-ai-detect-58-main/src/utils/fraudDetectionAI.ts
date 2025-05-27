
interface TransactionData {
  amount: number;
  merchant: string;
  location: string;
  time: Date;
  cardType: string;
}

class FraudDetectionAI {
  private riskThresholds = {
    highAmount: 1000,
    suspiciousHours: [0, 1, 2, 3, 4, 5], // Late night hours
    highRiskMerchants: ['ATM', 'Gas Station'],
    highRiskLocations: ['Unknown', 'International']
  };

  analyzeTransaction(transaction: TransactionData): number {
    let riskScore = 0;

    // Amount-based risk
    if (transaction.amount > this.riskThresholds.highAmount) {
      riskScore += 0.3;
    } else if (transaction.amount > 500) {
      riskScore += 0.15;
    }

    // Time-based risk
    const hour = transaction.time.getHours();
    if (this.riskThresholds.suspiciousHours.includes(hour)) {
      riskScore += 0.2;
    }

    // Merchant-based risk
    if (this.riskThresholds.highRiskMerchants.some(merchant => 
      transaction.merchant.includes(merchant))) {
      riskScore += 0.25;
    }

    // Location-based risk
    if (this.riskThresholds.highRiskLocations.some(location => 
      transaction.location.includes(location))) {
      riskScore += 0.3;
    }

    // Velocity check (simulated)
    if (Math.random() > 0.8) {
      riskScore += 0.15; // Random velocity risk
    }

    // Pattern analysis (simulated ML behavior)
    const patternRisk = this.analyzePatterns(transaction);
    riskScore += patternRisk;

    // Normalize risk score between 0 and 1
    return Math.min(riskScore, 1);
  }

  private analyzePatterns(transaction: TransactionData): number {
    // Simulate ML pattern analysis
    const patterns = [
      'unusual_spending_pattern',
      'device_fingerprint',
      'behavioral_analysis',
      'geolocation_anomaly'
    ];

    let patternRisk = 0;

    // Simulate pattern detection with some randomness
    patterns.forEach(pattern => {
      if (Math.random() > 0.7) {
        switch (pattern) {
          case 'unusual_spending_pattern':
            patternRisk += 0.1;
            break;
          case 'device_fingerprint':
            patternRisk += 0.05;
            break;
          case 'behavioral_analysis':
            patternRisk += 0.08;
            break;
          case 'geolocation_anomaly':
            patternRisk += 0.12;
            break;
        }
      }
    });

    return patternRisk;
  }

  // Machine Learning Model Simulation
  predictFraud(transactionHistory: TransactionData[]): {
    prediction: 'fraud' | 'legitimate';
    confidence: number;
    features: string[];
  } {
    // Simulate ML model prediction
    const features = [
      'amount_zscore',
      'merchant_frequency',
      'location_variance',
      'time_pattern',
      'velocity_score'
    ];

    const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
    const prediction = confidence > 0.85 ? 'fraud' : 'legitimate';

    return {
      prediction,
      confidence,
      features
    };
  }

  // Real-time monitoring
  monitorTransaction(transaction: TransactionData): {
    action: 'approve' | 'review' | 'block';
    reason: string;
    riskScore: number;
  } {
    const riskScore = this.analyzeTransaction(transaction);

    if (riskScore > 0.7) {
      return {
        action: 'block',
        reason: 'High fraud risk detected',
        riskScore
      };
    } else if (riskScore > 0.4) {
      return {
        action: 'review',
        reason: 'Suspicious activity detected',
        riskScore
      };
    } else {
      return {
        action: 'approve',
        reason: 'Low risk transaction',
        riskScore
      };
    }
  }
}

export const fraudDetectionAI = new FraudDetectionAI();
