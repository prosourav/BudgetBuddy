import { NextRequest, NextResponse } from 'next/server';
import requests from '@/config/http';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const response = await requests.post('/transactions', body);
    const data = response.data;
    console.log("Response data:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
          headers: error.config?.headers
        }
      });

      // Return more detailed error information
      return NextResponse.json({
        message: 'Error processing request',
        error: error.response?.data || error.message
      }, { status: error.response?.status || 500 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json({ message: 'Unexpected error occurred' }, { status: 500 });
    }
  }
}