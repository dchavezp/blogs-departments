import LoginForm from "@/components/LoginForm";
import Head from "next/head";
import styles from "@/styles/main.module.css";
export default function Home() {
  return (
    <>
      <Head>
        <title>Front-End Admin</title>
        <meta name="description" content="Front End Admin NextJs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <LoginForm />
      </main>
    </>
  );
}
