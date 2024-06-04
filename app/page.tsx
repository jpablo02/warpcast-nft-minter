import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'
import Image from 'next/image'

import styles from './page.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
   // `https://learningfrog.vercel.app/api`,
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api`,
  )
  return {
    other: frameTags,
  }
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {/* Aquí puedes agregar contenido adicional */}
      </div>
      <div className={styles.followBanner}>
        Follow: <a href="https://warpcast.com/pablodrum" target="_blank" rel="noopener noreferrer">@pablodrum</a>
      </div>
      <img
        src="https://gateway.lighthouse.storage/ipfs/QmchMacpd19j2b2E1feAuK8JGD6d4tSTMjmJryxvtHuUEd"
        alt="Spaceship"
        style={{
          maxWidth: '80%',
          height: '100%',
          zIndex: 100
        }}
      />
      
      
    </main>
  )
}
