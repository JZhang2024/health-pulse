# HealthPulse

HealthPulse is a web-based platform that demonstrates the integration of computer vision and AI in healthcare technology. The application provides contactless vital sign monitoring through webcam-based photoplethysmography (PPG) and features an AI health assistant for personalized guidance.

![Project Preview Image Placeholder](/api/placeholder/800/400)

## Features

### Real-time Vital Sign Monitoring
- Heart rate measurement through PPG technology
- Respiratory rate detection
- Real-time confidence scores
- Visual data representation with interactive charts

### AI Health Assistant
- Personalized health information
- Natural language interaction
- General health guidance
- Vital sign interpretation

### Technical Features
- Contactless monitoring using computer vision
- Real-time video processing at 30 FPS
- Immediate analysis and results
- Responsive web design

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- React
- TypeScript
- TailwindCSS
- shadcn/ui components
- Recharts for data visualization

### APIs & Integrations
- VitalLens API from Roust Labs for vital sign detection
- WebRTC for camera access
- MediaRecorder API for video capture

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- A modern web browser with webcam access
- VitalLens API key from [Roust Labs](https://www.rouast.com/api/)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/healthpulse.git
cd healthpulse
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create a .env.local file
cp .env.example .env.local

# Add your API key
VITALLENS_API_KEY=your_api_key_here
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # Home page
│   ├── about/
│   │   └── page.tsx           # About page
│   ├── help/
│   │   └── page.tsx           # Help page
│   └── dashboard/
│       └── page.tsx           # Main dashboard
├── components/
│   ├── layout/
│   │   └── Navigation.tsx     # Site navigation
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── TechnicalDetails.tsx
│   │   └── Disclaimer.tsx
│   ├── dashboard/
│   │   ├── DashboardClient.tsx
│   │   ├── MainAnalysisPanel.tsx
│   │   ├── ControlBar.tsx
│   │   └── AnalysisSummary.tsx
│   └── vitals/
│       ├── VitalsChart.tsx
│       ├── VitalMetricCard.tsx
│       └── RecordingProgress.tsx
└── hooks/
    ├── useVitalsMonitor.ts    # Vital signs monitoring logic
    └── useCamera.ts           # Camera handling logic
```

## Key Features Implementation

### Vital Signs Monitoring
The application uses the VitalLens API to process video streams and extract vital signs using photoplethysmography (PPG). This allows for contactless measurement of:
- Heart rate through blood flow detection
- Respiratory rate through chest movement analysis

### Camera Handling
- Implements WebRTC for camera access
- Uses MediaRecorder API for video capture
- Supports both MP4 and WebM formats
- Automatic quality and codec selection

### Real-time Analysis
- Processes video at 30 FPS
- Provides immediate vital sign measurements
- Includes confidence scores for accuracy
- Displays real-time data visualization

## Development Notes

### Browser Support
- Chrome/Edge (Recommended)
- Firefox
- Safari

### Known Limitations
- Requires good lighting conditions
- Subject must remain relatively still
- Performance depends on camera quality
- Best results with 30-second recordings

## Acknowledgments

This project utilizes the VitalLens API from Roust Labs for vital signs detection. VitalLens provides the computer vision and PPG technology that enables contactless vital sign monitoring.

## Disclaimer

This is a learning project created to explore healthcare technology implementation. It should not be used for medical diagnosis or treatment decisions. Always consult healthcare professionals for medical advice and use FDA-approved devices for clinical vital sign monitoring.