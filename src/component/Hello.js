export default function Hello({ user }) {
  return user && user.name ? (
    <h1>Hello! {user.name}</h1>
  ) : (
    <button>Login</button>
  );
}
