import MenuUser from "../MenuUser";
import UserBar from "../UserBar";
import styles from "./layout.module.css";

interface LayoutProps {
  children?: React.ReactNode;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  mainAction: () => void;
}
function Layout({ children, query, setQuery, mainAction }: LayoutProps) {
  return (
    <div className={styles.container}>
      <MenuUser />
      <UserBar query={query} setQuery={setQuery} mainAction={mainAction} />
      {children}
    </div>
  );
}

export default Layout;
