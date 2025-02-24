import { useDispatch, useSelector } from 'react-redux';
import CardsList from './CardsList';
import { StyledCardsRow } from './style';
import { useEffect } from 'react';
import { getWebinarTemplates } from '../../features/webinar/webinarThunks';
import Loader from '../Loader/Loader';

const CardsRow = () => {
    const templateName = useSelector(state => state.webinar.templateName);
    const dispatch = useDispatch();
    const isFiltered = useSelector(state => state.webinar.isFiltered);
    const filteredTemplatesAreEmpty = useSelector(
        state => state.webinar.filteredTemplatesAreEmpty,
    );
    const isLoading = useSelector(state => state.webinar.loading);
    const templates = useSelector(state =>
        isFiltered ? state.webinar.filteredTemplates : state.webinar.templates,
    );

    useEffect(() => {
        dispatch(getWebinarTemplates());
    }, [dispatch, templateName]);

    const elements =
        isFiltered && filteredTemplatesAreEmpty ? (
            <h2>Cards not found</h2>
        ) : (
            templates.map(list => <CardsList {...list} key={list.id} />)
        );

    return (
        <StyledCardsRow component="ul" className="cards-row" data-cards-row>
            {isLoading && <Loader />}
            {elements}
            {/* {templates.map(list => (
                <CardsList {...list} key={list.id} />
            ))} */}
        </StyledCardsRow>
    );
};

export default CardsRow;
