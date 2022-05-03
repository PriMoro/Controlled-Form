import React from "react";

export function validate(input) {
  let errors = {}; // un  objeto que contenga el error
  if (!input.username) {
    // sino hay nada en username, agregar propiedad al objeto
    errors.username = "Username is required";
    // se compara la regular expression con el input de username
  } else if (!/\S+\@+\S+\.+\S+/.test(input.username)) {
    // si lo que está escrito es distinto a lo esperado (mail),
    // agregar una propiedad al objeto vacío
    errors.username = "Username is invalid";
  }
  if (!input.password) {
    // sino hay nada en password, agregar propiedad al objeto
    errors.password = "Password is required";
    // se compara la regular expression con el input de password
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    // si lo que está escrito es distinto a lo esperado (password, debe tener por lo menos un número)
    // agregar una propiedad al objeto vacío
    errors.password = "Password is invalid";
  }
  return errors; // devolver el error
}

export default function Form() {
  // con esto agregamos estado al componente
  // const [username, setUsername] = React.useState("");
  // const [password, setPassword] = React.useState("");
  const [input, setInput] = React.useState({ username: "", password: "" });

  // el estado es el que tiene conocimiento del componente en sí, por lo que
  // para hacer una validación necesitamos guardar el error en un estado
  const [errors, setErrors] = React.useState({});

  // función
  const handleInputChange = (e) => {
    // hacemos una copia del objeto del estado anterior, para no perderla o pisarla
    // y luego le pasamos el nuevo valor
    setInput({ ...input, [e.target.name]: e.target.value });
    // react no hace las modificaciones en el momento, no podemos pasarle,
    // validate(input) ya que quizás usaría un valor anterior, por lo que se lo pasamos de esta
    // manera para asegurarnos de que sea ese valor de input al cual nos referimos
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  return (
    <form>
      <div>
        <label>Username:</label>
      </div>
      <input
        className={errors.username && "danger"}
        // si el primero es true, se aplica el segundo, que es un estilo
        type="text"
        name="username"
        onChange={handleInputChange}
        value={input.username}
      />
      {/* si hay un error, se muestra la etiqueta <p>*/}
      {errors.username && <p> {errors.username} </p>}
      <div>
        <label>Password:</label>
      </div>
      <input
        className={errors.password && "danger"}
        type="password"
        name="password"
        onChange={handleInputChange}
        value={input.password}
      />
      {errors.username && <p> {errors.password} </p>}
      <div>
        <input type={"submit"} value="Log in" />
      </div>
    </form>
  );
}
