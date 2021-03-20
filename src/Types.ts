
type After = {
    after: string
}
type Before = {
    before: string
}
export type ComponentCustom = {
    fileName: string,
    position?: After | Before | number, //default 0
    group: string
}