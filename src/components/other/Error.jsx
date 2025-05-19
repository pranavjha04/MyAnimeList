export default function Error({ error }) {
  return (
    <p
      style={{
        fontSize: "2.2rem",
        fontWeight: "600",
        alignSelf: "center",
        justifySelf: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {error}
    </p>
  );
}
