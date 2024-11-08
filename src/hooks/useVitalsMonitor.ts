import { useState, useEffect } from 'react';


export function useVitalsMonitor() {
    const [vitals, setVitals] = useState({
      heartRate: Array.from({length: 20}, () => ({
        time: new Date(),
        value: Math.floor(Math.random() * 20) + 70
      }))
    });
  
    useEffect(() => {
      const interval = setInterval(() => {
        setVitals(prev => ({
          heartRate: [
            ...prev.heartRate.slice(1),
            {
              time: new Date(),
              value: Math.floor(Math.random() * 20) + 70
            }
          ]
        }));
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return vitals;
  }