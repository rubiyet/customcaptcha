export default function Square({ angle, color }) {
  return (
    <div
    className={`w-1/2 h-1/2 hover:-translate hover:scale-125 transform rotate-${angle} bg-${color}`}
  ></div>
  );
}