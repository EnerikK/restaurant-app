import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { postContact } from '../lib/api'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short.'),
  email: z.email('Enter a valid email address.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message is too long.'),
})

export type ContactFormValues = z.infer<typeof contactSchema>

export function useContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const mutation = useMutation({
    mutationFn: postContact,
    onSuccess: () => {
      form.reset()
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
  })

  return {
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    errorMessage: mutation.error instanceof Error ? mutation.error.message : null,
  }
}
