'use client'

import VideoIntro from '@/components/VideoIntro/VideoIntro'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <VideoIntro videoSrc="/hero.mp4" />

      {/* Next section — scroll target */}
      <section id="work" className={styles.work}>
        <div className={styles.workInner}>
          <span className={styles.eyebrow}>Selected Work</span>
          <h2 className={styles.workTitle}>
            Crafted with<br />
            <em>intention</em>
          </h2>
          <p className={styles.workBody}>
            Scroll further to explore a curated selection of projects built at the
            intersection of engineering precision and visual storytelling.
          </p>
        </div>
      </section>
    </main>
  )
}
