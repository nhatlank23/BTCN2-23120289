import * as React from "react"
import { Controller } from "react-hook-form"

const FormFieldContext = React.createContext({})
const FormItemContext = React.createContext({})

const Form = ({ children, ...props }) => {
  return <form {...props}>{children}</form>
}

const FormField = ({ control, name, render }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller control={control} name={name} render={render} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { name } = fieldContext

  return {
    name,
    id: itemContext.id,
  }
}

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={`space-y-2 ${className}`} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { name } = useFormField()

  return <div ref={ref} {...props} />
})
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm font-medium text-red-500 dark:text-red-400 ${className}`}
      {...props}
    >
      {children}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage }
