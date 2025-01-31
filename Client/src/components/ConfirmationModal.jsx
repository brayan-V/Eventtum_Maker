import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ConfirmationModal = ({ open, handleClose, handleConfirm, title, description }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    {description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
