"use client"; // this is a client component

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import * as crypto from 'crypto'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [str, setStr] = useState("")
  useEffect(() => {
    if (str == "") {
      const enc = Aes256Encrypt('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpX', '0nhQFlPs-InjMbAo', 'hello world')
      console.log(enc)
      setStr(enc)
    }
  }, [str])

  const pad = (buf: Buffer, size: number) => {
    let bufLen = buf.length;
    let padLen = size - bufLen % size;
    let padded = Buffer.alloc(bufLen + padLen);
    buf.copy(padded);
    for (let i = 0; i < padLen; i++) {
      padded[bufLen + i] = padLen;
    }
    return padded;
  }

  const Aes256Encrypt = (cipherKey: string, ivKey: string, unencrypted: string) => {
    let key = Buffer.from(cipherKey, 'utf8');
    let iv = Buffer.from(ivKey, 'utf8');
    let plainText = Buffer.from(unencrypted, 'utf8');
    plainText = pad(plainText, 16);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([Buffer.alloc(16), encrypted]);

    return encrypted.toString('base64')
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Result Encryption of "hello world" is&nbsp;
          <code className={styles.code}>{str}</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
