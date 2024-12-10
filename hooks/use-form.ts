import { useState, ChangeEvent, FormEvent } from 'react'

interface UseFormResult<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (onSubmit: (values: T) => void) => (e: FormEvent<HTMLFormElement>) => void
}

export function useForm<T extends Record<string, any>>(initialValues: T): UseFormResult<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = (onSubmit: (values: T) => void) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add validation logic here
    onSubmit(values)
  }

  return { values, errors, handleChange, handleSubmit }
}

