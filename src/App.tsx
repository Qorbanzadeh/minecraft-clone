// @ts-ignore
import FPSStats from "react-fps-stats";

import { World } from "./components";
import { Menu } from "./components/menu.component";

function App() {
  return (
    <>
      {/* react three canvas */}
      <World />
      {/* fps counter */}
      <div>
        <FPSStats />
      </div>
      {/* marker */}
      <div className="absolute w-3 h-3 border-2 border-white border-solid rounded-full top-1/2 left-1/2"></div>
      {/* pause/start menu */}
      <Menu />
      {/* footer */}
      <footer className="absolute bottom-0 p-2 text-base text-white">
        Made with <span className="text-red-500">&#9829;</span> by Ali
      </footer>
    </>
  );
}

export default App;
