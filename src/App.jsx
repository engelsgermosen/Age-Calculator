import { useRef, useState } from "react";

function App() {
  const miForm = useRef();

  const [fecha, setFecha] = useState({
    day: null,
    month: null,
    year: null,
  });

  const [edad, setEdad] = useState({
    day: 0,
    month: 0,
    year: 0,
  });

  const handleChange = (e) => {
    setFecha({
      ...fecha,
      [e.target.name]: e.target.value,
    });
  };

  const calcularEdad = (e) => {
    e.preventDefault();
    const fechaActual = new Date();

    const fechaCliente = new Date();
    fechaCliente.setDate(fecha.day);
    fechaCliente.setMonth(fecha.month - 1); // Los meses son base 0
    fechaCliente.setFullYear(fecha.year);

    const years = fechaActual.getFullYear() - fechaCliente.getFullYear();
    const month = fechaActual.getMonth() - fechaCliente.getMonth();
    const days = fechaActual.getDate() - fechaCliente.getDate();

    setEdad({
      day: days < 0 ? days + 30 : days,
      month: month < 0 ? month + 12 : month,
      year: month < 0 ? years - 1 : years,
    });
    miForm.current.reset();
    setFecha({
      day: null,
      month: null,
      year: null,
    });
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white font-sans">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Age Calculator</h1>

      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 w-11/12 md:max-w-3xl">
        <form
          ref={miForm}
          onSubmit={calcularEdad}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-semibold uppercase tracking-wider" htmlFor="day">
                Day
              </label>
              <input
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="number"
                name="day"
                value={fecha.day || ""}
                onChange={handleChange}
                placeholder="DD"
                required
                min={1}
                max={31}
              />
            </div>

            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-semibold uppercase tracking-wider" htmlFor="month">
                Month
              </label>
              <input
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="number"
                name="month"
                value={fecha.month || ""}
                onChange={handleChange}
                placeholder="MM"
                required
                min={1}
                max={12}
              />
            </div>

            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-semibold uppercase tracking-wider" htmlFor="year">
                Year
              </label>
              <input
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="number"
                name="year"
                value={fecha.year || ""}
                onChange={handleChange}
                placeholder="YYYY"
                required
                min={1000}
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Calculate Age
          </button>
        </form>

        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold">Results:</h2>
          <p className="text-xl font-bold">Years: <span className="text-purple-600">{edad.year}</span></p>
          <p className="text-xl font-bold">Months: <span className="text-purple-600">{edad.month}</span></p>
          <p className="text-xl font-bold">Days: <span className="text-purple-600">{edad.day}</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;
