export default function Circle({ color }) {
  return (
    <div
    className={`w-1/2 h-1/2 hover:-translate hover:scale-125 rounded-full bg-${color}`} 
    ></div>
  );
}