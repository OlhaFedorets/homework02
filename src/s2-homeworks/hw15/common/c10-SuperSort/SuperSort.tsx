import React from 'react'
import downArrow from './../assets/free-icon-drop-down-arrow-60995.webp'
import upArrow from './../assets/free-icon-up-arrow-12325100.webp'
import upDownArrow from './../assets/free-icon-up-down-arrow-12153546.webp'


// добавить в проект иконки и импортировать
const downIcon = downArrow
const upIcon = upArrow
const noneIcon = upDownArrow

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
    // return up // исправить
    //   switch (sort) {
    //     case '':
    //         return up
    //     case up:
    //         return down
    //     default:
    //         return ''
    // }
    switch (sort) {
        case down:
            return up
        case up:
            return ''
        default:
            return down
    }

}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            {/*сделать иконку*/}
            <img
                id={id + '-icon-' + sort}
                src={icon}
                style={{ width: '15px', height: '15px' }}
            />

            {/*{icon} /!*а это убрать*!/*/}
        </span>
    )
}

export default SuperSort
