import {
    Switch, Route
} from "react-router-dom";
import { Routes } from "../routes/Routes.many.rcontext";



export default function SwitchRoutes() {
    return (
        <Switch>
            { Routes.map(
                ({ Component, name, parent }) => {
                    return (
                        <Route
                            path={parent === null ? '/' + name : '/' + parent + '.' + name}
                            component={Component as any}
                        />
                    )
                }
            )}
        </Switch>
    )
}