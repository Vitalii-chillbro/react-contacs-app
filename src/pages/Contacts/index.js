import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core";
import { useContacts } from './useContacts';
import { ContactsTable } from './ContactsTable';
import { CircularProgress } from '@material-ui/core';
import { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import { ToggleDataViewMode } from './ToggleDataViewMode';
import { DATA_VIEW_MODES } from './constants';
import { useDataViewMode } from './useDataViewMode';
import { ContactsFilters } from './ContactsFilters';


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
        },
        headContainer: {
            marginBottom: theme.spacing(3),
        },
        filterContainer: {
            matginBottom: theme.spacing(3),
        },
    })
);

const FiltersDefaltValue = {
    fullname: "",
    gender: "all",
    nationality: "all",
}

const filterByFullName = ({ first, last }, fullname) =>
    first?.toLowerCase().includes(fullname.toLowerCase()) ||
    last?.toLowerCase().includes(fullname.toLowerCase())

const filterByGender = (value, gender) => {
    if (gender === "all") {
        return true;
    }
    return value === gender;
}

const filterByNationality = (value, nationality) => {
    if (nationality === "all") {
        return true;
    }
    return value === nationality;
}

export const Contacts = () => {
    const classes = useStyles();
    const contacts = useContacts();
    const [dataViewMode, setDataViewMode] = useDataViewMode();

    const [filters, setFilters] = useState(FiltersDefaltValue)

    const updateFilter = useCallback((name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }))
    }, [])

    const clearFilters = useCallback(() => {
        setFilters(FiltersDefaltValue)
    }, [])

    const filteredContacts = contacts.data
        .filter((c) => filterByFullName(c.name, filters.fullname))
        .filter((c) => filterByGender(c.gender, filters.gender))
        .filter((c) => filterByNationality(c.nat, filters.nationality));

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.headContainer}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h4" component="h1">
                            Contacts
                        </Typography>
                        <ToggleDataViewMode
                            dataViewMode={dataViewMode}
                            setDataViewMode={setDataViewMode}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} className={classes.filtersContainer}>
                    <ContactsFilters
                        filters={filters}
                        updateFilter={updateFilter}
                        clearFilters={clearFilters}
                    />
                </Grid>
                <Grid item xs={12}>
                    {(() => {
                        if (contacts.isLoading) {
                            return <CircularProgress data-testid="contacts-loader" />;
                        }
                        if (contacts.isError) {
                            return <div data-testid="contacts-error">...error</div>;
                        }

                        if (dataViewMode === DATA_VIEW_MODES.TABLE) {
                            return <ContactsTable data={filteredContacts} />
                        }
                        if (dataViewMode === DATA_VIEW_MODES.GRID) {
                            return <div data-testid="contacts-grid-container">grid</div>;
                        }
                        return null;
                    })()}
                </Grid>
            </Grid>
        </Container>
    )
};
