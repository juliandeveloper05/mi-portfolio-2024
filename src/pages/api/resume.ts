import { NextApiRequest, NextApiResponse } from 'next';
import { renderToBuffer, DocumentProps } from '@react-pdf/renderer';
import React from 'react';
import ResumeDocument from '@/components/pdf/ResumeDocument';
import { resumeData, Locale } from '@/data/resumeData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const locale: Locale =
    (req.query.locale as string) === 'es' ? 'es' : 'en';

  const data = resumeData[locale];
  const element = React.createElement(
    ResumeDocument,
    { data }
  ) as React.ReactElement<DocumentProps>;

  const buffer = await renderToBuffer(element);

  const filename = `Julian_Soto_CV_${locale.toUpperCase()}.pdf`;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Length', buffer.length);
  res.send(buffer);
}
