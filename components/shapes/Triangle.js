export default function Triangle({ angle, color }) {
  return (
    <div
      className={`w-0 h-0 hover:-translate hover:scale-125 border-solid border-l-12 border-r-12 border-b-20 transform rotate-${angle} border-b-${color}`}
    ></div>
  );
}
