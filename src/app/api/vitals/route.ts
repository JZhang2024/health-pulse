import { NextRequest, NextResponse } from "next/server";

// Mock data generator to simulate VitalLens response
function generateMockVitalsData(duration: number = 30, fps: number = 30) {
  const frames = duration * fps;
  const timePoints = Array.from({ length: frames }, (_, i) => i / fps);
  
  return {
    heartRate: {
      timeSeries: timePoints.map(time => ({
        time,
        value: 75 + Math.sin(time) * 5 + Math.random() * 2,
        confidence: 0.8 + Math.random() * 0.2
      })),
      average: 75,
      confidence: 0.85,
      unit: "bpm",
      note: "Normal sinus rhythm detected"
    },
    respiratoryRate: {
      timeSeries: timePoints.map(time => ({
        time,
        value: 16 + Math.sin(time/2) * 2 + Math.random(),
        confidence: 0.75 + Math.random() * 0.2
      })),
      average: 16,
      confidence: 0.78,
      unit: "br/min",
      note: "Regular breathing pattern"
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get the video from the request
    const formData = await request.formData();
    const video = formData.get('video');
    const fps = Number(formData.get('fps')) || 30;

    if (!video) {
      return NextResponse.json(
        { error: "No video provided" },
        { status: 400 }
      );
    }

    // For development, just return mock data
    const mockResults = generateMockVitalsData(30, fps);
    
    return NextResponse.json(mockResults);

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}