import styles from "./avatar.module.css";
interface AvatarProps extends React.ComponentProps<"div"> {
  username: string;
}
function Avatar({ username, ...props }: AvatarProps) {
  return (
    <div className={styles.container} {...props}>
      {username.substring(0, 2)}
    </div>
  );
}

export default Avatar;
