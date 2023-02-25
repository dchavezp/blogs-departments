import React from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import styles from "./user-bar.module.css";
interface UserBarProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  mainAction: () => void;
}
function UserBar({ query, setQuery, mainAction }: UserBarProps) {
  return (
    <div className={styles.actions}>
      <TextInput
        placeholder="Buscar admin"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
      />
      <Button onClick={mainAction}>Nuevo Registro</Button>
    </div>
  );
}

export default UserBar;
