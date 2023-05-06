"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'seuemail@gmail.com',
        pass: 'suasenha',
    },
});
app.post('/send-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body;
    try {
        yield transporter.sendMail({
            from: 'seuemail@gmail.com',
            to: message.to,
            subject: message.subject,
            text: message.body,
        });
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
    }
}));
app.listen(3333, () => {
    console.log('Servidor iniciado na porta 3333.');
});
//# sourceMappingURL=server.js.map