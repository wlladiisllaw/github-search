export function Header() {
  return (
    <header
      style={{
        backgroundColor: "#0077FF",
        color: "white",
        fontSize: "30px",
        padding: "10px 0",
        width: "100%",
        margin: "0",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: "center", 
        justifyContent: "center", 
        gap: "10px", 
      }}
    >
      <a
        href="https://github.com/wlladiisllaw/github-search"
        target="_blank"
        style={{
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          height: "50px", 
        }}
      >
        <img
          src="../public/vk_logo.svg"
          alt="логотип VK"
          style={{
            height: "40px", 
            width: "auto", 
            margin: 0,
            padding: 0
          }}
        />
      </a>
      <h3 style={{ margin: 0 }}>ГитГид</h3>
    </header>
  );
}
