import PropTypes from "prop-types"
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { memo, useCallback } from 'react';
import { DATA_VIEW_MODES } from '../constants';



export const ToggleDataViewMode = memo(({ dataViewMode, setDataViewMode }) => {
    const handleChangeViewMode = useCallback((_, nextView) => {
        setDataViewMode(nextView);
    }, [setDataViewMode]);

    return (
        <ToggleButtonGroup
            value={dataViewMode}
            exclusive
            onChange={handleChangeViewMode}
        >
            <ToggleButton
                value={DATA_VIEW_MODES.GRID}
                arial-label={DATA_VIEW_MODES.GRID}
                data-testid="toggle-data-view-mode-grid"
                >      
                <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton
                value={DATA_VIEW_MODES.TABLE}
                arial-label={DATA_VIEW_MODES.TABLE}
                data-testid="toggle-data-view-mode-table" 
                >
                <ViewListIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
})

ToggleDataViewMode.propTypes = {
    dataViewMode: PropTypes.oneOf([DATA_VIEW_MODES.TABLE, DATA_VIEW_MODES.GRID])
        .isRequired,
    setDataViewMode: PropTypes.func.isRequired,
}