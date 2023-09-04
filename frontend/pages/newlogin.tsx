import { useState, ChangeEvent, FormEvent } from "react";
import useForm, { FormObject } from "@/hooks/useForm";
import styles from "@/styles/login.module.css";

const userData: FormObject = {
  user: "",
  password: "",
};

const Login = () => {
  const { inputs, handleChange } = useForm(userData);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = inputs.user;
    const password = inputs.password;

    if (user.length === 0) setErrorMessage("El campo usuario es obligatorio");
    else if (password.length === 0)
      setErrorMessage("El campo contraseña es obligatorio");

    setInterval(() => {
      setErrorMessage(undefined);
    }, 10000);
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
        <div className={styles.ContactSection}>
          <span>Contáctanos</span>
        </div>
      </section>
      <section className={styles.RightPanel}>
        <form
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
              // required
            />
          </label>
          <label htmlFor="password" className={styles.Label}>
            <span className={styles.LabelText}>Contraseña</span>
            <input
              className={styles.Input}
              type="password"
              name="password"
              onChange={handleChange}
              // required
            />
          </label>
          <button type="submit" className={styles.ButtonForm}>
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
