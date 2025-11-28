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

    const response = await fetch(`${backendUrl}/api/dashboard`, {
      method: 'GET',
      headers,
      credentials: 'include',
      // Add cache option to prevent Next.js from recompiling unnecessarily
      cache: 'no-store', // Initially no cache to fix the issue, can be optimized later
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

      // Forward the response from the backend with caching headers
      const nextResponse = NextResponse.json(data, { status: response.status });

      // Add caching headers to improve performance for subsequent requests
      nextResponse.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');

      return nextResponse;
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