import React from 'react';
import { makeStyles } from 'template-core/styles';
import DialogTitle from 'template-core/DialogTitle';
import Dialog from 'template-core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { blue } from 'template-core/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

export interface SimpleDialogProps {
    open: boolean,
    msg: string,
    close: () => void
}

export default function SimpleDialog(props: SimpleDialogProps) {
    const classes = useStyles();
    const { open, msg, close } = props;
    // const [sopen, setOpen] = React.useState(open);


    const handleClose = () => {
        close()
    };

    return (
        <Dialog
            open={open}
            onBackdropClick={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {msg}
                </DialogContentText>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
          </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Agree
          </Button>
            </DialogActions> */}
        </Dialog>
    );
}

// export default function SimpleDialogDemo(props: string) {
//     const [open, setOpen] = React.useState(false);
//     const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = (value: string) => {
//         setOpen(false);
//         setSelectedValue(value);
//     };

//     return (
//         <div>
//             <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//             <br />
//             <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//                 Open simple dialog
//       </Button>
//             <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//         </div>
//     );
// }
