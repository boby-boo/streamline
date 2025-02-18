import { StyledAlert } from './style';

const Notification = () => {
    return (
        <StyledAlert
            variant="filled"
            component="div"
            severity="success"
            data-notification
        >
            Текст скопійовано
        </StyledAlert>
    );
};

export default Notification;
