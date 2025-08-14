export default function Navbar() {
  return (
    <div className="h-[100px] w-full flex items-center justify-between px-4 bg-gray-800 text-white">
      <h1>My Portfolio</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
}
