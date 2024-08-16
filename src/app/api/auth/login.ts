import requests from '@/config/http';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await requests.post('/register', req.body);
    const data = response.data;
    console.log("Data: ", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("This is the error: ",error);
    res.status(500).json({
      message: 'Error fetching data'
    });
  }
}