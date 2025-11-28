import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Get the token from cookies and include it in the request
    const cookieStore = cookies();
    const token = cookieStore.get('token'); // Match the cookie name from JWT_CONFIG

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Include the token in headers if available
    if (token) {
      headers['Cookie'] = `${token.name}=${token.value}`;
    }

    const response = await fetch(`${backendUrl}/api/quizzes`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    // Check if the response is ok and handle non-JSON responses
    if (!response.ok) {
      // If the backend returned an error, get the text response
      const errorText = await response.text();
      console.error('Backend quizzes error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch quizzes', details: errorText }, {
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
    console.error('Quizzes API route error:', error);
    return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const body = await request.json();

    const response = await fetch(`${backendUrl}/api/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    // Check if the response is ok and handle non-JSON responses
    if (!response.ok) {
      // If the backend returned an error, get the text response
      const errorText = await response.text();
      console.error('Backend quizzes error:', errorText);
      return NextResponse.json({ error: 'Failed to create quiz', details: errorText }, {
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
    console.error('Quizzes API route error:', error);
    return NextResponse.json({ error: 'Failed to handle quiz request' }, { status: 500 });
  }
}