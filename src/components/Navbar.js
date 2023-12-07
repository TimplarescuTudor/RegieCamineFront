//React
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//Material UI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Switch } from "@mui/material";
import Grid from "@mui/material/Grid";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";

//Context
import ColorModeContext from "../context/ColorModeContext";

//Menu
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WalletIcon from "@mui/icons-material/Wallet";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EventIcon from "@mui/icons-material/Event";

//Package JSON
import packageJSON from "../../package.json";

export const Navbar = ({ title, onLogout, username, tipUtilizator }) => {
  //Color mode
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();

  //Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  //Submenu
  const [openInvoiceSubMenu, setOpenInvoiceSubMenu] = useState(false);
  const handleInvoiceSubMenuClick = () => {
    setOpenInvoiceSubMenu(!openInvoiceSubMenu);
  };

  //Menu items
  const menuItems = [
    {
      text: "Acasă",
      icon: <HomeIcon />,
      forAdmin: false,
      onClick: () => {
        navigate("/acasa");
        setDrawerOpen(false);
      },
    },
    {
      text: "Adaugă factură",
      icon: <NoteAddIcon />,
      forAdmin: true,
      onClick: handleInvoiceSubMenuClick,
      subMenuItems: [
        {
          text: "Electricitate",
          icon: <ElectricBoltIcon />,
          onClick: () => {
            navigate("/adaugare-factura/electricitate");
            setDrawerOpen(false);
          },
        },
        {
          text: "Gaze",
          icon: <GasMeterIcon />,
          onClick: () => {
            navigate("/adaugare-factura/gaze");
            setDrawerOpen(false);
          },
        },
        {
          text: "Apă",
          icon: <WaterDropIcon />,
          onClick: () => {
            navigate("/adaugare-factura/apa");
            setDrawerOpen(false);
          },
        },
        {
          text: "Termoficare",
          icon: <LocalFireDepartmentIcon />,
          onClick: () => {
            navigate("/adaugare-factura/termoficare");
            setDrawerOpen(false);
          },
        },
        {
          text: "Alte cheltuieli",
          icon: <WalletIcon />,
          onClick: () => {
            navigate("/adaugare-factura/alte-cheltuieli");
            setDrawerOpen(false);
          },
        },
      ],
    },
    {
      text: "Adaugă consum",
      icon: <AddBoxIcon />,
      forAdmin: false,
      onClick: () => {
        navigate("/adaugare-consum");
        setDrawerOpen(false);
      },
    },
    {
      text: "Raport consum",
      icon: <BarChartIcon />,
      forAdmin: false,
      onClick: () => {
        navigate("/raport-consum");
        setDrawerOpen(false);
      },
    },
    {
      text: "Organigramă clădiri",
      icon: <ApartmentIcon />,
      forAdmin: false,
      onClick: () => {
        navigate("/organigrama-cladiri");
        setDrawerOpen(false);
      },
    },
    {
      text: "Administrare platformă",
      icon: <AdminPanelSettingsIcon />,
      forAdmin: true,
      onClick: () => {
        navigate("/administrare-platforma");
        setDrawerOpen(false);
      },
    },
    {
      text: "Gestionare utilizatori",
      icon: <ManageAccountsIcon />,
      forAdmin: true,
      onClick: () => {
        navigate("/gestionare-utilizatori");
        setDrawerOpen(false);
      },
    },
    {
      text: "Activitate utilizatori",
      icon: <EventIcon />,
      forAdmin: true,
      onClick: () => {
        navigate("/activitate-utilizatori");
        setDrawerOpen(false);
      },
    },
  ];

  //Sign out
  const handleSignOut = () => {
    onLogout();
    navigate("/");
  };

  return (
    <Grid container item>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {colorMode === "light" ? <Brightness4Icon /> : <Brightness4OutlinedIcon />}
          <Switch checked={colorMode === "dark"} onChange={toggleColorMode} color="secondary" />
          <Button color="inherit" onClick={handleSignOut}>
            Deconectare
          </Button>
        </Toolbar>
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          <div role="presentation">
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                pt: 4,
                pb: 2,
                px: 2,
                pr: 4,
                fontSize: "1.2rem",
              }}
            >
              <Grid container alignItems="center">
                <WavingHandIcon color="secondary" sx={{ mx: 2 }} /> Bună,
                {username}!
              </Grid>
            </Typography>
            <List sx={{ width: "100%", minWidth: 300 }}>
              {menuItems.map((item) => (
                <React.Fragment key={item.text}>
                  {(!item.forAdmin || (item.forAdmin && tipUtilizator === "Administrator")) && (
                    <ListItem button onClick={item.onClick}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                      {item.subMenuItems && (openInvoiceSubMenu ? <ExpandLess /> : <ExpandMore />)}
                    </ListItem>
                  )}
                  {item.subMenuItems && (
                    <Collapse in={openInvoiceSubMenu} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.subMenuItems.map((subItem) => (
                          <ListItem
                            button
                            key={subItem.text}
                            onClick={subItem.onClick}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                            <ListItemText primary={subItem.text} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </List>
          </div>
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              bottom: 20,
              left: 16,
              right: 16,
              textAlign: "center",
            }}
          >
            <strong>Versiune: {packageJSON.version}</strong>
          </Typography>
        </Drawer>
      </AppBar>
    </Grid>
  );
};
