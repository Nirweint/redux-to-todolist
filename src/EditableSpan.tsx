import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    title: string
    changeTaskTitle: (title: string) => void
}

export const EditableSpan = ({title, changeTaskTitle, ...props}: PropsType) => {
    const [titleValue, setTitleValue] = useState('')
    const [editMode, setEditMode] = useState(false)

    const onEditMode = () => {
        setEditMode(true)
        setTitleValue(title)
    }
    const offEditMode = () => {
        title &&
        setEditMode(false)
        setTitleValue(titleValue)
    }
    const changeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(title)
        changeTaskTitle(e.currentTarget.value)
    }
    const onEnterOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" &&
        offEditMode()
    }

    return (
        editMode ?
            <input
                type="text"
                value={title}
                onBlur={offEditMode}
                autoFocus
                onChange={changeTitleValue}
                onKeyPress={onEnterOffEditMode}
            />
            :
            <span onDoubleClick={onEditMode}>{title}</span>
    );
}