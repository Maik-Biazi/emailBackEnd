"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// const oAuth2Client = new OAuth2Client(
//   '17981836483-pvq5cq37qkegfhvrki6394obg43ib31b.apps.googleusercontent.com',
//   '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'
// );
// const authorizeUrl = oAuth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: 'https://www.googleapis.com/auth/gmail.send'
// });
// const code = 'código-de-autorização-aqui';
// const {tokens} = await oAuth2Client.getToken(code);
// const accessToken = tokens.access_token;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'maikwilliam4553@gmail.com',
        pass: 'pzdksmbdsldpkicb',
    },
});
app.post('/send-email', async (req, res) => {
    const message = req.body;
    try {
        await transporter.sendMail({
            to: message.to,
            from: 'maikwilliam4553@gmail.com',
            subject: `${message.subject} Nome${message.name}`,
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
        console.log(message);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
        console.log(error);
    }
});
app.listen(3333, () => {
    console.log('Servidor iniciado na porta 3333.');
});
//# sourceMappingURL=index.js.map