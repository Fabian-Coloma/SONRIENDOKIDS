
import BookingForm from '../components/forms/BookingForm';

const Reserva = () => {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#f8fcf9] min-h-screen relative overflow-hidden flex items-center justify-center">
      
      {/* Fondo Safari Abstracto para la página de reservas */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sonriendo-mint rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-sonriendo-yellow/20 rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10 animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-[#d08c60]/20 rounded-full mix-blend-multiply opacity-40 blur-2xl -z-10 animate-blob" style={{ animationDelay: '4s' }}></div>

      <div className="w-full max-w-6xl mx-auto relative z-10 opacity-0 animate-fade-in-up">
        <BookingForm />
      </div>

    </div>
  );
};

export default Reserva;