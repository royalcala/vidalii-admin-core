import React from 'react'
import DocHeader, { Props as HeaderProps } from "../admin/Admin.Doc.Header";
import DocTabs, { Tab } from "../admin/Admin.Doc.Tabs";
import DocFooter from "components/admin/Admin.Doc.Footer";

interface Props {
    breadcrum: HeaderProps['breadcrum'],
    tabs: Tab[],
    operationQuery: string,
    operationMutation: string
}

export function Doc(props: Props) {
    const mutations: (() => string)[] = []
    const queries: (() => string)[] = []
    return (
        <>
            <DocHeader
                breadcrum={props.breadcrum}
                gql={{
                    mutations,
                    queries,
                    operationMutation: props.operationMutation,
                    operationQuery: props.operationQuery
                }}
            />
            <DocTabs tabs={props.tabs} />
            <DocFooter />
        </>
    )
}