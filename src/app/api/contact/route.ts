// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    // Basit bir sunucu tarafı doğrulaması
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required.' },
        { status: 400 }
      );
    }

    // 1. Postacıyı (Transporter) Ayarla
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2. Mail İçeriğini Hazırla
    const mailOptions = {
      from: `"QMER Website" <${process.env.SMTP_USER}>`, // Gönderen (Sunucudaki mail olmalı)
      to: process.env.MAIL_TO, // Alıcı (Senin mailin)
      replyTo: email, // Yanıtla deyince müşterinin maili çıksın
      subject: `New Contact Msg: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #064E3B;">New Message from Qmer.us</h2>
          <p><strong>From:</strong> ${firstName || 'Guest'} ${lastName || ''}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <h3>Message:</h3>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    // 3. Maili Gönder
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Mail error:', error);
    return NextResponse.json(
      { error: 'Failed to send email.' },
      { status: 500 }
    );
  }
}