import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { postNotation } from '../../features/notations/notationsSlice';
import { style, StyledTextarea } from './style';

const ModalWindow = ({ open, handleModal }) => {
    const [text, setText] = useState('');
    const isLoading = useSelector(state => state.isLoading);
    const dispatch = useDispatch();

    const saveTemplate = () => {
        if (text === '') return;

        dispatch(
            postNotation({
                id: uuidv4(),
                title: text,
            }),
        );

        setText('');
        handleModal();
    };

    return (
        <Modal
            component="div"
            open={open}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    ...style,
                }}
            >
                <Typography
                    id="modal-modal-title"
                    textAlign="center"
                    textTransform={'upperCase'}
                    variant="h6"
                    component="h2"
                >
                    Введіть текст, який необхідно зберігти
                </Typography>
                <StyledTextarea
                    type="text"
                    component="textarea"
                    value={text}
                    autoFocus
                    onChange={e => setText(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={saveTemplate}
                    disabled={isLoading}
                >
                    Зберегти
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalWindow;
