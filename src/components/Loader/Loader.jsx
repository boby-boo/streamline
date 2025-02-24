import { Oval } from 'react-loader-spinner';

const Loader = () => {
    return (
        <Oval
            height={100}
            width={100}
            color="#f5f5f5"
            secondaryColor="#404075"
            visible={true}
            ariaLabel="oval-loading"
            strokeWidth={3}
            strokeWidthSecondary={2}
        />
    );
};

export default Loader;
