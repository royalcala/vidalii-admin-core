import React from 'react';
import { Tab } from "components/admin/Admin.Doc.Tabs"
import { useMutation, useQuery } from 'graphql-hooks'
import { FormProps, Form } from "../form/formControl";
import { useForm } from 'react-hook-form';

const UPDATE_MY_USER = `#graphql
mutation updateMyUser($user:UserUpdate){
  userUpdateMyAccount(user:$user){
    _id
  }
}
`
const QUERY_MY_USER = `#graphql
query GetMyUser{
  myUser:userGetMyUser{
    name
    lastname
    email
    phone    
    groups
  }
}

`

function TabMain(props:{}) {
 
  const [updateUser] = useMutation(UPDATE_MY_USER)
  const { loading, error, data } = useQuery(QUERY_MY_USER)
  if (loading) return 'Loading...'
  if (error) return 'Error:' + JSON.stringify(error)
  if (!data?.myUser?.name)
    return 'Its required to close your session first.'

  const myUser_config: FormProps['config'] = {
    name: {
      type: 'string',
    },
    lastname: {
      type: 'string'
    },
    email: {
      type: 'email',
      helperText: 'It is used like username'
    },
    phone: {
      type: 'number'
    }
  }
  return <Form id="myAccountMain" data={data.myUser} config={myUser_config}/>
  // return (
  // <form className={classes.root} noValidate autoComplete="off">
  //   <FormControl>
  //     <InputLabel htmlFor="component-helper">Name</InputLabel>
  //     <Input
  //       id="component-name"
  //       value={data.myUser.name}
  //       onChange={() => { }}
  //       aria-describedby="component-helper-text"
  //     />
  //     {/* <FormHelperText id="component-helper-text">Some important helper text</FormHelperText> */}
  //   </FormControl>
  //   <TextField
  //     id="outlined-lastname"
  //     label="lastname"
  //     defaultValue={data.myUser.lastname}
  //     variant="outlined"
  //   />
  //   <TextField
  //     id="outlined-password-input"
  //     label="password"
  //     type="password"
  //     // autoComplete="current-password"
  //     variant="outlined"
  //   />
  //   <TextField
  //     id="outlined-email"
  //     label="email"
  //     type="email"
  //     defaultValue={data.myUser.email}
  //     variant="outlined"
  //   />
  //   <TextField
  //     id="outlined-number"
  //     label="Number"
  //     type="number"
  //     InputLabelProps={{
  //       shrink: true,
  //     }}
  //     variant="outlined"
  //   />
  //   <TextField id="outlined-search" label="Search field" type="search" variant="outlined" />
  //   <TextField
  //     id="outlined-helperText"
  //     label="Helper text"
  //     defaultValue="Default Value"
  //     helperText="Some important text"
  //     variant="outlined"
  //   />
  // </form>
  // );
}

const tab: Tab = {
  title: '_Main',
  Component: TabMain,
}
export default tab