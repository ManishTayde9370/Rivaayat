import Footer from '../components/Footer';
import NavbarPublic from '../components/NavbarPublic';
import NavbarPrivate from '../components/NavbarPrivate';

function Applayout({ children, userDetails, onLogout }) {
  return (
    <>
      {userDetails ? (
        <NavbarPrivate username={userDetails.username} onLogout={onLogout} />
      ) : (
        <NavbarPublic />
      )}

      <div className="container mt-4">{children}</div>

      <Footer />
    </>
  );
}

export default Applayout;
