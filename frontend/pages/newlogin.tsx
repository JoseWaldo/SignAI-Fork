import { useState, FormEvent } from "react";
import useForm from "@/hooks/useForm";
import styles from "@/styles/login.module.css";
import { validateCredentials } from "@/functions/validations";
import { handleLogin } from "@/functions/login";
import { AuthResponse, Credentials } from "@/types/types";
import { useRouter } from "next/router";
import Contact from "@/components/contact/Contact";

const userData: Credentials = {
  user: "",
  password: "",
};

const Login = () => {
  const { inputs, handleChange } = useForm<Credentials>(userData);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValidate, message } = validateCredentials(inputs);

    if (isValidate) {
      const { ok, authResponse, messageError } = await handleLogin(inputs);
      if (ok) {
        const authInfo = authResponse as AuthResponse;
        sessionStorage.setItem("authInfo", JSON.stringify(authInfo));
        router.push("/components");
        return;
      }
      setErrorMessage(messageError);
    } else {
      setErrorMessage(message);
    }

    setTimeout(() => {
      setErrorMessage(undefined);
    }, 5000);
  };

  return (
    <main className={styles.Container}>
      <section className={styles.LeftPanel}>
        <div className={styles.WrapperLogo}>
          <h1 className={styles.Logo}>SignAI</h1>
          <span className={`${styles.Slogan}`}>
            UNIENDO MUNDOS SEÑA POR SEÑA
          </span>
        </div>
        <Contact className="text-[#393636] after:bg-[#393636]" />
      </section>
      <section className={styles.RightPanel}>
        <form
          action="POST"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className={styles.Form}>
          <h2 className={`${styles.green} ${styles.FormHeader}`}>
            Iniciar Sesión
          </h2>
          <label htmlFor="user" className={styles.Label}>
            <span className={styles.LabelText}>Usuario</span>
            <input
              className={styles.Input}
              type="text"
              name="user"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="password" className={styles.Label}>
            <span className={styles.LabelText}>Contraseña</span>
            <input
              className={styles.Input}
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </label>
          <button
            type="submit"
            className={styles.ButtonForm}
            disabled={errorMessage ? true : false}>
            Ingresar
          </button>
          <p
            className={
              errorMessage
                ? `${styles.ErrorMessage} ${styles.ErrorMessageVisible}`
                : styles.ErrorMessage
            }>
            {errorMessage}
          </p>
        </form>
      </section>
      <figure className={styles.LogoContainer}>
        <img src="/udea-logo-blanco.svg" alt="logo udea" />
      </figure>
    </main>
  );
};

export default Login;
