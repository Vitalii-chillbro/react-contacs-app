import { Box, Button } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { useCopyToClipboard } from "react-use"
import PropTypes from "prop-types"
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Tooltip from "@material-ui/core/Tooltip"
import { useCallback, useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener"


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            cursor: "pointer",
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    })
);

const STATUS_COPY = {
    COPY: "copy",
    COPIED: "copied",
}

const TITLE_BY_STATUS = {
    [STATUS_COPY.COPY]: "Copy",
    [STATUS_COPY.COPIED]: "Copied",
}


export const CopyToClipBoardText = ({ text }) => {
    const classes = useStyles();
    const [, copyToClipBoard] = useCopyToClipboard();
    const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);

    const onClickCopy = useCallback(() => {
        copyToClipBoard(text)
        setStatusCopy(STATUS_COPY.COPIED)
    }, [copyToClipBoard, text])

    const onClickAway = useCallback(() => {
        setStatusCopy(STATUS_COPY.COPY)
    }, [setStatusCopy])
    return (
        <ClickAwayListener onClickAway={onClickAway} >
            <Tooltip title={TITLE_BY_STATUS[statusCopy]} placement="top" arrow>
                <Button
                    className={classes.root}
                    onClick={onClickCopy}
                >
                    <FileCopyOutlinedIcon fontSize="small" className={classes.icon} />
                    {text}
                </Button>
            </Tooltip>
        </ClickAwayListener>
    )
};

CopyToClipBoardText.propTypes = {
    text: PropTypes.string.isRequired,
};
