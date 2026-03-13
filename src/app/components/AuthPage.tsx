"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "@/Css/authPage.module.css";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Feil epost eller passord");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passordene matcher ikke");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error === "Email already registered" ? "Epost er allerede registrert" : "Registrering feilet");
      return;
    }

    // Auto-login after successful registration
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Registrert, men innlogging feilet. Prøv å logge inn manuelt.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === "login" ? styles.active : ""}`}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Logg inn
          </button>
          <button
            className={`${styles.tab} ${mode === "register" ? styles.active : ""}`}
            onClick={() => { setMode("register"); setError(""); }}
          >
            Ny bruker
          </button>
        </div>

        {mode === "login" ? (
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              className={styles.input}
              type="email"
              placeholder="Epost"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.submit} type="submit">Logg inn</button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              className={styles.input}
              type="text"
              placeholder="Brukernavn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="email"
              placeholder="Epost"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Bekreft passord"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.submit} type="submit">Opprett bruker</button>
          </form>
        )}
      </div>
    </div>
  );
}
