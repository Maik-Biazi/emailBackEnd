import express, { Request, Response } from 'express';

import cors from 'cors';
import nodemailer, { Transporter } from 'nodemailer';


interface IMessage {
  to: string;
  subject: string;
  body?: string;
  name: string;


}

const app = express();
app.use(cors());
app.use(express.json());

const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,

  secure: false,
  auth: {
    user: 'maikwilliam4553@gmail.com',
    pass: 'dgkkvqdaycebezrp'



  },
});

app.post('/send-email', async (req: Request, res: Response) => {
  const message: IMessage = req.body;


  try {
    await transporter.sendMail({
      to: message.to,
      from: 'maikwilliam4553@gmail.com',
      subject:message.subject ,
      html: `
      <html>
        <body>
          <p>Remetente ${message.name}</p>
          <p>  ${message.body}</p>
        </body>
      </html>
    `

    });

    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    console.log(message)


  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
    console.log(error)
  }
});

app.listen(3333, () => {
  console.log('Servidor iniciado na porta 3333.');
});