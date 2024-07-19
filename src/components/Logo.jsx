import logo from "../assets/img/The_Cutest__1_-removebg-preview.png";

export const Logo = ({ text }) => {
  return (
    <div className="auth-form-logo-container">
      <div style={{ textAlign: 'center', marginBottom: '-20px' }}>
        <img src={logo} alt="Escudo" width='60%' height='60%' />
      </div>
      <div style={{ textAlign: 'center' }}>
        <span>{text}</span>
      </div>
    </div>
  )
}



