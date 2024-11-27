import { Spin } from "antd";

const loading = () => {
  const styles = {
      width: '100vw',
      height: '100vh',
      background: 'var(--secondary-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: '4s ease',
  }
  return (
    <div style={styles}>
      <Spin size="large" />
    </div>
  );
};

export default loading;
