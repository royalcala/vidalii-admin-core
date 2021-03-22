
export type Route = {
    name: string,
    path: string,//for one level without children only write "user
    sidebar: boolean,
    Icon: JSX.Element,
    Component: JSX.Element
}

const getContext = require.context(
    'components',
    true,
    /Route\..+\.context\.(tsx|js)$/
)

export const Routes = getContext.keys().map(dir => {
    return getContext(dir).default as Route //as React.FunctionComponent<Props>
})