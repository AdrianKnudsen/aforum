"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "@/Css/authPage.module.css";

type Mode = "login" | "register" | "forgot";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const reset = (m: Mode) => { setMode(m); setError(""); setInfo(""); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError("Feil epost eller passord"); return; }
    router.push("/");
    router.refresh();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Passordene matcher ikke"); return; }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (signUpError) { setError("Registrering feilet: " + signUpError.message); return; }

    if (data.user) {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supabaseId: data.user.id, username, email }),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error === "Email already registered" ? "Epost er allerede registrert" : "Registrering feilet");
        return;
      }
    }

    router.push("/");
    router.refresh();
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setInfo("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) { setError("Noe gikk galt. Sjekk epostadressen og prøv igjen."); }
    else { setInfo("En tilbakestillingslenke er sendt til " + email); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${mode === "login" ? styles.active : ""}`} onClick={() => reset("login")}>
            Logg inn
          </button>
          <button className={`${styles.tab} ${mode === "register" ? styles.active : ""}`} onClick={() => reset("register")}>
            Ny bruker
          </button>
        </div>

        {mode === "login" && (
          <form className={styles.form} onSubmit={handleLogin}>
            <input className={styles.input} type="email" placeholder="Epost" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className={styles.input} type="password" placeholder="Passord" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.submit} type="submit">Logg inn</button>
            <button type="button" className={styles.forgot} onClick={() => reset("forgot")}>Glemt passord?</button>
          </form>
        )}

        {mode === "register" && (
          <form className={styles.form} onSubmit={handleRegister}>
            <input className={styles.input} type="text" placeholder="Brukernavn" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input className={styles.input} type="email" placeholder="Epost" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className={styles.input} type="password" placeholder="Passord" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input className={styles.input} type="password" placeholder="Bekreft passord" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.submit} type="submit">Opprett bruker</button>
          </form>
        )}

        {mode === "forgot" && (
          <form className={styles.form} onSubmit={handleForgotPassword}>
            <p className={styles.forgotInfo}>Skriv inn epostadressen din så sender vi en lenke for å tilbakestille passordet.</p>
            <input className={styles.input} type="email" placeholder="Epost" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {error && <p className={styles.error}>{error}</p>}
            {info && <p className={styles.info}>{info}</p>}
            <button className={styles.submit} type="submit">Send lenke</button>
            <button type="button" className={styles.forgot} onClick={() => reset("login")}>Tilbake til innlogging</button>
          </form>
        )}
      </div>
    </div>
  );
}
