// About page ("/about") — static page describing the purpose and mission of AForum.
import React from "react";
import styles from "@/Css/about.module.css";

export const metadata = {
  title: "About Us - AForum",
  description: "Learn more about AForum, our mission, and our team.",
};

const features = [
  {
    icon: "💬",
    title: "Open Discussions",
    desc: "Start threads, ask questions, and exchange ideas across a wide range of topics.",
  },
  {
    icon: "📂",
    title: "Organized Categories",
    desc: "Content is structured into categories and subcategories so you always find what you're looking for.",
  },
  {
    icon: "✏️",
    title: "Rich Text Posts",
    desc: "Format your posts with bold, italic, lists, quotes, and more using the built-in editor.",
  },
  {
    icon: "🔒",
    title: "User Accounts",
    desc: "Create an account to post, reply, and keep track of your contributions across the forum.",
  },
];

const rules = [
  {
    number: "01",
    title: "Be respectful",
    desc: "Treat every member with respect. Harassment, personal attacks, hate speech, or discriminatory language of any kind will not be tolerated.",
  },
  {
    number: "02",
    title: "Stay on topic",
    desc: "Post in the relevant category and keep discussions on track. Off-topic derailing makes threads harder to follow for everyone.",
  },
  {
    number: "03",
    title: "No spam or self-promotion",
    desc: "Do not flood threads with repetitive content, unsolicited advertisements, or links that add no value to the discussion.",
  },
  {
    number: "04",
    title: "Keep it constructive",
    desc: "Disagreement is fine — hostility is not. If you disagree with someone, explain why. Contribute something useful rather than just tearing things down.",
  },
  {
    number: "05",
    title: "Protect privacy",
    desc: "Never share personal information about others without their consent. This includes real names, addresses, phone numbers, or any identifying details.",
  },
  {
    number: "06",
    title: "No illegal content",
    desc: "Do not post content that is illegal, promotes illegal activity, or violates copyright. This includes pirated material, dangerous instructions, or anything that breaks applicable law.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.hero}>
          <h1 className={styles.heading}>About AForum</h1>
          <p className={styles.tagline}>
            A clean, modern forum built for real conversations.
          </p>
        </div>

        <div className={styles.section}>
          <p>
            AForum is a community platform designed to make online discussion feel
            organized and approachable. Whether you want to ask a question, share
            something you know, or just browse what others are talking about —
            this is the place for it.
          </p>
          <p>
            The goal is simple: keep things readable, keep things fast, and let
            the conversations speak for themselves. Content is structured into
            categories so every topic has a home, and every member has a voice.
          </p>
        </div>

        <div className={styles.divider} />

        <h2 className={styles.subheading}>What you can do</h2>
        <div className={styles.featureGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <h2 className={styles.subheading}>Community guidelines</h2>
        <p className={styles.rulesIntro}>
          AForum is only as good as the people in it. These rules exist to keep
          the community a place worth coming back to.
        </p>
        <div className={styles.rulesList}>
          {rules.map((r) => (
            <div key={r.number} className={styles.ruleItem}>
              <span className={styles.ruleNumber}>{r.number}</span>
              <div className={styles.ruleContent}>
                <h3 className={styles.ruleTitle}>{r.title}</h3>
                <p className={styles.ruleDesc}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.footer}>
          <p>
            AForum is built with <strong>Next.js</strong>, <strong>Sanity</strong>,
            and a custom CSS design system. It is actively developed — if you run
            into issues or have suggestions, feedback is always welcome.
          </p>
        </div>

      </div>
    </div>
  );
}
