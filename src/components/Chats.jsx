import React from 'react';
import List from '@material-ui/core/List';
import {Chat} from './index'
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        "chats": {
            height: "400px",
            padding: "0",
            overflow: "auto"
        }
    }),
);

const Chats = (props) => {
    const classes = useStyles();

    return (
        <List className={classes.chats} id={"scroll-area"}>
            {props.chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index} />
            })}
        </List>
    );
};

export default Chats;