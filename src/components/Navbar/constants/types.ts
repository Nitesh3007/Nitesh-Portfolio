export type INavbar = {
    logo: String,
    title: String,
    navItems: INavItem[],
    action: IAction,
}

interface INavItem {
    title: String,
    link: String
}

interface IAction {
    title: String
}