import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import { useTranslation } from "react-i18next";

// interface I18ButtonProps {

// }

const I18Button: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { i18n } = useTranslation();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };
  return (
    <>
      <IconButton
        dir="ltr"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(e.currentTarget);
        }}
        color="inherit"
      >
        <PublicIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage("he")}>עברית</MenuItem>
      </Menu>
    </>
  );
};

export default I18Button;
