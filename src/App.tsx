import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Capsules,
  Cores,
  Crew,
  Dragons,
  Error,
  Homepage,
  Landpads,
  Launches,
  Launchpads,
  Payloads,
  Roadster,
  Rockets,
  Ships,
  SingleCrew,
  SingleDragon,
  SingleLandPad,
  SingleLaunch,
  SingleLaunchPad,
  SingleRocket,
  Starlink,
} from "./Pages";
import { Header } from "./Components";
import SingleShip from "./Pages/SingleShip";

function App() {
  return (
    <BrowserRouter basename="/SpaceX-Launch-Observer">
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/capsules" element={<Capsules />} />
          <Route path="/cores" element={<Cores />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/crew/:id" element={<SingleCrew />} />
          <Route path="/dragons" element={<Dragons />} />
          <Route path="/dragons/:id" element={<SingleDragon />} />
          <Route path="/landpads" element={<Landpads />} />
          <Route path="/landpads/:id" element={<SingleLandPad />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/launches/:id" element={<SingleLaunch />} />
          <Route path="/launchpads" element={<Launchpads />} />
          <Route path="/launchpads/:id" element={<SingleLaunchPad />} />
          <Route path="/payloads" element={<Payloads />} />
          <Route path="/roadster" element={<Roadster />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/rockets/:id" element={<SingleRocket />} />
          <Route path="/ships" element={<Ships />} />
          <Route path="/ships/:id" element={<SingleShip />} />
          <Route path="/starlink" element={<Starlink />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
