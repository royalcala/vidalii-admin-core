
export type Route = {
    name: string,
    nested: string,
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