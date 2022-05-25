import Grid from '@material-ui/core/Grid';
import { Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core";
import { useContacts } from './useContacts';
import { ContactsTable } from './ContactsTable';
import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
        },
        headContainer: {
            marginBottom: theme.spacing(3),
        }
    })
);

const DATA_VIEW_MODES = {
    TABLE: "table",
    GRID: "grid",
}

const getInitialDataViewMode = () => {
    return localStorage.getItem("dataViewMode") || DATA_VIEW_MODES.TABLE
}

export const Contacts = () => {
    const classes = useStyles();
    const contacts = useContacts();
    const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);

    const handleChangeViewMode = (_, nextView) => {
        setDataViewMode(nextView);
    }

    useEffect(() => {
        localStorage.setItem("dataViewMode", dataViewMode)
    }, [dataViewMode])

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.headContainer}>
                    <Box 
                    display="flex" 
                    justifyContent="space-between"
                    >
                        <Typography variant="h4" component="h1">
                            Contacts
                        </Typography>
                        <ToggleButtonGroup
                            value={dataViewMode}
                            exclusive
                            onChange={handleChangeViewMode}
                        >
                            <ToggleButton
                                value={DATA_VIEW_MODES.GRID}
                                arial-label={DATA_VIEW_MODES.GRID}>
                                <ViewModuleIcon />
                            </ToggleButton>
                            <ToggleButton
                                value={DATA_VIEW_MODES.TABLE}
                                arial-label={DATA_VIEW_MODES.TABLE}>
                                <ViewListIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {(() => {
                        if (contacts.isLoading) {
                            return <CircularProgress />;
                        }
                        if (contacts.isError) {
                            return <div>...error</div>;
                        }

                        if (dataViewMode === DATA_VIEW_MODES.TABLE) {
                            return <ContactsTable data={contacts.data} />
                        }
                        if (dataViewMode === DATA_VIEW_MODES.GRID) {
                            return "grid";
                        }
                        return null;
                    })()}
                </Grid>
            </Grid>
        </Container>
    )
};
