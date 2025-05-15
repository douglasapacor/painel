const style = {
  background: {
    width: "70%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FAFAFA",
    boxShadow: 24,
    p: 2
  },
  title: {
    width: "100%",
    background: (theme: any) => theme.palette.primary.main,
    color: "whitesmoke",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 3,
    paddingTop: 1,
    paddingBottom: 1,
    paddingRight: 1
  }
}

export default style
