const context = require.context(
    'components',
    true,
    /Admin\.Signin\.context\.(js|tsx)$/
)
export default context(context.keys()[0]).default as React.FunctionComponent
// map(dir => {
//     //TODO ordered position here
//     return context(dir).default as React.FunctionComponent<PropsComponentsCustom>
// })