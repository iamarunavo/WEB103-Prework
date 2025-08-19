import { useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

function App() {
  let routes = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/creators/:id", element: <ViewCreator /> },
    { path: "/creators/new", element: <AddCreator /> },
    { path: "/creators/:id/edit", element: <EditCreator /> },
  ]);

  return routes;
}

export default App;
