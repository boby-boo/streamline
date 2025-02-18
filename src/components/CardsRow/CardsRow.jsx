import { useSelector } from 'react-redux';
import CardsList from './CardsList';
import { StyledCardsRow } from './style';

const CardsRow = () => {
    const isFiltered = useSelector(state => state.webinar.isFiltered);
    const filteredTemplatesAreEmpty = useSelector(
        state => state.webinar.filteredTemplatesAreEmpty,
    );
    const isLoading = useSelector(state => state.webinar.loading);
    const templates = useSelector(state =>
        isFiltered ? state.webinar.filteredTemplates : state.webinar.templates,
    );

    return (
        <StyledCardsRow component="ul" className="cards-row" data-cards-row>
            {isLoading && <h2>Loading</h2>}
            {isFiltered && filteredTemplatesAreEmpty && (
                <h2>Cards not found</h2>
            )}

            {templates.map(list => (
                <CardsList {...list} key={list.id} />
            ))}
        </StyledCardsRow>
    );
};

export default CardsRow;
