import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'
import CircularProgress from "@mui/material/CircularProgress";

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: any) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {
                if (res && res.data) {
                    let sortedTechs = [...res.data.techs]
                    // if (sort === '0tech') {
                    //     sortedTechs.sort((a, b) => b.tech.localeCompare(a.tech));
                    // } else if (sort === '1tech') {
                    //     sortedTechs.sort((a, b) => a.tech.localeCompare(b.tech));
                    // } else if (sort === '0developer') {
                    //     sortedTechs.sort((a, b) => b.developer.localeCompare(a.developer));
                    // } else if (sort === '1developer') {
                    //     sortedTechs.sort((a, b) => a.developer.localeCompare(b.developer));
                    // }
                    console.log(sort)

                    const getComparator = (sort: string) => {
                        if (sort === '0tech') return (a: TechType, b: TechType) => b.tech.localeCompare(a.tech);
                        if (sort === '1tech') return (a: TechType, b: TechType) => a.tech.localeCompare(b.tech);
                        if (sort === '0developer') return (a: TechType, b: TechType) => b.developer.localeCompare(a.developer);
                        if (sort === '1developer') return (a: TechType, b: TechType) => a.developer.localeCompare(b.developer);
                        return () => 0;
                    };

                    // sort === '1tech' ?
                    //     sortedTechs = res.data.techs.sort(function (a,b) { return a.id > b.id ? 1 : -1})
                    //     :  sort === '0tech' ? sortedTechs = res.data.techs.sort(function (a,b) { return a.tech > b.tech ? -1 : 1})
                    //         : sortedTechs = res.data.techs


                    setTechs(sortedTechs)
                    setTotalCount(res.data.totalCount)
                }
                // делает студент

                // сохранить пришедшие данные
                setLoading(false)
                //
            })
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        setPage(newPage)
        setCount(newCount)
        // setPage(
        // setCount(

        sendQuery({page:newPage, count: newCount})
        setSearchParams()

        // sendQuery(
        // setSearchParams(

        //
    }

    const onChangeSort = (newSort: string) => {
        // делает студент
        setSort(newSort)
        setPage(1)
        // setSort(
        // setPage(1) // при сортировке сбрасывать на 1 страницу


        setSearchParams({page: '1', count: count.toString(), sort: newSort})
        sendQuery({page, count, sort: newSort})
        // sendQuery(
        // setSearchParams(

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'} className={s.loading}> <CircularProgress /></div>}

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        Tech
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        Developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15
