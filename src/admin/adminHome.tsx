import React, { useEffect, useMemo, useState } from "react";
import { loggedInUserRequest } from "../auth/AllApi";
import Chart from "../components/adminComponents/Visuals";
import Navbar from "../components/Navbar";
import AdminNavbar from "../components/adminComponents/AdminNavbar";
import styled from "styled-components";
import AdminSidebar from "../components/adminComponents/AdminSidebar";

type UserStat = {
  name: string;
  "Active User": number;
};
const Container = styled.div`
   {
    display: flex;
    margin-top: 10px;
  }
`;
const Home = styled.div`
   {
    flex: 4;
  }
`;

const HomeWidgets = styled.div`
   {
    display: flex;
    margin: 20px;
  }
`;
const Left = styled.div`
  flex: 1;
`;
const Right = styled.div`
  flex: 4;
`;
const Box = styled.div`
  display: flex;
`;

const AdminHome: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStat[]>([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    [],
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await loggedInUserRequest.get("/users/stats");

        const newUserStats = res.data.map(
          (item: { id: number; total: any }) => ({
            name: MONTHS[item.id - 1],
            "Active User": item.total,
          }),
        );
        setUserStats(newUserStats);
      } catch (err) {
        console.error(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <Container>
      <Navbar />

      <Box>
        <Left>
          <AdminSidebar />
        </Left>
        <Right>
          <Home>
            <Chart
              data={userStats}
              title="User Analytics"
              grid
              dataKey="Active User"
            />
            <HomeWidgets>
              {/* <WidgetSm />
        <WidgetLg /> */}
            </HomeWidgets>
          </Home>
        </Right>
      </Box>
    </Container>
  );
};

export default AdminHome;
