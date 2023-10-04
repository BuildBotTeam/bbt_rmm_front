import React, {useEffect, ReactElement, useMemo} from 'react';
import './App.scss';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {checkToken, logout} from "./store/actions/auth";
import {useAppDispatch, useAppSelector} from "./hooks";
import {
    Box, CircularProgress,
    createTheme,
    CssBaseline,
    ThemeProvider
} from '@mui/material';
import {useSnackbar} from "notistack";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import HomeIcon from '@mui/icons-material/Home';
import MikRouterList from "./components/MikRouters/MikRouterList";
import MikRouterDetail from "./components/MikRouters/MikRouterDetail";
import MikRouterPage from "./components/MikRouters/MikRouterPage";
import CheckSecretPage from "./components/CheckSecretPage";


const theme = createTheme({
    typography: {
        fontFamily: 'Ubuntu',
    },
    palette: {
        mode: 'dark',
        // background: {
        //     // default: '#d7edf1',
        //     paper: '#f5f8f8'
        // },
        // primary: {
        //     main: '#2c6e6a',
        // },
        // secondary: {
        //     main: '#2da3c2'
        // },
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    transition: '500ms',
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(44,109,106, 0.7)',

                        'svg, span': {
                            color: '#f5f8f8'
                        }
                    }
                }
            }
        }
    }
});

export interface INavItem {
    name: string
    icon: ReactElement
    start_path: string
    path: string
    validate?: string
    component: ReactElement
    children?: INavItem[]
}

export var defaultNavList: INavItem[] = [
    {
        name: 'Home',
        icon: <HomeIcon/>,
        start_path: '/',
        path: '/:id?',
        validate: '',
        component: <MikRouterPage/>,
        children: [
            {
                name: 'list',
                icon: <div/>,
                start_path: '',
                path: '',
                validate: '',
                component: <MikRouterList/>,
            }, {
                name: 'router',
                icon: <div/>,
                start_path: 'router',
                path: '/create?/edit?',
                validate: '',
                component: <MikRouterList/>,
            }, {
                name: 'detail',
                icon: <div/>,
                start_path: 'detail',
                path: '',
                validate: '',
                component: <MikRouterDetail/>,
            }, {
                name: 'result_detail',
                icon: <div/>,
                start_path: 'result_detail',
                path: '',
                validate: '',
                component: <div/>,
            },
        ]
    },
]

const App: React.FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const {authState, isAuth, navList, error, check_secret} = useAppSelector(state => state.authReducer)

    useEffect(() => {
        if (error?.message && error?.code !== 401) {
            enqueueSnackbar(error.message, {variant: 'error'})
        }
    }, [error])

    useEffect(() => {
        dispatch(checkToken())
    }, [])

    function recursiveBuildNav(navItem: INavItem) {
        if (navItem.children && navItem.children.length > 0) {
            const childs = navItem.children?.map(nav => recursiveBuildNav(nav))
            return <Route key={navItem.name} path={navItem.start_path + navItem.path} element={navItem.component}>
                {childs}
            </Route>
        }
        return <Route key={navItem.name} path={navItem.start_path + navItem.path} element={navItem.component}/>
    }

    const navigationList = useMemo(() => {
        let nav = '/'
        const newList = navList.map((navItem, index) => {
            if (index === 0 && navItem.path !== '/') nav = navItem.start_path
            return recursiveBuildNav(navItem)
        })
        if (nav !== '/') newList.push(<Route key={'redirect'} path="/" element={<Navigate to={nav}/>}/>)
        return newList
    }, [navList])


    const routes = () => {
        if (authState) {
            return (
                <Box className={'login-container'}>
                    <CircularProgress/>
                </Box>
            )
        }
        if (check_secret) {
            return <Routes>
                <Route path={'*'} element={<Navigate replace to={'check_secret'}/>}/>
                <Route path="check_secret" element={<CheckSecretPage/>}/>
            </Routes>
        }
        if (!authState && !isAuth) {
            return (
                <Routes>
                    <Route path={'*'} element={<Navigate replace to={'login'}/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                </Routes>
            )
        }
        if (location.pathname === '/logout') {
            dispatch(logout())
        }
        return (
            <Routes>
                <Route path="check_secret" element={<Navigate to={'/'}/>}/>
                <Route path="logout" element={<Navigate replace to={'login'}/>}/>
                <Route path="/" element={<HomePage/>}>
                    {navigationList}
                </Route>
            </Routes>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <CssBaseline/>
                {routes()}
            </div>
        </ThemeProvider>
    )
}

export default App;
