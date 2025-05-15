import { Select, styled, TextField } from "@mui/material"

export const cardContentStyle = {
  width: "80%",
  maxHeight: "70%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#424242",
  color: "white",
  p: 2,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "8px"
  },
  "&::-webkit-scrollbar-track": {
    background: "#424242"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#212121",
    backgroundClip: "padding-box",
    borderRadius: "10px",
    border: "2px solid transparent"
  }
}

export const CssTextField = styled(TextField)({
  "& label": {
    color: "white"
  },
  "& label.Mui-focused": {
    color: "white"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white"
    },
    "&:hover fieldset": {
      borderColor: "white"
    },
    "&.Mui-focused fieldset": {
      borderColor: "white"
    },
    fieldset: {
      color: "white"
    }
  }
})

export const CssSelect = styled(Select)({
  "&.MuiOutlinedInput-root": {
    color: "white",
    "&.Mui-focused fieldset": {
      borderColor: "white"
    }
  },
  "& fieldset": {
    "&.MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    }
  },
  "&:focus fieldset": {
    borderColor: "white"
  },
  "& .MuiSelect-icon": {
    color: "white"
  }
})
