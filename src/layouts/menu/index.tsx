import { Menu } from "antd";
import { menuConfig } from "@/config";
import "./menu.less";
import { useNavigate } from "react-router-dom";

const CustMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu_container">
      <Menu
        mode="inline"
        defaultSelectedKeys={["/workbench"]}
        defaultOpenKeys={["workbench"]}
        style={{ borderRight: 0 }}
        items={menuConfig}
        onClick={({ key }) => navigate(key)}
      />
    </div>
  );
};

export default CustMenu;
