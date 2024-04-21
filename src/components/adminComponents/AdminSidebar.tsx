import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
  } from "@mui/icons-material";
  import { Link } from "react-router-dom";
  import styled from 'styled-components';

  const AdminSidebarContainer = styled.div`
    flex: 1;
    height: calc(100vh - 50px);
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
  `;
  
  const AdminSidebarBox= styled.div`
    padding: 20;
    color: 555;
  `;
  
  const AdminSidebarMenu = styled.div`
    margin-bottom: 10px;
    `;
  
  const AdminSidebarHeading = styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186);
  `;
  
  const AdminSidebarList = styled.ul`
    list-style: none;
    padding: 5px;
  `;
  
  const AdminSidebarListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
  `;
  
//   .sidebarListItem.active,
//   .sidebarListItem:hover {
//     background-color: rgb(240, 240, 255);
//   }
  
//   .sidebarIcon{
//       margin-right: 5px;
//       font-size: 20px !important;
//   }
const AdminSidebar = () => {
  return (
    <AdminSidebarContainer>
      <AdminSidebarBox>
        <AdminSidebarMenu>
          <AdminSidebarHeading>Dashboard</AdminSidebarHeading>
          <AdminSidebarList>
            <Link to="/" className="link">
            <AdminSidebarListItem>
              <LineStyle className="sidebarIcon" />
              Home
            </AdminSidebarListItem>
            </Link>
            <AdminSidebarListItem>
              <Timeline className="sidebarIcon" />
              Analytics
            </AdminSidebarListItem>
            <AdminSidebarListItem>
              <TrendingUp className="sidebarIcon" />
              Sales
            </AdminSidebarListItem>
          </AdminSidebarList>
        </AdminSidebarMenu>
        <AdminSidebarMenu>
          <AdminSidebarHeading>Quick Menu</AdminSidebarHeading>
          <AdminSidebarList>
            <Link to="/users" className="link">
              <AdminSidebarListItem>
                <PermIdentity className="sidebarIcon" />
                Users
              </AdminSidebarListItem>
            </Link>
            <Link to="/products" className="link">
              <AdminSidebarListItem>
                <Storefront className="sidebarIcon" />
                Products
              </AdminSidebarListItem>
            </Link>
            <Link to="/addUser" className="link">
            <AdminSidebarListItem>
              <AttachMoney className="sidebarIcon" />
              Add New User
            </AdminSidebarListItem>
            </Link>
            <Link to="/addProduct" className="link">
            <AdminSidebarListItem>
              <BarChart className="sidebarIcon" />
              Add New Product
            </AdminSidebarListItem>
            </Link>
          
          </AdminSidebarList>
        </AdminSidebarMenu>
        <AdminSidebarMenu>
          <AdminSidebarHeading>Notifications</AdminSidebarHeading>
          <AdminSidebarList>
            <AdminSidebarListItem>
              <MailOutline className="sidebarIcon" />
              Mail
            </AdminSidebarListItem>
            <AdminSidebarListItem>
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </AdminSidebarListItem>
            <AdminSidebarListItem>
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </AdminSidebarListItem>
          </AdminSidebarList>
        </AdminSidebarMenu>
        <AdminSidebarMenu>
          <AdminSidebarHeading>Staff</AdminSidebarHeading>
          <AdminSidebarList>
            <AdminSidebarListItem>
              <WorkOutline className="sidebarIcon" />
              Manage
            </AdminSidebarListItem>
            <AdminSidebarListItem>
              <Timeline className="sidebarIcon" />
              Analytics
            </AdminSidebarListItem>
            <AdminSidebarListItem>
              <Report className="sidebarIcon" />
              Reports
            </AdminSidebarListItem>
          </AdminSidebarList>
        </AdminSidebarMenu>
      </AdminSidebarBox>
    </AdminSidebarContainer>
  )
}

export default AdminSidebar