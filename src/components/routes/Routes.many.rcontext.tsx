
export type Route = {
    name: string,
    parent: string | null
    sidebar: boolean,
    // Icon: JSX.Element,
    Icon: React.FunctionComponent,
    Component:  React.FunctionComponent
}

const getContext = require.context(
    'components',
    true,
    /.+\.route\.(tsx|js)$/
)

export const Routes = getContext.keys().map(dir => {
    return getContext(dir).default as Route //as React.FunctionComponent<Props>
})