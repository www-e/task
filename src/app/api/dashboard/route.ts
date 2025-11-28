import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    const response = await fetch(`${backendUrl}/api/dashboard`, {
      method: 'GET',
      credentials: 'include',
    });

    // Check if the response is ok and handle non-JSON responses
    if (!response.ok) {
      // If the backend returned an error, get the text response
      const errorText = await response.text();
      console.error('Backend dashboard error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch dashboard data', details: errorText }, {
        status: response.status
      });
    }

    // Check content type before parsing JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();

      // Forward the response from the backend
      return NextResponse.json(data, { status: response.status });
    } else {
      // If it's not JSON, return an error
      const text = await response.text();
      console.error('Non-JSON response from backend:', text);
      return NextResponse.json({ error: 'Invalid response from backend' }, { status: 500 });
    }
  } catch (error) {
    console.error('Dashboard API route error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}