import { prisma } from '@/lib/prisma';
import * as argon2 from 'argon2';
import { generateSecret, generateURI } from 'otplib';
import QRCode from 'qrcode';
import Link from 'next/link';

export default async function ProvisionCustomAdmin() {
  const username = '6769420';
  const password = 'ajpfan69';

  let admin = await prisma.admin.findUnique({ where: { username } });
  
  let mfaSecret = admin?.mfaSecret;

  if (!admin) {
    mfaSecret = generateSecret();
    const hashedPassword = await argon2.hash(password);
    admin = await prisma.admin.create({
      data: {
        username,
        passwordHash: hashedPassword,
        mfaSecret,
        role: 'admin'
      }
    });
  }

  if (!mfaSecret) {
    return <div>Admin exists but has no MFA secret.</div>;
  }

  const otpauthUrl = generateURI({
    issuer: 'Behind The Smile (Admin)',
    label: username,
    secret: mfaSecret
  });

  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

  return (
    <div style={{ maxWidth: '600px', margin: '5rem auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Account Provisioned Successfully</h1>
      <p style={{ marginBottom: '2rem' }}>
        The account <strong>{username}</strong> has been created with the requested password.
      </p>
      
      <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '12px', marginBottom: '2rem' }}>
        <img src={qrCodeDataUrl} alt="QR Code" width={200} height={200} />
      </div>

      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Scan this QR code with your Authenticator app now. <br/>
        Manual Entry Secret: <strong>{mfaSecret}</strong>
      </p>
      
      <Link href="/admin" style={{ padding: '0.75rem 1.5rem', background: 'var(--primary)', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>
        Proceed to Login
      </Link>
    </div>
  );
}
