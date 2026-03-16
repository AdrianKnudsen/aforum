"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "@/Css/authPage.module.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY when the user lands here via the reset link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passordene matcher ikke");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError("Noe gikk galt: " + error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.tabs}>
          <span className={`${styles.tab} ${styles.active}`}>Nytt passord</span>
        </div>

        {!ready ? (
          <p className={styles.forgotInfo}>Venter på bekreftelse fra lenken i eposten...</p>
        ) : (
          <form className={styles.form} onSubmit={handleReset}>
            <input
              className={styles.input}
              type="password"
              placeholder="Nytt passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Bekreft nytt passord"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.submit} type="submit">Lagre nytt passord</button>
          </form>
        )}
      </div>
    </div>
  );
}
