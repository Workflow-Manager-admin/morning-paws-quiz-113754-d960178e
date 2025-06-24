import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /**
   * BuzzFeed-style Dog Personality Quiz App
   *
   * Modern, playful, dark-themed responsive SPA to find out
   * "What kind of dog are you based on your morning routine?"
   */
  const colors = {
    accent: '#FFD700',
    primary: '#FF5A5F',
    secondary: '#3A3A3A',
  };

  // Core quiz questions and dog personalities
  const quiz = [
    {
      question: "How do you start your morning?",
      answers: [
        { text: "Jump out of bed, full of energy", dog: "Golden Retriever" },
        { text: "Hit snooze a few times", dog: "French Bulldog" },
        { text: "With a strong coffee", dog: "German Shepherd" },
        { text: "Stretch and slowly wake up", dog: "Greyhound" }
      ]
    },
    {
      question: "Your ideal breakfast is:",
      answers: [
        { text: "A hearty bowl of kibble—just kidding, lots of fruit!", dog: "Golden Retriever" },
        { text: "Something sweet, like a croissant", dog: "French Bulldog" },
        { text: "Eggs & bacon, practical and filling", dog: "German Shepherd" },
        { text: "Just something light—yogurt or smoothie", dog: "Greyhound" }
      ]
    },
    {
      question: "How do you commute to work/school?",
      answers: [
        { text: "Walk or run (gotta get those steps!)", dog: "Golden Retriever" },
        { text: "Public transit while listening to music", dog: "French Bulldog" },
        { text: "Drive myself—always in control", dog: "German Shepherd" },
        { text: "Cycle or scooter, wind in my fur", dog: "Greyhound" }
      ]
    },
    {
      question: "What's your go-to morning mood?",
      answers: [
        { text: "Positive and upbeat", dog: "Golden Retriever" },
        { text: "Chill and cozy", dog: "French Bulldog" },
        { text: "Alert and ready for challenges", dog: "German Shepherd" },
        { text: "Calm and minimalist", dog: "Greyhound" }
      ]
    }
  ];

  // Result info
  const dogPersonalities = {
    "Golden Retriever": {
      emoji: "🐕",
      desc: "You're a Golden Retriever—optimistic, enthusiastic, and ready to take on the day! You bring joy wherever you go.",
      color: colors.accent
    },
    "French Bulldog": {
      emoji: "🐶",
      desc: "You're a French Bulldog—relaxed, loving, and always up for a good cuddle or sweet treat.",
      color: colors.primary
    },
    "German Shepherd": {
      emoji: "🐺",
      desc: "You're a German Shepherd—focused, loyal, and always watching out for your pack. There's nothing you can't handle before 9am.",
      color: "#4D7C0F"
    },
    "Greyhound": {
      emoji: "🐕‍🦺",
      desc: "You're a Greyhound—chill, sleek, and happiest when life keeps moving (but you're also a master at relaxing in style).",
      color: "#56C6D3"
    }
  };

  // App states: 'intro', 'quiz', 'result'
  const [step, setStep] = useState('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  // Calculate quiz result
  function getResultDog() {
    if (!answers.length) return null;
    // Tally up the most selected dog type
    const tally = {};
    answers.forEach(a => { tally[a] = (tally[a] || 0) + 1; });
    // Maximum occurrences
    let bestDog = answers[0];
    let max = 0;
    for (let d in tally) {
      if (tally[d] > max) {
        max = tally[d];
        bestDog = d;
      }
    }
    return dogPersonalities[bestDog] ? bestDog : null;
  }

  // PUBLIC_INTERFACE
  function handleStart() {
    setStep('quiz');
    setCurrent(0);
    setAnswers([]);
    setCopySuccess(false);
  }

  // PUBLIC_INTERFACE
  function handleAnswer(dog) {
    if (current < quiz.length - 1) {
      setAnswers([...answers, dog]);
      setCurrent(current + 1);
    } else {
      setAnswers([...answers, dog]);
      setStep('result');
    }
  }

  // PUBLIC_INTERFACE
  function handleShare(platform, dog, desc) {
    // Sharing logic for social media
    const url = window.location.href;
    const text = encodeURIComponent(`I'm a ${dog}! ${desc}\nFind out your dog personality:`);
    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    }
  }
  // PUBLIC_INTERFACE
  function handleCopyResult(dog, desc) {
    const url = window.location.href;
    navigator.clipboard.writeText(
      `I'm a ${dog}! ${desc}\nDiscover your dog at: ${url}`
    ).then(() => setCopySuccess(true));
  }

  // Responsive and playful dark theme overrides
  React.useEffect(() => {
    document.body.style.background = colors.secondary;
    document.body.style.color = "#fff";
  }, []);

  // THEME COLOR OVERRIDE
  React.useEffect(() => {
    // Override the CSS vars for dark theme and brand colors
    const r = document.documentElement;
    r.style.setProperty('--base-dark', colors.secondary);
    r.style.setProperty('--base-light', colors.primary);
    r.style.setProperty('--accent', colors.accent);
  }, []);

  // COMPONENTS

  // PUBLIC_INTERFACE
  function QuizIntro() {
    return (
      <section className="hero quiz-intro" style={{paddingTop: 96}}>
        <div className="subtitle" style={{color: colors.accent}}>DOG QUIZ</div>
        <h1 className="title" style={{color: colors.primary, fontWeight: 700, marginBottom: 16}}>
          What Kind of Dog <br /> Are You In The Morning?
        </h1>
        <div className="description" style={{marginBottom: 32}}>
          Take this playful personality quiz to find out which canine best matches your morning routine! Answer a few quick questions, then share your result with friends.
        </div>
        <button className="btn btn-large" style={{ background: colors.accent, color: "#222", fontWeight: 700 }} onClick={handleStart}>
          Start the Quiz
        </button>
      </section>
    );
  }

  // PUBLIC_INTERFACE
  function QuizQuestion() {
    const q = quiz[current];

    return (
      <section className="quiz-question" style={{
        margin: '0 auto',
        marginTop: 120,
        background: 'rgba(20,20,20,0.7)',
        borderRadius: '16px',
        boxShadow: `0 4px 24px 0 rgba(255,90,95,0.12)`,
        padding: '32px',
        maxWidth: 500,
        textAlign: 'center'
      }}>
        <div className="subtitle" style={{ color: colors.primary, fontWeight: 600, marginBottom: 12 }}>
          Question {current + 1} of {quiz.length}
        </div>
        <h2 style={{ color: colors.accent, fontWeight: 700, fontSize: '2rem', marginBottom: 24 }}>{q.question}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {q.answers.map((a, i) => (
            <button
              className="btn btn-large"
              key={i}
              style={{
                background: colors.primary,
                color: "#fff",
                border: `2px solid ${colors.accent}`,
                borderRadius: 10,
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)',
                fontSize: '1.12rem',
                fontWeight: 500,
                padding: '16px',
                transition: 'background 0.2s'
              }}
              onClick={() => handleAnswer(a.dog)}
            >
              {a.text}
            </button>
          ))}
        </div>
      </section>
    );
  }

  // PUBLIC_INTERFACE
  function QuizResult() {
    const dog = getResultDog();
    if (!dog) return null;
    const d = dogPersonalities[dog];
    return (
      <section className="quiz-result" style={{
        margin: '0 auto',
        marginTop: 108,
        background: 'rgba(34,34,44,0.93)',
        borderRadius: '20px',
        boxShadow: `0 8px 32px 0 rgba(34,34,44,0.16)`,
        padding: '40px 32px 32px 32px',
        maxWidth: 480,
        textAlign: 'center'
      }}>
        <div className="subtitle" style={{ color: d.color, marginBottom: 10, fontWeight: 700, fontSize: 22 }}>
          {dog} {d.emoji}
        </div>
        <h2 style={{ color: colors.primary, margin: "16px 0", fontWeight: 800 }}>Your Morning Dog Personality</h2>
        <div className="description" style={{ color: '#DDD', marginBottom: 30 }}>{d.desc}</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 12 }}>
          <button className="btn" style={{ background: colors.accent, color: '#2a2a31', fontWeight: 600 }}
            onClick={() => handleShare("twitter", dog, d.desc)}>
            Share on Twitter
          </button>
          <button className="btn" style={{ background: colors.primary, color: '#FFF', fontWeight: 600 }}
            onClick={() => handleShare("facebook", dog, d.desc)}>
            Share on Facebook
          </button>
        </div>
        <div style={{ marginBottom: 14 }}>
          <button className="btn btn-large"
            style={{ margin: "0 auto", background: '#222', border: `2px solid ${d.color}`, color: d.color }}
            onClick={() => handleCopyResult(dog, d.desc)}>
            {copySuccess ? "Copied!" : "Copy Result"}
          </button>
        </div>
        <button className="btn" style={{ marginTop: 16, background: '#fff', color: colors.primary, fontWeight: 700 }}
          onClick={handleStart}>
          Retake Quiz
        </button>
      </section>
    );
  }

  return (
    <div className="app" style={{ minHeight: "100vh", background: colors.secondary }}>
      <nav className="navbar" style={{ background: colors.secondary, borderBottom: `2.5px solid ${colors.accent}` }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", width: '100%' }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span className="logo-symbol" style={{ color: colors.accent, fontSize: 24 }}>★</span>
              <span style={{ color: "#fff", fontWeight: 700 }}>
                Morning Paws
              </span>
            </div>
            <span style={{
              fontSize: 13,
              color: colors.accent,
              letterSpacing: 1.2,
              fontWeight: 600,
              background: '#222',
              padding: '7px 16px',
              borderRadius: 14,
              border: `1.5px solid ${colors.accent}`,
              boxShadow: '0 0 0.5px rgba(255,255,255,0.09)'
            }}>
              BuzzFeed-style Quiz
            </span>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          {step === "intro" && <QuizIntro />}
          {step === "quiz" && <QuizQuestion />}
          {step === "result" && <QuizResult />}
        </div>
      </main>
      <footer style={{
        width: "100%",
        padding: "32px 0 24px 0",
        textAlign: 'center',
        color: '#888',
        marginTop: "auto",
        fontSize: "1rem"
      }}>
        <span>🐾 Created with &lt;3 by KAVIA for the dog lovers</span>
      </footer>
    </div>
  );
}

export default App;
