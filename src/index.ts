import express, { Application, Errback, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import RenderPDF from 'chrome-headless-render-pdf';
import fs from "fs";
import { hash } from './hash';

dotenv.config();
const port = process.env.PORT || 3000;

const app: Application = express();


app.get('/', async (req: express.Request<{}, {}, {}, { url: string }>, res: express.Response, next: NextFunction) => {
  let url: string = req.query.url;
  const fileName = `${hash(url)}.pdf`;
  const filePath = `files/${fileName}`;
  const fullPath = `public/${filePath}`;

  console.log(`Request to pdf ${filePath}...`)
  const serveOptions = {
    root: 'public',
    headers: {
      'Content-Disposition': `filename=${url}.pdf`
    },
  };
  // try to serve file
  res.sendFile(filePath, serveOptions, async function (err) {
    if (err) {
      console.log(`... file not found, generating ${filePath}`)
      await RenderPDF.generateSinglePdf(url, fullPath, { chromeOptions: ['--no-sandbox', '--disable-dev-shm-usage'], printLogs: true });
      console.log(`Generated ${filePath}; ... try serving again`)

      res.sendFile(filePath, serveOptions, function (err) {
        if (err) {
          res.status(500).send('Something broke!')
        } else {
          console.log('File sent:', fileName)
        }
      });
    } else {
      console.log('File sent:', fileName)
    }
  })
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});