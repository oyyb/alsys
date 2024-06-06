import './App.css';
import { useRoutes } from "react-router-dom"
import { routes } from './router/routes';
import BeforeEach from './router/before-each';

const App = () => {
  const element = useRoutes(routes)
  return (
    <div className="App">
      <BeforeEach>
        {element}
      </BeforeEach>
    </div>
  )
  // return (
  //   <div className="App">
  //     <Routes>
  //       <Route path="/" element={<Navigate to="/index" replace />} />
  //       <Route path="/index" element={<Index />} />
  //       <Route path="/admin-main" element={<AdminMain />}>
  //         <Route path="admin-images" element={<AdminImages />} />
  //       </Route>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //     </Routes>
  //   </div>
  // );
}

export default App;
