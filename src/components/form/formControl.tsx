import FormControl from 'template-core/FormControl';
import FormHelperText from 'template-core/FormHelperText';
import Input from 'template-core/Input';
import Button from 'template-core/Button';
import InputLabel from 'template-core/InputLabel';
import { createStyles, makeStyles, Theme } from 'template-core/styles';
import { useForm, Controller, UseControllerOptions, UseFormMethods } from 'react-hook-form';
type FormConfig = {
    alias?: string //other name for the data
    type: 'string' | 'number' | 'email' | 'password' | 'autocompletes'//html5
    helperText?: string,
    rules?: UseControllerOptions<any>['rules']
}
export type FormProps = {
    id: string
    data: {
        [key: string]: any
    },
    config: {
        [key: string]: FormConfig
    },
    control: UseFormMethods['control']

}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiFormControl-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

export function Form(props: FormProps) {

    // const onSubmit = handleSubmit(
    //   async (data) => {
    //       //   await checkSession(username, password)
    //       console.log(data)
    //   });
    const classes = useStyles()
    const Inputs = Object.entries(props.config).map(
        ([key, config]) => {
            const uniqueId = props.id + '_' + key
            return (
                <Controller
                    name={key}
                    control={props.control}
                    defaultValue={props.data[key]}
                    rules={config?.rules ? config.rules : {}}
                    render={({ onChange, value }) => <FormControl>
                        <InputLabel htmlFor={uniqueId}>{config?.alias ? config.alias : key}</InputLabel>
                        <Input
                            id={uniqueId}
                            value={value}
                            onChange={onChange}
                            name={key}
                        />
                        {config?.helperText && (
                            <FormHelperText>{config.helperText}</FormHelperText>
                        )}
                    </FormControl>
                    }
                />

            )
        }
    )
    return (
        <form
            className={classes.root}
            noValidate
            autoComplete="off"
        >
            {Inputs}
        </form>
    )
}