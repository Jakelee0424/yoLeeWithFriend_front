import { Outlet } from "react-router-dom";
import Header from "./HeaderUser";
import { Container } from "reactstrap";

const FullLayoutUser = () => {
  return (
    <main style={{width:"100%", height:"100%"}}>
      {/********header**********/}
      <Header />
      <div className="pageWrapper d-lg-flex" style={{maxWidth:"83%", margin:"0 auto"}}>
        {/********Sidebar**********/}
        {/********Content Area**********/}
        <div className="contentArea" style={{width:"100%"}}> 
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayoutUser;
