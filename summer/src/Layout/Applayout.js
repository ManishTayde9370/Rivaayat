import Footer from '../components/Footer';
import NavbarPublic from '../components/NavbarPublic';
import NavbarPrivate from '../components/NavbarPrivate';

function Applayout({ children, userDetails, onLogout }) {
  const isLoggedIn = !!userDetails?.email;
  const isAdmin = userDetails?.isAdmin;

  return (
    <>
      {isLoggedIn && !isAdmin ? (
        <NavbarPrivate username={userDetails.username} onLogout={onLogout} />
      ) : (
        <NavbarPublic />
      )}

      {children}
      <Footer />
    </>
  );
}

export default Applayout;
