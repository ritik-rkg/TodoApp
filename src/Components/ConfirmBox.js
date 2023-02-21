import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle
} from "@mui/material";

const ConfirmBox = ({ open, closeDialog, title, deleteFunction }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Do You want to delete the {title}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You won't be able to undo the action. To confrim press delete.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={deleteFunction}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmBox;
