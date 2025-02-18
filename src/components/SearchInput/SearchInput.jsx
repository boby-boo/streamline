import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { filterTemplate } from '../../features/webinar/webinarSlice';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const templates = useSelector(state => state.webinar.templates);
    const dispatch = useDispatch();

    const filteredTemplateCards = e => {
        const text = e.target.value;

        if (text === '') {
            setSearchQuery('');
            updateTemplateCards(uuidv4(), []);
            return;
        }

        const filteredData = templates
            .map(template => template.template)
            .flat(Infinity)
            .filter(template =>
                template.title.toLowerCase().includes(text.toLowerCase()),
            );

        updateTemplateCards(
            uuidv4(),
            filteredData,
            text !== '',
            filteredData.length === 0,
        );

        setSearchQuery(text);
    };

    const updateTemplateCards = (
        id,
        template,
        isFiltered = false,
        filteredTemplatesAreEmpty = true,
    ) => {
        dispatch(
            filterTemplate({
                data: [
                    {
                        id,
                        template,
                        title: 'Результат пошуку',
                    },
                ],
                isFiltered,
                filteredTemplatesAreEmpty,
            }),
        );
    };

    return (
        <TextField
            label="Пошук"
            size="small"
            variant="outlined"
            color="inherit"
            value={searchQuery}
            onChange={filteredTemplateCards}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchInput;
