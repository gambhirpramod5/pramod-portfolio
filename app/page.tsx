'use client'

import VideoIntro from '@/components/VideoIntro/VideoIntro'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <VideoIntro videoSrc="/hero.mp4" />

      <section id="work" className={styles.about}>
        <div className={styles.aboutInner}>
          <span className={styles.eyebrow}>About</span>
          <h2 className={styles.sectionTitle}>
            Where <em>technical depth</em><br />meets business acumen
          </h2>
          <p className={styles.body}>
            Results-driven SAP Technical Analyst with 3+ years of hands-on ABAP
            development and business analysis across SAP implementation and
            enhancement projects. Backed by 7+ years of overall professional
            experience including ERP-driven business operations — bringing a rare
            combination of technical depth and business acumen.
          </p>
          <div className={styles.contactRow}>
            <a href="mailto:gambhirpramod915@gmail.com" className={styles.contactLink}>gambhirpramod915@gmail.com</a>
            <span className={styles.contactDot} />
            <a href="tel:+919014251260" className={styles.contactLink}>+91 90142 51260</a>
            <span className={styles.contactDot} />
            <a href="http://www.linkedin.com/in/pramod-gambhir-50bb4340a" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>LinkedIn ↗</a>
          </div>
        </div>
      </section>

      <section className={styles.skills}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Core Competencies</span>
          <div className={styles.skillsGrid}>
            {SKILL_GROUPS.map(group => (
              <div key={group.title} className={styles.skillCard}>
                <h3 className={styles.skillTitle}>{group.title}</h3>
                <ul className={styles.skillList}>
                  {group.items.map(item => (
                    <li key={item} className={styles.skillItem}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.experience}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Professional Experience</span>
          <div className={styles.timeline}>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineMeta}>
                  <span className={styles.timelinePeriod}>{exp.period}</span>
                  <span className={styles.timelineLocation}>{exp.location}</span>
                </div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineRole}>{exp.role}</h3>
                  <span className={styles.timelineCompany}>{exp.company}</span>
                  <ul className={styles.timelinePoints}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} className={styles.timelinePoint}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.eduSection}>
        <div className={styles.container}>
          <div className={styles.eduGrid}>
            <div>
              <span className={styles.eyebrow}>Education</span>
              {EDUCATION.map((edu, i) => (
                <div key={i} className={styles.eduItem}>
                  <span className={styles.eduYear}>{edu.year}</span>
                  <h4 className={styles.eduDegree}>{edu.degree}</h4>
                  <span className={styles.eduSchool}>{edu.school}</span>
                </div>
              ))}
            </div>
            <div>
              <span className={styles.eyebrow}>Certifications</span>
              {CERTS.map((cert, i) => (
                <div key={i} className={styles.certItem}>
                  <span className={styles.certBadge}>✓</span>
                  <span className={styles.certName}>{cert}</span>
                </div>
              ))}
              <div className={styles.locationCard}>
                <span className={styles.eyebrow} style={{ marginTop: '2.5rem' }}>Location</span>
                <p className={styles.locationText}>Hyderabad, Telangana, India</p>
                <p className={styles.locationSub}>Open to remote &amp; hybrid opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2025 Pramod Gambhir &nbsp;·&nbsp; SAP Technical Analyst</p>
      </footer>
    </main>
  )
}

const SKILL_GROUPS = [
  { title: 'ABAP Development', items: ['RFC Function Modules', 'ALV Reports', 'Module Pool', 'Smart Forms', 'Classical Reports'] },
  { title: 'Enhancements & Integration', items: ['BADIs', 'User Exits', 'Enhancement Spots', 'IDocs', 'BAPIs', 'File-based Interfaces'] },
  { title: 'SAP Functional', items: ['S/4HANA Migration', 'SAP MM / SD / FI', 'Performance Tuning', 'SQL Trace (ST05)', 'ABAP Debugger'] },
  { title: 'Business Analysis', items: ['Requirements Gathering', 'UAT & Testing', 'Stakeholder Management', 'Process Documentation', 'Power BI', 'Advanced Excel'] },
]

const EXPERIENCE = [
  {
    company: 'American Airlines', role: 'SAP Technical Analyst',
    location: 'Dallas, Texas, USA', period: 'Jan 2023 – Mar 2026',
    highlights: [
      'Created RFC function modules for real-time status updates across approved, pending, rejected, and blocked workflows.',
      'Developed mail alert system for schedule-date changes, ensuring timely communication across teams.',
      'Supported S/4HANA migration including data integration and data-flow optimization.',
      'Built KPI dashboards and Power BI frameworks to track operational performance and revenue metrics.',
    ],
  },
  {
    company: 'NFG Inc.', role: 'Business Operations Manager',
    location: 'California, USA', period: 'Jul 2017 – Aug 2021',
    highlights: [
      'Managed end-to-end operations across multiple franchise locations using SAP MM/SD/FI modules.',
      'Achieved 10–15% reduction in operating costs through data-driven decision-making.',
      'Drove 12–18% revenue growth via CRM and POS data analysis on customer behavior and campaign ROI.',
      'Improved employee retention by 20% through structured recruitment and training using HRIS tools.',
    ],
  },
  {
    company: 'Camber Pharmaceuticals', role: 'Business Operations Executive',
    location: 'New Jersey, USA', period: 'Mar 2016 – Feb 2017',
    highlights: [
      'Configured ERP modules for Inventory, Sales, Finance, and Procurement across supply chain operations.',
      'Provided functional support for SAP sales-order and logistics workflows ensuring accurate order-to-cash processing.',
      'Conducted sales forecasting and demand planning using ERP reporting extracts and Excel analytics.',
    ],
  },
]

const EDUCATION = [
  { year: '2021 – 2023', degree: 'M.S. Computer Science', school: 'American National University, USA' },
  { year: '2015 – 2017', degree: 'MBA', school: 'Northwestern Polytechnic University, USA' },
  { year: '2012 – 2014', degree: "Master's in Mechanical Engineering", school: 'Staffordshire University, UK' },
  { year: '2009 – 2012', degree: 'B.E. Mechanical Engineering', school: 'JNTU Hyderabad, India' },
]

const CERTS = [
  'SAP Business Analyst — Coursera (Verified)',
  'Generative AI for Marketing, Sales & Campaigns — Coursera (Verified)',
]
