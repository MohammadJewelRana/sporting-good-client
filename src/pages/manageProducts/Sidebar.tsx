import { Layout, Menu, MenuProps } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/features/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const Sidebar = () => {

  const navigate=useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label : <NavLink to='/manage-products'>Dashboard </NavLink>

    },
    {
      key: "2",
      label: "Manage Products",
      children: [
        { key: "21", label : <NavLink to='/manage-products/add-products'>Add </NavLink>},
        { key: "22", label : <NavLink to='/manage-products/view'>View </NavLink> },

      ],
    },
    {
      key: "3",
      label : <NavLink to=''>Analytics </NavLink>
    },
  ];

  return (
    <Sider
      className="-mt-14 md:mt-[0px]"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      {/* logo design or name design */}
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="text-red-400  capitalize font-bold italic text-xl">
          {" "}
          Sporting <span className="text-yellow-300">Goods</span>{" "}
        </h1>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items} //side nav menu
        className="mt-8"
      ></Menu>
      <div className="text-white mt-12 border-t-2 ">
        <div className="p-4 mt-4">
          <Link to="/">
            <button className="text-gray-300 ">Go to Home </button>
          </Link>
          <br />

          <button onClick={handleLogout} className="text-gray-300 pt-4">Logout </button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
