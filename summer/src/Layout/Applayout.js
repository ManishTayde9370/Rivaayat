
import Footer from '../components/Footer';
import Header from '../components/Header';
function Applayout({children }) {
  return (
  <>
    <Header/>
      <div className="container mx-auto mt-10">
      {children}
        <Footer />
      </div>
      </>

  );
}

export default Applayout;
